import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, urgency } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { status: 'error', message: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'karan@dev.com', // Will be replaced by env if needed
      subject: `New Portfolio Message from ${name} [${urgency || 'normal'}]`,
      text: `From: ${name} <${email}>\n\nMessage:\n${message}`,
    });

    return NextResponse.json(
      { status: 'success', message: "I'll get back within 24h! 🚀", data },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Contact Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to send message.' },
      { status: 500 }
    );
  }
}
