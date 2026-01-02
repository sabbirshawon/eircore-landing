import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

/**
 * PUBLIC LOGO URL (MUST be HTTPS)
 */
const LOGO_URL = "https://eircore-landing.vercel.app/logo-dark.svg";

/**
 * Handle preflight (prevents 405 on Vercel)
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    /* ===============================
       SMTP TRANSPORT
    =============================== */
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    /* ===============================
       1️⃣ ADMIN EMAIL (MAIL_TO)
    =============================== */
    const adminHtml = `
      <div style="font-family:Arial,Helvetica,sans-serif;background:#f7f9fb;padding:30px">
        <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;padding:24px">

          <h2 style="color:#1f8f4a;margin-bottom:12px">
            New EirCore LMS Lead
          </h2>

          <table style="width:100%;font-size:14px;border-collapse:collapse">
            <tr>
              <td style="padding:6px 0;color:#777">Name</td>
              <td style="padding:6px 0;font-weight:600">${name}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#777">Email</td>
              <td style="padding:6px 0;font-weight:600">${email}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#777">Phone</td>
              <td style="padding:6px 0;font-weight:600">${phone}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#777;vertical-align:top">
                Message
              </td>
              <td style="padding:6px 0;font-weight:600">
                ${message || "-"}
              </td>
            </tr>
          </table>

          <hr style="margin:24px 0;border:none;border-top:1px solid #eee" />

          <!-- Footer Logo -->
          <div style="text-align:center">
            <img
              src="${LOGO_URL}"
              alt="EirCore"
              width="120"
              style="display:block;margin:0 auto 8px"
            />
            <p style="font-size:12px;color:#999;margin:0">
              Sent from EirCore LMS Contact Form
            </p>
          </div>

        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"EirCore LMS" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: "New Lead – EirCore LMS",
      html: adminHtml,
    });

    /* ===============================
       2️⃣ USER CONFIRMATION EMAIL
    =============================== */
    const userHtml = `
      <div style="font-family:Arial,Helvetica,sans-serif;background:#f7f9fb;padding:30px">
        <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;padding:24px;text-align:center">

          <h2 style="color:#1f8f4a;margin-bottom:12px">
            Thank you for contacting EirCore
          </h2>

          <p style="font-size:15px;color:#555">
            Hi <strong>${name}</strong>,<br/>
            We’ve received your message and our team will contact you shortly.
          </p>

          <div style="background:#f1f5f3;border-radius:10px;padding:16px;margin:20px 0;text-align:left">
            <p style="margin:0;font-size:14px;color:#333">
              <strong>Your message:</strong><br/>
              ${message || "-"}
            </p>
          </div>

          <p style="font-size:14px;color:#666">
            If your request is urgent, reach us directly:
          </p>

          <p style="font-size:14px">
            📧 Eircoreconstruction@gmail.com<br/>
            📞 +353 87 463 7389
          </p>

          <hr style="margin:24px 0;border:none;border-top:1px solid #eee" />

          <!-- Footer Logo -->
          <img
            src="${LOGO_URL}"
            alt="EirCore"
            width="120"
            style="display:block;margin:0 auto 8px"
          />

          <p style="font-size:12px;color:#999;margin:0">
            © ${new Date().getFullYear()} EirCore – Learning Management System
          </p>

        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"EirCore LMS" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "We received your message – EirCore LMS",
      html: userHtml,
    });

    return NextResponse.json(
      { success: true },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Email failed to send" },
      { status: 500 }
    );
  }
}
