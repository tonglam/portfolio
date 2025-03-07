/**
 * Certificates and badges data
 * Single source of truth for all certificates displayed on the site
 */
import { EXTERNAL_URLS } from '@/config/constants';

/**
 * Certificate interface
 */
export interface Certificate {
  id: string;
  name: string;
  shortName: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  credentialUrl: string;
  imageUrl: string;
  skills: string[];
}

/**
 * Professional certifications with structured data
 */
export const certificates: Certificate[] = [
  {
    id: 'aws-clf',
    name: 'AWS Certified Cloud Practitioner',
    shortName: 'AWS CLF',
    issuer: 'Amazon Web Services',
    issueDate: '2023-02-15',
    credentialId: 'a912a582-dba1-4a36-b497-82ddf633721d',
    credentialUrl: EXTERNAL_URLS.CERTIFICATES.AWS_CLOUD_PRACTITIONER.CREDENTIAL_URL,
    imageUrl: EXTERNAL_URLS.CERTIFICATES.AWS_CLOUD_PRACTITIONER.IMAGE_URL,
    skills: ['Cloud Computing', 'AWS', 'Cloud Services'],
  },
  {
    id: 'aws-saa',
    name: 'AWS Solutions Architect Associate',
    shortName: 'AWS SAS',
    issuer: 'Amazon Web Services',
    issueDate: '2023-06-20',
    credentialId: 'a912a582-dba1-4a36-b497-82ddf633721d',
    credentialUrl: EXTERNAL_URLS.CERTIFICATES.AWS_SOLUTIONS_ARCHITECT.CREDENTIAL_URL,
    imageUrl: EXTERNAL_URLS.CERTIFICATES.AWS_SOLUTIONS_ARCHITECT.IMAGE_URL,
    skills: ['Solution Architecture', 'AWS', 'Cloud Architecture'],
  },
];

/**
 * Get a specific certificate by ID
 * @param {string} id - The ID of the certificate to retrieve
 * @returns {Certificate|undefined} The certificate object or undefined if not found
 */
export const getCertificate = (id: string): Certificate | undefined => {
  return certificates.find(cert => cert.id === id);
};

export default certificates;
