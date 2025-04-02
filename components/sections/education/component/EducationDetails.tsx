interface EducationDetailsProps {
  details: string[];
}

export function EducationDetails({ details }: EducationDetailsProps) {
  return (
    <div className="mt-3">
      <div className="space-y-2">
        {details.map((detail, index) => (
          <div key={index} className="flex items-center">
            <span className="w-2 h-2 bg-[#3B82F6] dark:bg-[#F472B6] rounded-full mr-2"></span>
            <span className="text-sm text-gray-600 dark:text-gray-400">{detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
