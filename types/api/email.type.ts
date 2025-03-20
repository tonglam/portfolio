/**
 * Type definitions for email service and contact form
 */

/**
 * Contact form data structure
 */
export interface ContactFormData {
  /** Name of the person submitting the form */
  name: string;
  /** Email address for correspondence */
  email: string;
  /** Subject of the inquiry */
  subject: string;
  /** Main message content */
  message: string;
}

/**
 * Resend API email response data
 */
export interface ResendEmailData {
  id: string;
  from: string;
  to: string[];
  created_at: string;
}

/**
 * Email service error codes
 */
export type EmailErrorCode = 'MISSING_FIELDS' | 'INVALID_EMAIL' | 'CONFIG_ERROR' | 'SEND_ERROR';

/**
 * Email service error response
 */
export interface EmailError {
  code: EmailErrorCode;
  message: string;
}

/**
 * Email service success response
 */
export interface EmailSuccess {
  success: true;
  data: ResendEmailData;
  error?: never;
}

/**
 * Email service error response
 */
export interface EmailFailure {
  success: false;
  data?: never;
  error: EmailError;
}

/**
 * Email service response type
 */
export type EmailResponse = EmailSuccess | EmailFailure;
