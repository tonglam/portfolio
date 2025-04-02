interface CareerStatsProps {
  yearsOfExperience: number;
  numberOfCompanies: number;
}

export function CareerStats({ yearsOfExperience, numberOfCompanies }: CareerStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-12">
      <div className="bg-gray-50 dark:bg-[#0F172A] rounded-lg p-4 text-center">
        <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899]">
          {yearsOfExperience}+
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">Years Experience</div>
      </div>
      <div className="bg-gray-50 dark:bg-[#0F172A] rounded-lg p-4 text-center">
        <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899]">
          {numberOfCompanies}
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">Companies</div>
      </div>
    </div>
  );
}
