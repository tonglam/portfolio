/**
 * Certificates and badges data
 * Single source of truth for all certificates displayed on the site
 */

/**
 * Professional certifications with structured data
 */
export const certificates = [
  {
    id: "aws-clf",
    name: "AWS Certified Cloud Practitioner",
    shortName: "AWS CLF",
    issuer: "Amazon Web Services",
    issueDate: "2023-02-15",
    credentialId: "a912a582-dba1-4a36-b497-82ddf633721d",
    credentialUrl:
      "https://www.credly.com/badges/a912a582-dba1-4a36-b497-82ddf633721d/public_url",
    imageUrl:
      "https://images.credly.com/size/110x110/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png",
    skills: ["Cloud Computing", "AWS", "Cloud Services"],
  },
  {
    id: "aws-saa",
    name: "AWS Solutions Architect Associate",
    shortName: "AWS SAS",
    issuer: "Amazon Web Services",
    issueDate: "2023-06-20",
    credentialId: "a912a582-dba1-4a36-b497-82ddf633721d", // This should be the actual ID
    credentialUrl:
      "https://www.credly.com/badges/a912a582-dba1-4a36-b497-82ddf633721d/public_url",
    imageUrl:
      "https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png",
    skills: ["Solution Architecture", "AWS", "Cloud Architecture"],
  },
];

/**
 * Get a specific certificate by ID
 * @param {string} id - The ID of the certificate to retrieve
 * @returns {Object|undefined} The certificate object or undefined if not found
 */
export const getCertificate = (id) => {
  return certificates.find((cert) => cert.id === id);
};

export default certificates;
