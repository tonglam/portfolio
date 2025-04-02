interface AchievementsListProps {
  achievements: string[];
}

export function AchievementsList({ achievements }: AchievementsListProps) {
  return (
    <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Key Achievements:
      </h4>
      {achievements.map((achievement, idx) => (
        <div
          key={idx}
          className="bg-[#2563EB]/5 dark:bg-[#111827] rounded-lg p-3 border-l-4 border-[#2563EB] dark:border-[#60A5FA] mb-2 last:mb-0"
        >
          <p className="text-sm text-gray-700 dark:text-gray-200">{achievement}</p>
        </div>
      ))}
    </div>
  );
}
