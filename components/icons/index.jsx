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
  FaGithub,
  FaHtml5,
  FaJs,
  FaLinkedin,
  FaMapMarkerAlt,
  FaMediumM,
  FaNodeJs,
  FaNpm,
  FaPhone,
  FaReact,
  FaServer,
  FaTimes,
  FaTwitter,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  SiExpress,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNginx,
  SiRedux,
  SiStrapi,
  SiTypescript,
} from "react-icons/si";

// Social Media Icons
export const GithubIcon = ({ size = 24, className }) => (
  <FaGithub size={size} className={className} />
);

export const LinkedinIcon = ({ size = 24, className }) => (
  <FaLinkedin size={size} className={className} />
);

export const FacebookIcon = ({ size = 24, className }) => (
  <FaFacebook size={size} className={className} />
);

export const TwitterIcon = ({ size = 24, className }) => (
  <FaTwitter size={size} className={className} />
);

export const XIcon = ({ size = 24, className }) => (
  <FaXTwitter size={size} className={className} />
);

export const MediumIcon = ({ size = 24, className }) => (
  <FaMediumM size={size} className={className} />
);

// Contact Icons
export const EmailIcon = ({ size = 24, className }) => (
  <FaEnvelope size={size} className={className} />
);

export const PhoneIcon = ({ size = 24, className }) => (
  <FaPhone size={size} className={className} />
);

export const LocationIcon = ({ size = 24, className }) => (
  <FaMapMarkerAlt size={size} className={className} />
);

// UI Icons
export const CheckIcon = ({ size = 24, className }) => (
  <FaCheck size={size} className={className} />
);

export const CommentIcon = ({ size = 24, className }) => (
  <FaComment size={size} className={className} />
);

export const ArrowUpIcon = ({ size = 24, className }) => (
  <FaArrowUp size={size} className={className} />
);

export const MenuIcon = ({ size = 24, className }) => (
  <FaBars size={size} className={className} />
);

export const CloseIcon = ({ size = 24, className }) => (
  <FaTimes size={size} className={className} />
);

// Technology Icons
export const HtmlIcon = ({ size = 24, className }) => (
  <FaHtml5 size={size} className={className} />
);

export const CssIcon = ({ size = 24, className }) => (
  <FaCss3Alt size={size} className={className} />
);

export const JavascriptIcon = ({ size = 24, className }) => (
  <FaJs size={size} className={className} />
);

export const TypescriptIcon = ({ size = 24, className }) => (
  <SiTypescript size={size} className={className} />
);

export const ReactIcon = ({ size = 24, className }) => (
  <FaReact size={size} className={className} />
);

export const NodejsIcon = ({ size = 24, className }) => (
  <FaNodeJs size={size} className={className} />
);

export const NginxIcon = ({ size = 24, className }) => (
  <SiNginx size={size} className={className} />
);

export const StrapiIcon = ({ size = 24, className }) => (
  <SiStrapi size={size} className={className} />
);

export const MongodbIcon = ({ size = 24, className }) => (
  <SiMongodb size={size} className={className} />
);

export const MysqlIcon = ({ size = 24, className }) => (
  <SiMysql size={size} className={className} />
);

export const ReduxIcon = ({ size = 24, className }) => (
  <SiRedux size={size} className={className} />
);

export const ExpressIcon = ({ size = 24, className }) => (
  <SiExpress size={size} className={className} />
);

export const NestjsIcon = ({ size = 24, className }) => (
  <SiNestjs size={size} className={className} />
);

export const DockerIcon = ({ size = 24, className }) => (
  <FaDocker size={size} className={className} />
);

export const AwsIcon = ({ size = 24, className }) => (
  <FaAws size={size} className={className} />
);

export const DatabaseIcon = ({ size = 24, className }) => (
  <FaDatabase size={size} className={className} />
);

export const ServerIcon = ({ size = 24, className }) => (
  <FaServer size={size} className={className} />
);

export const NpmIcon = ({ size = 24, className }) => (
  <FaNpm size={size} className={className} />
);

// Helper function to create icon components with consistent props
export const createIconComponent = (Icon) => {
  const IconComponent = ({ size = 24, className }) => (
    <Icon size={size} className={className} />
  );
  IconComponent.displayName = `Icon${Icon.name || "Component"}`;
  return IconComponent;
};
