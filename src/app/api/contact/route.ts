import { NextResponse } from "next/server";
import { site } from "@/config/site";

/**
 * Receives project inquiries from the contact form and emails them to
 * `site.email` via Resend's REST API.
 *
 * Configuration (see README "Contact form delivery"):
 *   RESEND_API_KEY   required — from resend.com/api-keys
 *   CONTACT_FROM     optional — defaults to Resend's shared sandbox sender,
 *                    which can only deliver to the address that owns the
 *                    Resend account. Switch to an address on your own
 *                    verified domain to send from your brand.
 *
 * Deliberately uses fetch rather than the `resend` SDK: it is one POST,
 * so a dependency would add weight without adding value.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = `${site.name} <onboarding@resend.dev>`;

/** Strip CR/LF so user input can never inject email headers. */
function clean(value: unknown, max = 2000): string {
  return typeof value === "string" ? value.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Accept and discard so they see success.
  if (typeof data.company_site === "string" && data.company_site.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(data.name, 200);
  const email = clean(data.email, 200);
  // Multi-line project details keep their line breaks; only the length is capped.
  const details =
    typeof data.details === "string" ? data.details.trim().slice(0, 5000) : "";

  if (!name || !details || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Name, a valid email, and project details are required." },
      { status: 400 }
    );
  }

  const features = Array.isArray(data.features)
    ? data.features.map((f) => clean(f, 120)).filter(Boolean)
    : [];

  const allFields: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Company", clean(data.company, 200)],
    ["Current website", clean(data.current_website, 400)],
    ["Industry", clean(data.industry, 120)],
    ["Package / budget", clean(data.package, 120)],
    ["Primary goal", clean(data.goal, 200)],
    ["Desired launch", clean(data.timeline, 120)],
    ["Features", features.join(", ")],
    ["Heard about us via", clean(data.heard_about, 200)],
  ];
  const fields = allFields.filter(([, value]) => value.length > 0);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Fail loudly rather than silently dropping a real lead. The form's
    // error state tells the visitor to email directly instead.
    console.error(
      `[contact] RESEND_API_KEY is not set — inquiry from ${email} was NOT delivered.`
    );
    return NextResponse.json(
      { ok: false, error: "Email delivery is not configured yet." },
      { status: 503 }
    );
  }

  const text = [
    ...fields.map(([label, value]) => `${label}: ${value}`),
    "",
    "Project details:",
    details,
  ].join("\n");

  const html = `
    <div style="font-family:-apple-system,Segoe UI,sans-serif;color:#1b1a16;line-height:1.5">
      <h2 style="margin:0 0 16px;font-size:18px">New project inquiry</h2>
      <table style="border-collapse:collapse;font-size:14px">
        ${fields
          .map(
            ([label, value]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#5a564c;vertical-align:top">${escapeHtml(
                label
              )}</td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`
          )
          .join("")}
      </table>
      <h3 style="margin:24px 0 8px;font-size:14px;color:#5a564c">Project details</h3>
      <p style="margin:0;font-size:14px;white-space:pre-wrap">${escapeHtml(details)}</p>
    </div>
  `.trim();

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || DEFAULT_FROM,
        to: [site.email],
        reply_to: email,
        subject: `New project inquiry — ${name}`,
        text,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`[contact] Resend responded ${res.status}: ${body}`);
      return NextResponse.json(
        { ok: false, error: "Could not send the message." },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("[contact] Request to Resend failed:", error);
    return NextResponse.json(
      { ok: false, error: "Could not send the message." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
