import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Simple in-memory rate limiting map: ip -> { count, resetAt }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

function checkRateLimit(ip: string): boolean {
  if (process.env.NODE_ENV === "development") {
    return true; // Skip rate limit in development
  }

  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP-based Rate Limiting (Skipped in development)
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // 2. Validate environment variables
    const requiredEnvVars = [
      "EMAIL_HOST",
      "EMAIL_PORT",
      "EMAIL_USER",
      "EMAIL_PASS",
      "EMAIL_TO",
    ] as const;

    const missingEnvs = requiredEnvVars.filter((varName) => !process.env[varName]);

    if (missingEnvs.length > 0) {
      const errorMsg = `Missing required email configuration environment variables: ${missingEnvs.join(", ")}`;
      console.error(errorMsg);
      return NextResponse.json(
        { error: "Email service is not properly configured on the server." },
        { status: 500 }
      );
    }

    // 3. Parse request payload
    const body = await req.json();

    if (!body || typeof body !== "object" || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: "Invalid form submission data." },
        { status: 400 }
      );
    }

    // 4. Create Nodemailer Transporter
    const host = process.env.EMAIL_HOST!;
    const port = Number(process.env.EMAIL_PORT);
    const secure = process.env.EMAIL_SECURE === "true" || port === 465;
    const user = process.env.EMAIL_USER!;
    const pass = process.env.EMAIL_PASS!;
    const to = process.env.EMAIL_TO!;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    // 5. Construct email HTML & text content dynamically from form fields
    const fieldEntries = Object.entries(body as Record<string, unknown>);
    const formattedFieldsHtml = fieldEntries
      .map(
        ([key, val]) =>
          `<tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee; text-transform: capitalize;">${key}</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${String(val ?? "")}</td>
          </tr>`
      )
      .join("");

    const formattedFieldsText = fieldEntries
      .map(([key, val]) => `${key}: ${String(val ?? "")}`)
      .join("\n");

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; padding: 24px; border-radius: 8px;">
        <h2 style="color: #111827; margin-bottom: 16px;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tbody>
            ${formattedFieldsHtml}
          </tbody>
        </table>
      </div>
    `;

    // 6. Send Mail
    await transporter.sendMail({
      from: `"Contact Form" <${user}>`,
      to,
      subject: `New Contact Submission from ${body.name || body.email || "Website User"}`,
      text: formattedFieldsText,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, message: "Email sent successfully." });
  } catch (err: unknown) {
    console.error("Error sending contact email:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
