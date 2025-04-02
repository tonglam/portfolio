import { CheckIcon } from '@/components/icons';

interface ResponsibilitiesListProps {
  responsibilities: string[];
}

export function ResponsibilitiesList({ responsibilities }: ResponsibilitiesListProps) {
  return (
    <ul className="space-y-2">
      {responsibilities.map((responsibility, idx) => (
        <li key={idx} className="flex items-start">
          {CheckIcon && <CheckIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />}
          <span className="text-gray-600 dark:text-gray-400 text-sm">{responsibility}</span>
        </li>
      ))}
    </ul>
  );
}
