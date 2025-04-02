import { EXTERNAL_URLS } from '@/config/urls.config';
import { Certificate } from '@/types/data.type';

export const certificates: Certificate[] = [
  {
    id: 'aws-clf',
    name: 'AWS Certified Cloud Practitioner',
    shortName: 'AWS CLF',
    issuer: 'Amazon Web Services',
    issueDate: '2023-01-21',
    credentialId: 'a19f51dc-d001-48f0-a959-4d62d2b07761',
    credentialUrl: EXTERNAL_URLS.CERTIFICATES.AWS_CLOUD_PRACTITIONER.CREDENTIAL_URL,
    imageUrl: EXTERNAL_URLS.CERTIFICATES.AWS_CLOUD_PRACTITIONER.IMAGE_URL,
    skills: ['Cloud Computing', 'AWS', 'Cloud Services'],
  },
  {
    id: 'aws-saa',
    name: 'AWS Solutions Architect Associate',
    shortName: 'AWS SAS',
    issuer: 'Amazon Web Services',
    issueDate: '2025-03-21',
    credentialId: '4ca74e6e-cd0c-4ed7-a377-4bf7f9f9bd0e',
    credentialUrl: EXTERNAL_URLS.CERTIFICATES.AWS_SOLUTIONS_ARCHITECT.CREDENTIAL_URL,
    imageUrl: EXTERNAL_URLS.CERTIFICATES.AWS_SOLUTIONS_ARCHITECT.IMAGE_URL,
    skills: ['Solution Architecture', 'AWS', 'Cloud Architecture'],
  },
];

export const getCertificate = (id: string): Certificate | undefined => {
  return certificates.find(cert => cert.id === id);
};

export default certificates;
