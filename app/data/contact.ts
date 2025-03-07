import type { SocialProfile } from './socialLinks';
import socialProfiles from './socialLinks';

export interface ContactData {
  intro: string;
  email: string;
  address: string;
  socialLinks: SocialProfile[];
}

export const contactData: ContactData = {
  intro: "If you have any questions or concerns, please don't hesitate to contact me.",
  email: 'bluedragon00000@gmail.com',
  address: 'Perth, Western Australia',
  socialLinks: socialProfiles,
};
