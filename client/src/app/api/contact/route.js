import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Validate request
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Standard Nodemailer configuration using Gmail SMTP
    // Requires EMAIL_USER and EMAIL_PASS (Gmail App Password) in .env.local
    const userEmail = process.env.EMAIL_USER;
    const userPass = process.env.EMAIL_PASS;

    if (!userEmail || !userPass) {
      console.warn("Nodemailer: EMAIL_USER or EMAIL_PASS not set in environment.");
      // For UI testing/development without breaking if no SMTP setup exists yet.
      return NextResponse.json(
        { message: "Development simulation: Message received successfully! (No SMTP setup)" },
        { status: 200 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: userEmail,
        pass: userPass,
      },
    });

    const mailOptions = {
      from: userEmail,
      to: userEmail, // Send the inquiry TO yourself
      replyTo: email,
      subject: `New Inquiry from Evox Ventures Website`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Your message has been sent successfully 🚀" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
