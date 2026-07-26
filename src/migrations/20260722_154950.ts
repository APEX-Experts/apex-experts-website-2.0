import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_capabilities" ADD COLUMN "texture_image_id" integer;
  ALTER TABLE "pages_blocks_capabilities" ADD CONSTRAINT "pages_blocks_capabilities_texture_image_id_media_id_fk" FOREIGN KEY ("texture_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_capabilities_texture_image_idx" ON "pages_blocks_capabilities" USING btree ("texture_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_capabilities" DROP CONSTRAINT "pages_blocks_capabilities_texture_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_capabilities_texture_image_idx";
  ALTER TABLE "pages_blocks_capabilities" DROP COLUMN "texture_image_id";`)
}
