import { createIconComponent } from '@/lib/utils/icon.util';
import type { IconRegistry } from '@/types/components/icon.type';
import { IconCategory } from '@/types/components/icon.type';
import { AiOutlineCode } from 'react-icons/ai';
import { BiLogoGithub, BiLogoLinkedin, BiLogoTwitter } from 'react-icons/bi';
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
  FaGitAlt,
  FaGithubAlt,
  FaHtml5,
  FaJava,
  FaJs,
  FaNodeJs,
  FaNpm,
  FaPython,
  FaReact,
  FaServer,
  FaTerminal,
  FaTimes,
} from 'react-icons/fa';
import { GrStatusInfo } from 'react-icons/gr';
import { HiLocationMarker, HiMail } from 'react-icons/hi';
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
import { BoltNewIcon, CursorIcon, MCPIcon, V0Icon, WindsurfIcon } from './ai-tool-icons';
import { ExternalLinkIcon } from './external-link';

// Social Icons
const GithubIcon = createIconComponent(BiLogoGithub);
const LinkedinIcon = createIconComponent(BiLogoLinkedin);
const XIcon = createIconComponent(BiLogoTwitter);

// Contact Icons
const EmailIcon = createIconComponent(HiMail);
const LocationIcon = createIconComponent(HiLocationMarker);

// UI Icons
const CheckIcon = createIconComponent(FaCheck);
const CommentIcon = createIconComponent(FaComment);
const ArrowUpIcon = createIconComponent(FaArrowUp);
const MenuIcon = createIconComponent(FaBars);
const CloseIcon = createIconComponent(FaTimes);

// Tech Icons
const HtmlIcon = createIconComponent(FaHtml5);
const CssIcon = createIconComponent(FaCss3Alt);
const JavascriptIcon = createIconComponent(FaJs);
const TypescriptIcon = createIconComponent(SiTypescript);
const ReactIcon = createIconComponent(FaReact);
const NodejsIcon = createIconComponent(FaNodeJs);
const NginxIcon = createIconComponent(SiNginx);
const StrapiIcon = createIconComponent(SiStrapi);
const MongodbIcon = createIconComponent(SiMongodb);
const MysqlIcon = createIconComponent(SiMysql);
const ReduxIcon = createIconComponent(SiRedux);
const ExpressIcon = createIconComponent(SiExpress);
const NestjsIcon = createIconComponent(SiNestjs);
const DockerIcon = createIconComponent(FaDocker);
const AwsIcon = createIconComponent(FaAws);
const DatabaseIcon = createIconComponent(FaDatabase);
const ServerIcon = createIconComponent(FaServer);
const NpmIcon = createIconComponent(FaNpm);
const JavaIcon = createIconComponent(FaJava);
const PythonIcon = createIconComponent(FaPython);
const NextjsIcon = createIconComponent(SiNextdotjs);
const SpringBootIcon = createIconComponent(SiSpringboot);
const FlaskIcon = createIconComponent(SiFlask);
const PostgresqlIcon = createIconComponent(SiPostgresql);
const RedisIcon = createIconComponent(SiRedis);
const SqliteIcon = createIconComponent(SiSqlite);
const JunitIcon = createIconComponent(SiJunit5);
const VitestIcon = createIconComponent(SiVitest);
const PytestIcon = createIconComponent(AiOutlineCode);
const PostmanIcon = createIconComponent(SiPostman);
const GitIcon = createIconComponent(FaGitAlt);
const JenkinsIcon = createIconComponent(SiJenkins);
const JiraIcon = createIconComponent(SiJira);
const AgileIcon = createIconComponent(GrStatusInfo);
const KanbanIcon = createIconComponent(BsKanban);
const ShellIcon = createIconComponent(FaTerminal);
const ConfluenceIcon = createIconComponent(SiConfluence);
const GithubProjectsIcon = createIconComponent(FaGithubAlt);
const BunIcon = createIconComponent(SiBun);
const ElysiaIcon = createIconComponent(FaNodeJs);
const GithubActionsIcon = createIconComponent(SiGithubactions);
const JestIcon = createIconComponent(SiJest);
const BootstrapIcon = createIconComponent(FaBootstrap);
const ShadcnIcon = createIconComponent(SiRadixui);
const SupabaseIcon = createIconComponent(SiSupabase);

// Icon Registry
export const iconRegistry: IconRegistry = {
  // Social Icons
  GithubIcon: {
    name: 'GithubIcon',
    category: IconCategory.SOCIAL,
    component: GithubIcon,
  },
  LinkedinIcon: {
    name: 'LinkedinIcon',
    category: IconCategory.SOCIAL,
    component: LinkedinIcon,
  },
  XIcon: {
    name: 'XIcon',
    category: IconCategory.SOCIAL,
    component: XIcon,
  },

  // Contact Icons
  EmailIcon: {
    name: 'EmailIcon',
    category: IconCategory.CONTACT,
    component: EmailIcon,
  },
  LocationIcon: {
    name: 'LocationIcon',
    category: IconCategory.CONTACT,
    component: LocationIcon,
  },

  // UI Icons
  ExternalLinkIcon: {
    name: 'ExternalLinkIcon',
    category: IconCategory.UI,
    component: ExternalLinkIcon,
  },
  CheckIcon: {
    name: 'CheckIcon',
    category: IconCategory.UI,
    component: CheckIcon,
  },
  CommentIcon: {
    name: 'CommentIcon',
    category: IconCategory.UI,
    component: CommentIcon,
  },
  ArrowUpIcon: {
    name: 'ArrowUpIcon',
    category: IconCategory.UI,
    component: ArrowUpIcon,
  },
  MenuIcon: {
    name: 'MenuIcon',
    category: IconCategory.UI,
    component: MenuIcon,
  },
  CloseIcon: {
    name: 'CloseIcon',
    category: IconCategory.UI,
    component: CloseIcon,
  },

  // Tech Icons
  HtmlIcon: {
    name: 'HtmlIcon',
    category: IconCategory.TECH,
    component: HtmlIcon,
  },
  CssIcon: {
    name: 'CssIcon',
    category: IconCategory.TECH,
    component: CssIcon,
  },
  JavascriptIcon: {
    name: 'JavascriptIcon',
    category: IconCategory.TECH,
    component: JavascriptIcon,
  },
  TypescriptIcon: {
    name: 'TypescriptIcon',
    category: IconCategory.TECH,
    component: TypescriptIcon,
  },
  ReactIcon: {
    name: 'ReactIcon',
    category: IconCategory.TECH,
    component: ReactIcon,
  },
  NodejsIcon: {
    name: 'NodejsIcon',
    category: IconCategory.TECH,
    component: NodejsIcon,
  },
  NginxIcon: {
    name: 'NginxIcon',
    category: IconCategory.TECH,
    component: NginxIcon,
  },
  StrapiIcon: {
    name: 'StrapiIcon',
    category: IconCategory.TECH,
    component: StrapiIcon,
  },
  MongodbIcon: {
    name: 'MongodbIcon',
    category: IconCategory.TECH,
    component: MongodbIcon,
  },
  MysqlIcon: {
    name: 'MysqlIcon',
    category: IconCategory.TECH,
    component: MysqlIcon,
  },
  ReduxIcon: {
    name: 'ReduxIcon',
    category: IconCategory.TECH,
    component: ReduxIcon,
  },
  ExpressIcon: {
    name: 'ExpressIcon',
    category: IconCategory.TECH,
    component: ExpressIcon,
  },
  NestjsIcon: {
    name: 'NestjsIcon',
    category: IconCategory.TECH,
    component: NestjsIcon,
  },
  DockerIcon: {
    name: 'DockerIcon',
    category: IconCategory.TECH,
    component: DockerIcon,
  },
  AwsIcon: {
    name: 'AwsIcon',
    category: IconCategory.TECH,
    component: AwsIcon,
  },
  DatabaseIcon: {
    name: 'DatabaseIcon',
    category: IconCategory.TECH,
    component: DatabaseIcon,
  },
  ServerIcon: {
    name: 'ServerIcon',
    category: IconCategory.TECH,
    component: ServerIcon,
  },
  NpmIcon: {
    name: 'NpmIcon',
    category: IconCategory.TECH,
    component: NpmIcon,
  },
  JavaIcon: {
    name: 'JavaIcon',
    category: IconCategory.TECH,
    component: JavaIcon,
  },
  PythonIcon: {
    name: 'PythonIcon',
    category: IconCategory.TECH,
    component: PythonIcon,
  },
  NextjsIcon: {
    name: 'NextjsIcon',
    category: IconCategory.TECH,
    component: NextjsIcon,
  },
  SpringBootIcon: {
    name: 'SpringBootIcon',
    category: IconCategory.TECH,
    component: SpringBootIcon,
  },
  FlaskIcon: {
    name: 'FlaskIcon',
    category: IconCategory.TECH,
    component: FlaskIcon,
  },
  PostgresqlIcon: {
    name: 'PostgresqlIcon',
    category: IconCategory.TECH,
    component: PostgresqlIcon,
  },
  RedisIcon: {
    name: 'RedisIcon',
    category: IconCategory.TECH,
    component: RedisIcon,
  },
  SqliteIcon: {
    name: 'SqliteIcon',
    category: IconCategory.TECH,
    component: SqliteIcon,
  },
  JunitIcon: {
    name: 'JunitIcon',
    category: IconCategory.TECH,
    component: JunitIcon,
  },
  VitestIcon: {
    name: 'VitestIcon',
    category: IconCategory.TECH,
    component: VitestIcon,
  },
  PytestIcon: {
    name: 'PytestIcon',
    category: IconCategory.TECH,
    component: PytestIcon,
  },
  PostmanIcon: {
    name: 'PostmanIcon',
    category: IconCategory.TECH,
    component: PostmanIcon,
  },
  GitIcon: {
    name: 'GitIcon',
    category: IconCategory.TECH,
    component: GitIcon,
  },
  JenkinsIcon: {
    name: 'JenkinsIcon',
    category: IconCategory.TECH,
    component: JenkinsIcon,
  },
  JiraIcon: {
    name: 'JiraIcon',
    category: IconCategory.TECH,
    component: JiraIcon,
  },
  AgileIcon: {
    name: 'AgileIcon',
    category: IconCategory.TECH,
    component: AgileIcon,
  },
  KanbanIcon: {
    name: 'KanbanIcon',
    category: IconCategory.TECH,
    component: KanbanIcon,
  },
  ShellIcon: {
    name: 'ShellIcon',
    category: IconCategory.TECH,
    component: ShellIcon,
  },
  ConfluenceIcon: {
    name: 'ConfluenceIcon',
    category: IconCategory.TECH,
    component: ConfluenceIcon,
  },
  GithubProjectsIcon: {
    name: 'GithubProjectsIcon',
    category: IconCategory.TECH,
    component: GithubProjectsIcon,
  },
  BunIcon: {
    name: 'BunIcon',
    category: IconCategory.TECH,
    component: BunIcon,
  },
  ElysiaIcon: {
    name: 'ElysiaIcon',
    category: IconCategory.TECH,
    component: ElysiaIcon,
  },
  GithubActionsIcon: {
    name: 'GithubActionsIcon',
    category: IconCategory.TECH,
    component: GithubActionsIcon,
  },
  JestIcon: {
    name: 'JestIcon',
    category: IconCategory.TECH,
    component: JestIcon,
  },
  BootstrapIcon: {
    name: 'BootstrapIcon',
    category: IconCategory.TECH,
    component: BootstrapIcon,
  },
  ShadcnIcon: {
    name: 'ShadcnIcon',
    category: IconCategory.TECH,
    component: ShadcnIcon,
  },
  SupabaseIcon: {
    name: 'SupabaseIcon',
    category: IconCategory.TECH,
    component: SupabaseIcon,
  },

  // AI Tool Icons
  V0Icon: {
    name: 'V0Icon',
    category: IconCategory.AI_TOOLS,
    component: V0Icon,
  },
  BoltNewIcon: {
    name: 'BoltNewIcon',
    category: IconCategory.AI_TOOLS,
    component: BoltNewIcon,
  },
  CursorIcon: {
    name: 'CursorIcon',
    category: IconCategory.AI_TOOLS,
    component: CursorIcon,
  },
  WindsurfIcon: {
    name: 'WindsurfIcon',
    category: IconCategory.AI_TOOLS,
    component: WindsurfIcon,
  },
  MCPIcon: {
    name: 'MCPIcon',
    category: IconCategory.AI_TOOLS,
    component: MCPIcon,
  },
};

// Export individual icons for direct use if needed
export {
  AgileIcon,
  ArrowUpIcon,
  AwsIcon,
  BoltNewIcon,
  BootstrapIcon,
  BunIcon,
  CheckIcon,
  CloseIcon,
  CommentIcon,
  ConfluenceIcon,
  CssIcon,
  CursorIcon,
  DatabaseIcon,
  DockerIcon,
  ElysiaIcon,
  // Contact Icons
  EmailIcon,
  ExpressIcon,
  // UI Icons
  ExternalLinkIcon,
  FlaskIcon,
  GithubActionsIcon,
  // Social Icons
  GithubIcon,
  GithubProjectsIcon,
  GitIcon,
  // Tech Icons
  HtmlIcon,
  JavaIcon,
  JavascriptIcon,
  JenkinsIcon,
  JestIcon,
  JiraIcon,
  JunitIcon,
  KanbanIcon,
  LinkedinIcon,
  LocationIcon,
  MCPIcon,
  MenuIcon,
  MongodbIcon,
  MysqlIcon,
  NestjsIcon,
  NextjsIcon,
  NginxIcon,
  NodejsIcon,
  NpmIcon,
  PostgresqlIcon,
  PostmanIcon,
  PytestIcon,
  PythonIcon,
  ReactIcon,
  RedisIcon,
  ReduxIcon,
  ServerIcon,
  ShadcnIcon,
  ShellIcon,
  SpringBootIcon,
  SqliteIcon,
  StrapiIcon,
  SupabaseIcon,
  TypescriptIcon,
  V0Icon,
  VitestIcon,
  WindsurfIcon,
  XIcon,
};

// Export the registry as default
export default iconRegistry;
