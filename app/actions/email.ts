'use server';

import { logger } from '@/lib/logger.util';
import type {
  ContactFormData,
  EmailErrorCode,
  EmailResponse,
  ResendEmailData,
} from '@/types/email.type';
import { Resend } from 'resend';

export async function sendEmail(formData: ContactFormData): Promise<EmailResponse> {
  // Validate input
  if (!formData.name || !formData.email || !formData.subject || !formData.message) {
    const error: EmailErrorCode = 'MISSING_FIELDS';
    logger.warn({ formData }, 'Missing required fields in contact form');
    return {
      success: false,
      error: {
        code: error,
        message: 'All fields are required',
      },
    };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    const error: EmailErrorCode = 'INVALID_EMAIL';
    logger.warn({ email: formData.email }, 'Invalid email format');
    return {
      success: false,
      error: {
        code: error,
        message: 'Invalid email format',
      },
    };
  }

  const fromEmail = process.env.EMAIL_FROM;
  const toEmail = process.env.EMAIL_TO;

  // Validate environment variables are set
  if (!process.env.RESEND_API_KEY || !fromEmail || !toEmail) {
    const error: EmailErrorCode = 'CONFIG_ERROR';
    logger.error(
      {
        RESEND_API_KEY: !!process.env.RESEND_API_KEY,
        EMAIL_FROM: !!process.env.EMAIL_FROM,
        EMAIL_TO: !!process.env.EMAIL_TO,
      },
      'Missing required environment variables for email service'
    );
    return {
      success: false,
      error: {
        code: error,
        message: 'Email service configuration error',
      },
    };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const response = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: formData.email,
      subject: `Portfolio Contact: ${formData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3B82F6;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Subject:</strong> ${formData.subject}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
            <p><strong>Message:</strong></p>
            <p>${formData.message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">Reply to: ${formData.email}</p>
        </div>
      `,
    });

    return {
      success: true,
      data: response.data as ResendEmailData,
    };
  } catch (error: unknown) {
    const errorCode: EmailErrorCode = 'SEND_ERROR';
    logger.error({ error }, 'Error sending email');
    return {
      success: false,
      error: {
        code: errorCode,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      },
    };
  }
}
