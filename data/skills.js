import {
  AgileIcon,
  AwsIcon,
  ConfluenceIcon,
  CssIcon,
  DockerIcon,
  ExpressIcon,
  FlaskIcon,
  GitIcon,
  GithubProjectsIcon,
  HtmlIcon,
  JavaIcon,
  JavascriptIcon,
  JenkinsIcon,
  JiraIcon,
  JunitIcon,
  KanbanIcon,
  MongodbIcon,
  MysqlIcon,
  NextjsIcon,
  NginxIcon,
  NodejsIcon,
  PostgresqlIcon,
  PostmanIcon,
  PytestIcon,
  PythonIcon,
  ReactIcon,
  RedisIcon,
  ShellIcon,
  SpringBootIcon,
  SqlIcon,
  SqliteIcon,
  TypescriptIcon,
  VitestIcon,
} from "@/components/icons";

// Note: Additional icons would need to be imported or created for new skills

// Organized skills data by categories
export const skillsData = {
  categories: [
    {
      name: "Programming Languages",
      skills: [
        { name: "Java", icon: JavaIcon, color: "text-red-600" },
        { name: "JavaScript", icon: JavascriptIcon, color: "text-yellow-500" },
        { name: "TypeScript", icon: TypescriptIcon, color: "text-blue-600" },
        { name: "Python", icon: PythonIcon, color: "text-blue-500" },
        { name: "SQL", icon: SqlIcon, color: "text-gray-600" },
        { name: "Shell", icon: ShellIcon, color: "text-green-400" },
      ],
    },
    {
      name: "Frontend Technologies",
      skills: [
        { name: "HTML", icon: HtmlIcon, color: "text-orange-500" },
        { name: "CSS", icon: CssIcon, color: "text-blue-500" },
        { name: "React.js", icon: ReactIcon, color: "text-cyan-400" },
        {
          name: "Next.js",
          icon: NextjsIcon,
          color: "text-black dark:text-white",
        },
      ],
    },
    {
      name: "Backend Technologies",
      skills: [
        { name: "Spring Boot", icon: SpringBootIcon, color: "text-green-600" },
        { name: "Node.js", icon: NodejsIcon, color: "text-green-500" },
        { name: "Express", icon: ExpressIcon, color: "text-gray-400" },
        { name: "Flask", icon: FlaskIcon, color: "text-gray-700" },
      ],
    },
    {
      name: "Database Technologies",
      skills: [
        { name: "MySQL", icon: MysqlIcon, color: "text-blue-500" },
        { name: "PostgreSQL", icon: PostgresqlIcon, color: "text-blue-700" },
        { name: "MongoDB", icon: MongodbIcon, color: "text-green-600" },
        { name: "Redis", icon: RedisIcon, color: "text-red-500" },
        { name: "SQLite", icon: SqliteIcon, color: "text-blue-400" },
      ],
    },
    {
      name: "Testing & Quality Assurance",
      skills: [
        { name: "JUnit", icon: JunitIcon, color: "text-green-700" },
        { name: "Vitest", icon: VitestIcon, color: "text-emerald-500" },
        { name: "Pytest", icon: PytestIcon, color: "text-blue-400" },
        { name: "Postman", icon: PostmanIcon, color: "text-orange-500" },
      ],
    },
    {
      name: "DevOps & Infrastructure",
      skills: [
        { name: "Docker", icon: DockerIcon, color: "text-blue-500" },
        { name: "Nginx", icon: NginxIcon, color: "text-green-500" },
        { name: "AWS", icon: AwsIcon, color: "text-yellow-500" },
        { name: "Jenkins", icon: JenkinsIcon, color: "text-red-500" },
        { name: "Git", icon: GitIcon, color: "text-orange-600" },
      ],
    },
    {
      name: "Project Management",
      skills: [
        { name: "Agile Development", icon: AgileIcon, color: "text-blue-500" },
        { name: "Kanban", icon: KanbanIcon, color: "text-teal-500" },
        { name: "Jira", icon: JiraIcon, color: "text-blue-600" },
        { name: "Confluence", icon: ConfluenceIcon, color: "text-blue-400" },
        {
          name: "GitHub Projects",
          icon: GithubProjectsIcon,
          color: "text-purple-600",
        },
      ],
    },
  ],
};

// Legacy format to maintain backward compatibility with existing components
export const flattenedSkillsData = skillsData.categories.reduce(
  (acc, category) => [...acc, ...category.skills],
  []
);
