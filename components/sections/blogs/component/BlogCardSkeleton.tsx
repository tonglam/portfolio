export function BlogCardSkeleton() {
  return (
    <div className="h-full rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 animate-pulse" />

      {/* Content */}
      <div className="p-6">
        {/* Category Skeleton */}
        <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse mb-4" />

        {/* Title Skeleton */}
        <div className="w-3/4 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-4" />

        {/* Summary Skeleton */}
        <div className="space-y-2">
          <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="w-5/6 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="w-4/6 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        {/* Meta Skeleton */}
        <div className="flex justify-between items-center mt-6">
          <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
