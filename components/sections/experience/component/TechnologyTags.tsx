interface TechnologyTagsProps {
  technologies: string[];
}

export function TechnologyTags({ technologies }: TechnologyTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech, idx) => (
        <span
          key={idx}
          className="text-xs px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}
