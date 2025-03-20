import type { IconProps } from '@/components/icons/types';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

export const EmailIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaEnvelope size={size} className={className} />
);

export const PhoneIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaPhone size={size} className={className} />
);

export const LocationIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaMapMarkerAlt size={size} className={className} />
);
