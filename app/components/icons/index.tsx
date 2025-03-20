import type { LucideProps } from 'lucide-react';
import React from 'react';
import { AiOutlineCode } from 'react-icons/ai';
import { BsKanban } from 'react-icons/bs';
import {
  FaArrowUp,
  FaAws,
  FaBars,
  FaCheck,
  FaComment,
  FaCss3Alt,
  FaDatabase,
  FaDocker,
  FaEnvelope,
  FaFacebook,
  FaGitAlt,
  FaGithubAlt,
  FaHtml5,
  FaJava,
  FaJs,
  FaLinkedin,
  FaMapMarkerAlt,
  FaMediumM,
  FaNodeJs,
  FaNpm,
  FaPhone,
  FaPython,
  FaReact,
  FaServer,
  FaTerminal,
  FaTimes,
  FaTwitter,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { GrStatusInfo } from 'react-icons/gr';
import {
  SiConfluence,
  SiExpress,
  SiFlask,
  SiJenkins,
  SiJira,
  SiJunit5,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiPostgresql,
  SiPostman,
  SiRedis,
  SiRedux,
  SiSpringboot,
  SiSqlite,
  SiStrapi,
  SiTypescript,
  SiVitest,
} from 'react-icons/si';

// Define interface for icon props
interface IconProps {
  size?: string | number;
  className?: string;
}

// Social Media Icons
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

// Contact Icons
export const EmailIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaEnvelope size={size} className={className} />
);

export const PhoneIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaPhone size={size} className={className} />
);

export const LocationIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaMapMarkerAlt size={size} className={className} />
);

// UI Icons
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

// Technology Icons
export const HtmlIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaHtml5 size={size} className={className} />
);

export const CssIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaCss3Alt size={size} className={className} />
);

export const JavascriptIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaJs size={size} className={className} />
);

export const TypescriptIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <SiTypescript size={size} className={className} />
);

export const ReactIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaReact size={size} className={className} />
);

export const NodejsIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaNodeJs size={size} className={className} />
);

export const NginxIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <SiNginx size={size} className={className} />
);

export const StrapiIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <SiStrapi size={size} className={className} />
);

export const MongodbIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <SiMongodb size={size} className={className} />
);

export const MysqlIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <SiMysql size={size} className={className} />
);

export const ReduxIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <SiRedux size={size} className={className} />
);

export const ExpressIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <SiExpress size={size} className={className} />
);

export const NestjsIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <SiNestjs size={size} className={className} />
);

export const DockerIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaDocker size={size} className={className} />
);

export const AwsIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaAws size={size} className={className} />
);

export const DatabaseIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaDatabase size={size} className={className} />
);

export const ServerIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaServer size={size} className={className} />
);

export const NpmIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaNpm size={size} className={className} />
);

// New technology icons
export const JavaIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaJava size={size} className={className} />
);

export const PythonIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaPython size={size} className={className} />
);

export const SqlIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <DatabaseIcon size={size} className={className} />
);

export const NextjsIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <SiNextdotjs size={size} className={className} />
);

export const SpringBootIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <SiSpringboot size={size} className={className} />
);

export const FlaskIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <SiFlask size={size} className={className} />
);

export const PostgresqlIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <SiPostgresql size={size} className={className} />
);

export const RedisIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <SiRedis size={size} className={className} />
);

export const SqliteIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <SiSqlite size={size} className={className} />
);

export const JunitIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <SiJunit5 size={size} className={className} />
);

export const VitestIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <SiVitest size={size} className={className} />
);

export const PytestIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <AiOutlineCode size={size} className={className} />
);

export const PostmanIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <SiPostman size={size} className={className} />
);

export const GitIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaGitAlt size={size} className={className} />
);

export const JenkinsIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <SiJenkins size={size} className={className} />
);

export const AgileIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <GrStatusInfo size={size} className={className} />
);

export const KanbanIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <BsKanban size={size} className={className} />
);

export const JiraIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <SiJira size={size} className={className} />
);

export const ShellIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaTerminal size={size} className={className} />
);

export const ConfluenceIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <SiConfluence size={size} className={className} />
);

export const GithubProjectsIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaGithubAlt size={size} className={className} />
);

export const ExternalLinkIcon = ({ size = 24, ...props }: LucideProps): JSX.Element => (
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
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

// Re-export all icons
export * from './ai-tools';
export * from './contact';
export * from './external-link';
export * from './social';
export * from './tech';
export type { IconProps } from './types';
export * from './ui';

// Export utility functions
export const createIconComponent = (Icon: React.ElementType): React.FC<IconProps> => {
  const IconComponent: React.FC<IconProps> = ({ size = 24, className }) => (
    <Icon size={size} className={className} />
  );
  return IconComponent;
};
