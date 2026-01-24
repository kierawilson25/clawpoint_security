import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactFormEmail } from '@/components/email-templates/ContactFormEmail';

// Define the expected request body structure
interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  interest: string[];
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact the administrator.' },
        { status: 503 }
      );
    }

    // Initialize Resend with API key (lazy initialization to avoid build errors)
    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log('API Key present:', !!process.env.RESEND_API_KEY);

    // Parse the request body
    const body: ContactFormData = await request.json();
    console.log('Request body received:', { ...body, message: body.message?.substring(0, 50) });

    // Validate required fields
    if (!body.name || !body.email || !body.company || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send email using Resend
    console.log('Attempting to send email...');
    const { data, error } = await resend.emails.send({
      from: 'Clawpoint Security <onboarding@resend.dev>', // Use test domain for development
      to: ['kierawilson025@gmail.com'], // Testing email (matches Resend account - change to CSC_growth@clawpointsecuritycollective.com for production)
      replyTo: body.email, // User's email for easy replies
      subject: `New Contact Form Submission from ${body.name} - ${body.company}`,
      react: ContactFormEmail({
        name: body.name,
        email: body.email,
        company: body.company,
        phone: body.phone,
        interests: body.interest,
        message: body.message,
      }),
    });

    // Handle Resend API errors
    if (error) {
      console.error('Resend API error:', error);
      console.error('Full error details:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }

    console.log('Email sent successfully! Message ID:', data?.id);

    // Success response
    return NextResponse.json(
      {
        success: true,
        messageId: data?.id,
        message: 'Email sent successfully'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}

// Optional: Add OPTIONS handler for CORS if needed
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
