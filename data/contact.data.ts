import type { ContactData } from '@/types/data/data.type';
import socialProfiles from './socialLinks.data';

export const contactData: ContactData = {
  intro: "If you have any questions or concerns, please don't hesitate to contact me.",
  email: 'bluedragon00000@gmail.com',
  address: 'Perth, Western Australia',
  socialLinks: socialProfiles,
};

export default contactData;
