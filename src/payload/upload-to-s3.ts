/**
 * upload-to-s3.ts
 *
 * Uploads all local media files to S3 so the deployment database can serve
 * them via cloud storage.
 *
 * Usage:
 *   pnpm upload-s3
 *   pnpm upload-s3 --dry-run        (lists what would be uploaded without doing it)
 *   pnpm upload-s3 --force          (re-upload even if the file already exists in S3)
 *
 * Requirements:
 *   - S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_REGION (and optionally
 *     S3_ENDPOINT) must be set in .env
 *   - The media files must exist in the local `media/` directory at the repo root
 */

import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import mime from "mime-types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const MEDIA_DIR = path.resolve(__dirname, "../../media");
const BUCKET = process.env.S3_BUCKET;
const REGION = process.env.S3_REGION;
const ENDPOINT = process.env.S3_ENDPOINT;
const ACCESS_KEY = process.env.S3_ACCESS_KEY_ID;
const SECRET_KEY = process.env.S3_SECRET_ACCESS_KEY;

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const FORCE = args.includes("--force");

// ---------------------------------------------------------------------------
// Validate env
// ---------------------------------------------------------------------------

function validateEnv() {
  const missing: string[] = [];
  if (!BUCKET) missing.push("S3_BUCKET");
  if (!REGION) missing.push("S3_REGION");
  if (!ACCESS_KEY) missing.push("S3_ACCESS_KEY_ID");
  if (!SECRET_KEY) missing.push("S3_SECRET_ACCESS_KEY");
  if (missing.length > 0) {
    console.error(`\n❌ Missing required environment variables: ${missing.join(", ")}`);
    console.error("   Set them in your .env file and try again.\n");
    process.exit(1);
  }
}

// ---------------------------------------------------------------------------
// S3 client
// ---------------------------------------------------------------------------

function createS3Client(): S3Client {
  return new S3Client({
    region: REGION!,
    credentials: {
      accessKeyId: ACCESS_KEY!,
      secretAccessKey: SECRET_KEY!,
    },
    ...(ENDPOINT ? { endpoint: ENDPOINT, forcePathStyle: true } : {}),
  });
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function fileExistsInS3(client: S3Client, key: string): Promise<boolean> {
  try {
    await client.send(new HeadObjectCommand({ Bucket: BUCKET!, Key: key }));
    return true;
  } catch {
    return false;
  }
}

async function uploadFile(client: S3Client, localPath: string, key: string): Promise<void> {
  const body = fs.readFileSync(localPath);
  const contentType = (mime.lookup(localPath) as string | false) || "application/octet-stream";

  await client.send(
    new PutObjectCommand({
      Bucket: BUCKET!,
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("=".repeat(60));
  console.log("  Payload CMS — Upload Local Media to S3");
  console.log("=".repeat(60));

  if (DRY_RUN) console.log("\n⚠  DRY RUN — no files will actually be uploaded.\n");
  if (FORCE) console.log("⚠  FORCE — existing S3 files will be overwritten.\n");

  validateEnv();

  if (!fs.existsSync(MEDIA_DIR)) {
    console.error(`\n❌ Media directory not found at: ${MEDIA_DIR}`);
    console.error("   Make sure the media/ folder exists at your repo root.\n");
    process.exit(1);
  }

  const client = createS3Client();

  // Collect every file in the media/ directory (flat — Payload doesn't use subdirs)
  const allFiles = fs
    .readdirSync(MEDIA_DIR)
    .filter((f) => !f.startsWith("."))
    .sort();

  console.log(`Found ${allFiles.length} file(s) in ${MEDIA_DIR}\n`);

  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const filename of allFiles) {
    const localPath = path.join(MEDIA_DIR, filename);
    const stat = fs.statSync(localPath);

    if (!stat.isFile()) continue;

    // S3 key = filename (Payload's s3Storage plugin uses filename as the key)
    const key = filename;

    if (!FORCE) {
      const exists = await fileExistsInS3(client, key);
      if (exists) {
        console.log(`  - ${filename} (already in S3, skipping)`);
        skipped++;
        continue;
      }
    }

    if (DRY_RUN) {
      console.log(`  [DRY RUN] Would upload: ${filename}`);
      uploaded++;
      continue;
    }

    try {
      await uploadFile(client, localPath, key);
      console.log(`  ✔ Uploaded: ${filename}`);
      uploaded++;
    } catch (err: unknown) {
      console.warn(`  ✗ Failed:   ${filename} — ${(err as Error).message}`);
      failed++;
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log(`  Done!`);
  console.log(`  Uploaded : ${uploaded}`);
  console.log(`  Skipped  : ${skipped} (already existed in S3)`);
  console.log(`  Failed   : ${failed}`);
  if (ENDPOINT) {
    console.log(`\n  Bucket : ${BUCKET}`);
    console.log(`  Endpoint: ${ENDPOINT}`);
  } else {
    console.log(`\n  Bucket : ${BUCKET} (${REGION})`);
  }
  console.log("=".repeat(60));

  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("\nUpload failed:", err);
  process.exit(1);
});
