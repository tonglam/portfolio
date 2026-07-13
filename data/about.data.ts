import { EXTERNAL_URLS } from '@/config/urls.config';
import { AboutData } from '@/types/data.type';

export const aboutData: AboutData = {
  title: 'Who am I',
  content: `I'm Qitong Lan (Tong), \
  a Perth-based software engineer with more than eight years of commercial experience at \
  <a href="${EXTERNAL_URLS.COMPANY.ESURFING_CLOUD.URL}" target="_blank" rel="noopener noreferrer">China Telecom Cloud Technology</a>, \
  <a href="${EXTERNAL_URLS.COMPANY.NETEASE.URL}" target="_blank" rel="noopener noreferrer">NetEase</a>, and \
  <a href="${EXTERNAL_URLS.COMPANY.CHINA_TELECOM.URL}" target="_blank" rel="noopener noreferrer">China Telecom</a>. \
  I build and support backend services, APIs, data-processing workflows, and web products across \
  Java/Spring Boot and TypeScript/Node.js environments. After completing a Master of Information \
  Technology at the University of Western Australia in 2025, I am focused on returning to a \
  hands-on commercial engineering team in Perth, hybrid, or remote work.`,
};

export default aboutData;
