import type { IconProps } from '@/components/icons/types';
import { AiOutlineCode } from 'react-icons/ai';
import {
  FaAws,
  FaBootstrap,
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
} from 'react-icons/fa';
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

export const BunIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <SiBun size={size} className={className} />
);

export const ElysiaIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaNodeJs size={size} className={className} />
);

export const GithubActionsIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <SiGithubactions size={size} className={className} />
);

export const JestIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <SiJest size={size} className={className} />
);

export const BootstrapIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <FaBootstrap size={size} className={className} />
);

export const ShadcnIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <SiRadixui size={size} className={className} />
);

export const SupabaseIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <SiSupabase size={size} className={className} />
);
