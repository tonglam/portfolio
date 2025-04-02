import { createIconComponent } from '@/lib/icon.util';
import type { IconRegistry } from '@/types/icon.type';
import { IconCategory } from '@/types/icon.type';
import { AiOutlineCode } from 'react-icons/ai';
import { BsKanban } from 'react-icons/bs';
import {
  FaArrowUp,
  FaAws,
  FaBars,
  FaBootstrap,
  FaCheck,
  FaComment,
  FaCss3Alt,
  FaDatabase,
  FaDocker,
  FaEnvelope,
  FaGitAlt,
  FaGithub,
  FaGithubAlt,
  FaHtml5,
  FaJava,
  FaJs,
  FaLinkedin,
  FaMapMarkerAlt,
  FaNodeJs,
  FaNpm,
  FaPython,
  FaReact,
  FaServer,
  FaTerminal,
  FaTimes,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { GrStatusInfo } from 'react-icons/gr';
import {
  SiBun,
  SiConfluence,
  SiExpress,
  SiFlask,
  SiGithubactions,
  SiJenkins,
  SiJest,
  SiJira,
  SiJunit5,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiPostgresql,
  SiPostman,
  SiRadixui,
  SiRedis,
  SiRedux,
  SiSpringboot,
  SiSqlite,
  SiStrapi,
  SiSupabase,
  SiTypescript,
  SiVitest,
} from 'react-icons/si';
import { AIToolIcon, BoltNewIcon, CursorIcon, MCPIcon, V0Icon, WindsurfIcon } from './ai-tools';
import { ExternalLinkIcon } from './external-link';

// --- Direct Exports for Server Component Usage ---

// Social Icons
export const GithubIcon = createIconComponent(FaGithub);
export const LinkedinIcon = createIconComponent(FaLinkedin);
export const XIcon = createIconComponent(FaXTwitter);

// Contact Icons
export const EmailIcon = createIconComponent(FaEnvelope);
export const LocationIcon = createIconComponent(FaMapMarkerAlt);

// UI Icons
export { ExternalLinkIcon }; // Already a component
export const CheckIcon = createIconComponent(FaCheck);
export const CommentIcon = createIconComponent(FaComment);
export const ArrowUpIcon = createIconComponent(FaArrowUp);
export const MenuIcon = createIconComponent(FaBars);
export const CloseIcon = createIconComponent(FaTimes);

// Tech Icons
export const HtmlIcon = createIconComponent(FaHtml5);
export const CssIcon = createIconComponent(FaCss3Alt);
export const JavascriptIcon = createIconComponent(FaJs);
export const TypescriptIcon = createIconComponent(SiTypescript);
export const ReactIcon = createIconComponent(FaReact);
export const NodejsIcon = createIconComponent(FaNodeJs);
export const NginxIcon = createIconComponent(SiNginx);
export const StrapiIcon = createIconComponent(SiStrapi);
export const MongodbIcon = createIconComponent(SiMongodb);
export const MysqlIcon = createIconComponent(SiMysql);
export const ReduxIcon = createIconComponent(SiRedux);
export const ExpressIcon = createIconComponent(SiExpress);
export const NestjsIcon = createIconComponent(SiNestjs);
export const DockerIcon = createIconComponent(FaDocker);
export const AwsIcon = createIconComponent(FaAws);
export const DatabaseIcon = createIconComponent(FaDatabase);
export const ServerIcon = createIconComponent(FaServer);
export const NpmIcon = createIconComponent(FaNpm);
export const JavaIcon = createIconComponent(FaJava);
export const PythonIcon = createIconComponent(FaPython);
export const NextjsIcon = createIconComponent(SiNextdotjs);
export const SpringBootIcon = createIconComponent(SiSpringboot);
export const FlaskIcon = createIconComponent(SiFlask);
export const PostgresqlIcon = createIconComponent(SiPostgresql);
export const RedisIcon = createIconComponent(SiRedis);
export const SqliteIcon = createIconComponent(SiSqlite);
export const JunitIcon = createIconComponent(SiJunit5);
export const VitestIcon = createIconComponent(SiVitest);
export const PytestIcon = createIconComponent(AiOutlineCode); // Note: Using AiOutlineCode for Pytest
export const PostmanIcon = createIconComponent(SiPostman);
export const GitIcon = createIconComponent(FaGitAlt);
export const JenkinsIcon = createIconComponent(SiJenkins);
export const JiraIcon = createIconComponent(SiJira);
export const AgileIcon = createIconComponent(GrStatusInfo); // Note: Using GrStatusInfo for Agile
export const KanbanIcon = createIconComponent(BsKanban);
export const ShellIcon = createIconComponent(FaTerminal);
export const ConfluenceIcon = createIconComponent(SiConfluence);
export const GithubProjectsIcon = createIconComponent(FaGithubAlt);
export const BunIcon = createIconComponent(SiBun);
export const ElysiaIcon = createIconComponent(FaNodeJs); // Note: Reusing FaNodeJs for Elysia
export const GithubActionsIcon = createIconComponent(SiGithubactions);
export const JestIcon = createIconComponent(SiJest);
export const BootstrapIcon = createIconComponent(FaBootstrap);
export const ShadcnIcon = createIconComponent(SiRadixui);
export const SupabaseIcon = createIconComponent(SiSupabase);

// AI Tool Icons
export { AIToolIcon, BoltNewIcon, CursorIcon, MCPIcon, V0Icon, WindsurfIcon };

// Social Icons
const _GithubIcon = GithubIcon;
const _LinkedinIcon = LinkedinIcon;
const _XIcon = XIcon;
const _EmailIcon = EmailIcon;
const _LocationIcon = LocationIcon;
const _ExternalLinkIcon = ExternalLinkIcon;
const _CheckIcon = CheckIcon;
const _CommentIcon = CommentIcon;
const _ArrowUpIcon = ArrowUpIcon;
const _MenuIcon = MenuIcon;
const _CloseIcon = CloseIcon;
const _HtmlIcon = HtmlIcon;
const _CssIcon = CssIcon;
const _JavascriptIcon = JavascriptIcon;
const _TypescriptIcon = TypescriptIcon;
const _ReactIcon = ReactIcon;
const _NodejsIcon = NodejsIcon;
const _NginxIcon = NginxIcon;
const _StrapiIcon = StrapiIcon;
const _MongodbIcon = MongodbIcon;
const _MysqlIcon = MysqlIcon;
const _ReduxIcon = ReduxIcon;
const _ExpressIcon = ExpressIcon;
const _NestjsIcon = NestjsIcon;
const _DockerIcon = DockerIcon;
const _AwsIcon = AwsIcon;
const _DatabaseIcon = DatabaseIcon;
const _ServerIcon = ServerIcon;
const _NpmIcon = NpmIcon;
const _JavaIcon = JavaIcon;
const _PythonIcon = PythonIcon;
const _NextjsIcon = NextjsIcon;
const _SpringBootIcon = SpringBootIcon;
const _FlaskIcon = FlaskIcon;
const _PostgresqlIcon = PostgresqlIcon;
const _RedisIcon = RedisIcon;
const _SqliteIcon = SqliteIcon;
const _JunitIcon = JunitIcon;
const _VitestIcon = VitestIcon;
const _PytestIcon = PytestIcon;
const _PostmanIcon = PostmanIcon;
const _GitIcon = GitIcon;
const _JenkinsIcon = JenkinsIcon;
const _JiraIcon = JiraIcon;
const _AgileIcon = AgileIcon;
const _KanbanIcon = KanbanIcon;
const _ShellIcon = ShellIcon;
const _ConfluenceIcon = ConfluenceIcon;
const _GithubProjectsIcon = GithubProjectsIcon;
const _BunIcon = BunIcon;
const _ElysiaIcon = ElysiaIcon;
const _GithubActionsIcon = GithubActionsIcon;
const _JestIcon = JestIcon;
const _BootstrapIcon = BootstrapIcon;
const _ShadcnIcon = ShadcnIcon;
const _SupabaseIcon = SupabaseIcon;
const _BoltNewIcon = BoltNewIcon;
const _CursorIcon = CursorIcon;
const _MCPIcon = MCPIcon;
const _V0Icon = V0Icon;
const _WindsurfIcon = WindsurfIcon;

export const iconRegistry: IconRegistry = {
  // Social Icons
  GithubIcon: { name: 'GithubIcon', category: IconCategory.SOCIAL, component: _GithubIcon },
  LinkedinIcon: { name: 'LinkedinIcon', category: IconCategory.SOCIAL, component: _LinkedinIcon },
  XIcon: { name: 'XIcon', category: IconCategory.SOCIAL, component: _XIcon },
  EmailIcon: { name: 'EmailIcon', category: IconCategory.CONTACT, component: _EmailIcon },
  LocationIcon: { name: 'LocationIcon', category: IconCategory.CONTACT, component: _LocationIcon },
  ExternalLinkIcon: {
    name: 'ExternalLinkIcon',
    category: IconCategory.UI,
    component: _ExternalLinkIcon,
  },
  CheckIcon: { name: 'CheckIcon', category: IconCategory.UI, component: _CheckIcon },
  CommentIcon: { name: 'CommentIcon', category: IconCategory.UI, component: _CommentIcon },
  ArrowUpIcon: { name: 'ArrowUpIcon', category: IconCategory.UI, component: _ArrowUpIcon },
  MenuIcon: { name: 'MenuIcon', category: IconCategory.UI, component: _MenuIcon },
  CloseIcon: { name: 'CloseIcon', category: IconCategory.UI, component: _CloseIcon },
  HtmlIcon: { name: 'HtmlIcon', category: IconCategory.TECH, component: _HtmlIcon },
  CssIcon: { name: 'CssIcon', category: IconCategory.TECH, component: _CssIcon },
  JavascriptIcon: {
    name: 'JavascriptIcon',
    category: IconCategory.TECH,
    component: _JavascriptIcon,
  },
  TypescriptIcon: {
    name: 'TypescriptIcon',
    category: IconCategory.TECH,
    component: _TypescriptIcon,
  },
  ReactIcon: { name: 'ReactIcon', category: IconCategory.TECH, component: _ReactIcon },
  NodejsIcon: { name: 'NodejsIcon', category: IconCategory.TECH, component: _NodejsIcon },
  NginxIcon: { name: 'NginxIcon', category: IconCategory.TECH, component: _NginxIcon },
  StrapiIcon: { name: 'StrapiIcon', category: IconCategory.TECH, component: _StrapiIcon },
  MongodbIcon: { name: 'MongodbIcon', category: IconCategory.TECH, component: _MongodbIcon },
  MysqlIcon: { name: 'MysqlIcon', category: IconCategory.TECH, component: _MysqlIcon },
  ReduxIcon: { name: 'ReduxIcon', category: IconCategory.TECH, component: _ReduxIcon },
  ExpressIcon: { name: 'ExpressIcon', category: IconCategory.TECH, component: _ExpressIcon },
  NestjsIcon: { name: 'NestjsIcon', category: IconCategory.TECH, component: _NestjsIcon },
  DockerIcon: { name: 'DockerIcon', category: IconCategory.TECH, component: _DockerIcon },
  AwsIcon: { name: 'AwsIcon', category: IconCategory.TECH, component: _AwsIcon },
  DatabaseIcon: { name: 'DatabaseIcon', category: IconCategory.TECH, component: _DatabaseIcon },
  ServerIcon: { name: 'ServerIcon', category: IconCategory.TECH, component: _ServerIcon },
  NpmIcon: { name: 'NpmIcon', category: IconCategory.TECH, component: _NpmIcon },
  JavaIcon: { name: 'JavaIcon', category: IconCategory.TECH, component: _JavaIcon },
  PythonIcon: { name: 'PythonIcon', category: IconCategory.TECH, component: _PythonIcon },
  NextjsIcon: { name: 'NextjsIcon', category: IconCategory.TECH, component: _NextjsIcon },
  SpringBootIcon: {
    name: 'SpringBootIcon',
    category: IconCategory.TECH,
    component: _SpringBootIcon,
  },
  FlaskIcon: { name: 'FlaskIcon', category: IconCategory.TECH, component: _FlaskIcon },
  PostgresqlIcon: {
    name: 'PostgresqlIcon',
    category: IconCategory.TECH,
    component: _PostgresqlIcon,
  },
  RedisIcon: { name: 'RedisIcon', category: IconCategory.TECH, component: _RedisIcon },
  SqliteIcon: { name: 'SqliteIcon', category: IconCategory.TECH, component: _SqliteIcon },
  JunitIcon: { name: 'JunitIcon', category: IconCategory.TECH, component: _JunitIcon },
  VitestIcon: { name: 'VitestIcon', category: IconCategory.TECH, component: _VitestIcon },
  PytestIcon: { name: 'PytestIcon', category: IconCategory.TECH, component: _PytestIcon },
  PostmanIcon: { name: 'PostmanIcon', category: IconCategory.TECH, component: _PostmanIcon },
  GitIcon: { name: 'GitIcon', category: IconCategory.TECH, component: _GitIcon },
  JenkinsIcon: { name: 'JenkinsIcon', category: IconCategory.TECH, component: _JenkinsIcon },
  JiraIcon: { name: 'JiraIcon', category: IconCategory.TECH, component: _JiraIcon },
  AgileIcon: { name: 'AgileIcon', category: IconCategory.TECH, component: _AgileIcon },
  KanbanIcon: { name: 'KanbanIcon', category: IconCategory.TECH, component: _KanbanIcon },
  ShellIcon: { name: 'ShellIcon', category: IconCategory.TECH, component: _ShellIcon },
  ConfluenceIcon: {
    name: 'ConfluenceIcon',
    category: IconCategory.TECH,
    component: _ConfluenceIcon,
  },
  GithubProjectsIcon: {
    name: 'GithubProjectsIcon',
    category: IconCategory.TECH,
    component: _GithubProjectsIcon,
  },
  BunIcon: { name: 'BunIcon', category: IconCategory.TECH, component: _BunIcon },
  ElysiaIcon: { name: 'ElysiaIcon', category: IconCategory.TECH, component: _ElysiaIcon },
  GithubActionsIcon: {
    name: 'GithubActionsIcon',
    category: IconCategory.TECH,
    component: _GithubActionsIcon,
  },
  JestIcon: { name: 'JestIcon', category: IconCategory.TECH, component: _JestIcon },
  BootstrapIcon: { name: 'BootstrapIcon', category: IconCategory.TECH, component: _BootstrapIcon },
  ShadcnIcon: { name: 'ShadcnIcon', category: IconCategory.TECH, component: _ShadcnIcon },
  SupabaseIcon: { name: 'SupabaseIcon', category: IconCategory.TECH, component: _SupabaseIcon },

  // AI Tool Icons
  BoltNewIcon: { name: 'BoltNewIcon', category: IconCategory.AI_TOOLS, component: _BoltNewIcon },
  CursorIcon: { name: 'CursorIcon', category: IconCategory.AI_TOOLS, component: _CursorIcon },
  MCPIcon: { name: 'MCPIcon', category: IconCategory.AI_TOOLS, component: _MCPIcon },
  V0Icon: { name: 'V0Icon', category: IconCategory.AI_TOOLS, component: _V0Icon },
  WindsurfIcon: { name: 'WindsurfIcon', category: IconCategory.AI_TOOLS, component: _WindsurfIcon },
};

export default iconRegistry;
