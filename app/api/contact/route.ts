import { NextResponse } from "next/server";

import { projectTypes } from "@/lib/contact";

const allowedProjectTypes = new Set<string>(projectTypes);

const headerUnsafePattern = /[\u0000-\u001f\u007f]/;
const maxRequestBytes = 16_384;

type Enquiry = {
  name: string;
  agency: string;
  email: string;
  projectType: string;
  projectDetails: string;
};

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function parseEnquiry(body: unknown): Enquiry | null {
  if (!body || typeof body !== "object") return null;

  const record = body as Record<string, unknown>;
  const enquiry = {
    name: readString(record.name),
    agency: readString(record.agency),
    email: readString(record.email).toLowerCase(),
    projectType: readString(record.projectType),
    projectDetails: readString(record.projectDetails),
  };

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email);

  if (
    enquiry.name.length < 2 ||
    enquiry.name.length > 100 ||
    headerUnsafePattern.test(enquiry.name) ||
    (record.source !== "contact" && enquiry.agency.length < 2) ||
    enquiry.agency.length > 120 ||
    headerUnsafePattern.test(enquiry.agency) ||
    !validEmail ||
    enquiry.email.length > 254 ||
    headerUnsafePattern.test(enquiry.email) ||
    !allowedProjectTypes.has(enquiry.projectType) ||
    enquiry.projectDetails.length < 20 ||
    enquiry.projectDetails.length > 4000
  ) {
    return null;
  }

  return enquiry;
}

async function readBoundedJson(request: Request): Promise<unknown> {
  const contentLength = Number(request.headers.get("content-length"));

  if (Number.isFinite(contentLength) && contentLength > maxRequestBytes) {
    throw new Error("Request body is too large");
  }

  if (!request.body) {
    throw new Error("Request body is missing");
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    totalBytes += value.byteLength;

    if (totalBytes > maxRequestBytes) {
      await reader.cancel();
      throw new Error("Request body is too large");
    }

    chunks.push(value);
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;

  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return JSON.parse(new TextDecoder().decode(bytes));
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await readBoundedJson(request);
  } catch {
    return NextResponse.json(
      { error: "Please complete every required field and try again." },
      { status: 400 },
    );
  }

  if (
    body &&
    typeof body === "object" &&
    readString((body as Record<string, unknown>).website)
  ) {
    return NextResponse.json({ ok: true });
  }

  const enquiry = parseEnquiry(body);

  if (!enquiry) {
    return NextResponse.json(
      { error: "Please complete every required field with valid details." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? process.env.AGENCY_CONTACT_TO;
  const from = process.env.CONTACT_FROM ?? process.env.AGENCY_CONTACT_FROM;

  if (!apiKey || !to || !from) {
    console.error("Contact delivery is not configured");
    return NextResponse.json(
      {
        error:
          "The contact form is temporarily unavailable. Please email pawan@hexcode.au.",
      },
      { status: 503 },
    );
  }

  const emailBody = [
    "New HexCode engineering enquiry",
    "",
    `Name: ${enquiry.name}`,
    `Company / team: ${enquiry.agency || "Not supplied"}`,
    `Email: ${enquiry.email}`,
    `Project type: ${enquiry.projectType}`,
    "",
    "Project details:",
    enquiry.projectDetails,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: enquiry.email,
        subject: `HexCode enquiry: ${enquiry.projectType}`,
        text: emailBody,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("Resend rejected engineering enquiry", response.status);
      return NextResponse.json(
        {
          error:
            "Your enquiry could not be delivered. Please email pawan@hexcode.au.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Engineering enquiry delivery failed", error);
    return NextResponse.json(
      {
        error:
          "Your enquiry could not be delivered. Please email pawan@hexcode.au.",
      },
      { status: 502 },
    );
  }
}
