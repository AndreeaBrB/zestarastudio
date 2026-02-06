import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API key
// You will need to get a free API key from https://resend.com and add it to .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, message } = body;

        // Basic validation
        if (!firstName || !email || !message) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const { data, error } = await resend.emails.send({
            from: 'Zestara <contact@fleneekari.resend.app>',
            to: ['delivered@resend.dev'], // Emails will appear in your Resend Dashboard > Emails
            subject: `New Contact Message from ${firstName} ${lastName}`,
            html: `
        <h2>New Message from Zestara Website</h2>
        <p><strong>From:</strong> ${firstName} ${lastName} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });

        if (error) {
            console.error("Resend error:", error);
            return new NextResponse(`Email failed: ${error.message}`, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Contact API error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
