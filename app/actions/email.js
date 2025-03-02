"use server";

import { Resend } from "resend";

export async function sendEmail(formData) {
  // Validate input
  if (
    !formData.name ||
    !formData.email ||
    !formData.subject ||
    !formData.message
  ) {
    return {
      success: false,
      error: "Missing required fields",
    };
  }

  // Get email configuration from environment variables
  const fromEmail = process.env.EMAIL_FROM;
  const toEmail = process.env.EMAIL_TO;

  // Validate environment variables are set
  if (!process.env.RESEND_API_KEY || !fromEmail || !toEmail) {
    console.error("Missing required environment variables for email service");
    return {
      success: false,
      error: "Email service configuration error",
    };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = await resend.emails.send({
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
            <p>${formData.message.replace(/\n/g, "<br>")}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">Reply to: ${
            formData.email
          }</p>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
