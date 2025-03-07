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
  FaGithub,
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
  size?: number;
  className?: string;
}

// Social Media Icons
export const GithubIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaGithub size={size} className={className} />
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

/**
 * Generic icon component factory
 */
export const createIconComponent = (Icon: React.ElementType): React.FC<IconProps> => {
  const IconComponent: React.FC<IconProps> = ({ size = 24, className }) => (
    <Icon size={size} className={className} />
  );
  return IconComponent;
};
