import type { IconProps } from '@/components/icons/types';
import { FaArrowUp, FaBars, FaCheck, FaComment, FaTimes } from 'react-icons/fa';

export const CheckIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaCheck size={size} className={className} />
);

export const CommentIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaComment size={size} className={className} />
);

export const ArrowUpIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaArrowUp size={size} className={className} />
);

export const MenuIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaBars size={size} className={className} />
);

export const CloseIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaTimes size={size} className={className} />
);
