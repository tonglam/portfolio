export interface SocialLink {
  id: string;
  icon: string;
  url: string;
  ariaLabel: string;
}

export interface ContactData {
  intro: string;
  email: string;
  address: string;
  socialLinks: SocialLink[];
}
