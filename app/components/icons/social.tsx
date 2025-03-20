import type { LucideProps } from 'lucide-react';
import { FaFacebook, FaLinkedin, FaMediumM, FaTwitter } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import type { IconProps } from './types';

export const GithubIcon = ({ size = 24, ...props }: LucideProps): JSX.Element => (
  <svg
    height={size}
    width={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export const LinkedinIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaLinkedin size={size} className={className} />
);

export const FacebookIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaFacebook size={size} className={className} />
);

export const TwitterIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaTwitter size={size} className={className} />
);

export const XIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaXTwitter size={size} className={className} />
);

export const MediumIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaMediumM size={size} className={className} />
);
