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

    // 2. Parse request payload
    const body = await req.json();
    const { email } = body || {};

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // 3. Validate environment variables
    const requiredEnvVars = ["EMAIL_HOST", "EMAIL_PORT", "EMAIL_USER", "EMAIL_PASS"] as const;
    const missingEnvs = requiredEnvVars.filter((varName) => !process.env[varName]);

    if (missingEnvs.length > 0) {
      const errorMsg = `Missing required email configuration environment variables: ${missingEnvs.join(", ")}`;
      console.error(errorMsg);
      return NextResponse.json(
        { error: "Email service is not properly configured on the server." },
        { status: 500 }
      );
    }

    // 4. Create Nodemailer Transporter
    const host = process.env.EMAIL_HOST!;
    const port = Number(process.env.EMAIL_PORT);
    const secure = process.env.EMAIL_SECURE === "true" || port === 465;
    const user = process.env.EMAIL_USER!;
    const pass = process.env.EMAIL_PASS!;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    // 5. Construct Welcome Email HTML & Text content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px;">
        <h1 style="color: #111827; font-size: 24px; font-weight: bold; margin-bottom: 16px;">Welcome to Our Newsletter! 🎉</h1>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
          Thank you for subscribing! We are thrilled to have you join our community.
        </p>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
          You will now receive the latest updates, expert insights, and exclusive content directly in your inbox.
        </p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
        <p style="color: #9ca3af; font-size: 12px; text-align: center;">
          If you didn't subscribe to this newsletter, you can safely ignore this email.
        </p>
      </div>
    `;

    const textContent = `
Welcome to Our Newsletter!

Thank you for subscribing! We are thrilled to have you join our community.
You will now receive the latest updates, expert insights, and exclusive content directly in your inbox.
    `.trim();

    // 6. Send Mail to subscriber
    await transporter.sendMail({
      from: `"Newsletter" <${user}>`,
      to: email,
      subject: "Welcome to our Newsletter!",
      text: textContent,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, message: "Welcome to our newsletter! Check your inbox." });
  } catch (err: unknown) {
    console.error("Error sending newsletter welcome email:", err);
    return NextResponse.json(
      { error: "Failed to send welcome email. Please try again later." },
      { status: 500 }
    );
  }
}
