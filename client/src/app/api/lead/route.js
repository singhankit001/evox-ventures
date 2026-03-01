import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, eventType, location, guests, date, budget, quote } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }


    // Send email if configured
    const smtpUser = process.env.EMAIL_USER;
    const smtpPass = process.env.EMAIL_PASS;

    if (smtpUser && smtpPass) {
      const nodemailer = (await import("nodemailer")).default;
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: smtpUser, pass: smtpPass },
      });

      const formatINR = (n) => {
        if (!n) return "—";
        if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
        if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
        return `₹${n}`;
      };

      const quoteSection = quote
        ? `
━━━━━━━━━━━━━━━━━━━━━━━━━
GENERATED QUOTE
━━━━━━━━━━━━━━━━━━━━━━━━━
Venue:         ${formatINR(quote.venue)}
Décor:         ${formatINR(quote.decor)}
Catering:      ${formatINR(quote.catering)}
Entertainment: ${formatINR(quote.entertainment)}
─────────────────────────
TOTAL:         ${formatINR(quote.total)} (approx)
`
        : "";

      const emailText = `
🎯 NEW EVOX CONCIERGE LEAD
━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━
Name:    ${name}
Email:   ${email}
Phone:   ${phone || "—"}

━━━━━━━━━━━━━━━━━━━━━━━━━
EVENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━
Event Type: ${eventType || "—"}
Location:   ${location || "—"}
Guests:     ${guests || "—"}
Date:       ${date || "—"}
Budget:     ${budget || "—"}
${quoteSection}
━━━━━━━━━━━━━━━━━━━━━━━━━
Captured via Evox Concierge AI
      `.trim();

      await transporter.sendMail({
        from: `"Evox Concierge" <${smtpUser}>`,
        to: smtpUser,
        replyTo: email,
        subject: `🎯 New Lead: ${eventType?.replace("_", " ") || "Event"} from ${name}`,
        text: emailText,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Lead API Error]", err.message);
    return NextResponse.json({ error: "Failed to process lead." }, { status: 500 });
  }
}
