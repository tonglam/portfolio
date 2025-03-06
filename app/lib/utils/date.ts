/**
 * Gets relative time string (e.g., "2 days ago")
 */
export function getRelativeTimeString(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
    }
  }

  return 'Just now';
}

/**
 * Formats a date range
 */
export function formatDateRange(startDate: string | Date, endDate?: string | Date | null): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;

  const formatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
  };

  if (end) {
    if (start.getFullYear() === end.getFullYear()) {
      // Same year: "Jan - Mar 2023"
      return `${start.toLocaleDateString('en-US', { month: 'short' })} - ${end.toLocaleDateString(
        'en-US',
        formatOptions
      )}`;
    } else {
      // Different years: "Jan 2022 - Mar 2023"
      return `${start.toLocaleDateString('en-US', formatOptions)} - ${end.toLocaleDateString(
        'en-US',
        formatOptions
      )}`;
    }
  }

  // No end date: "Jan 2023 - Present"
  return `${start.toLocaleDateString('en-US', formatOptions)} - Present`;
}

/**
 * Gets the start and end of a date range
 */
export function getDateRange(
  period: 'day' | 'week' | 'month' | 'year',
  date = new Date()
): { start: Date; end: Date } {
  const start = new Date(date);
  const end = new Date(date);

  switch (period) {
    case 'day':
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      break;
    case 'week':
      start.setDate(start.getDate() - start.getDay());
      start.setHours(0, 0, 0, 0);
      end.setDate(end.getDate() + (6 - end.getDay()));
      end.setHours(23, 59, 59, 999);
      break;
    case 'month':
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      end.setMonth(end.getMonth() + 1, 0);
      end.setHours(23, 59, 59, 999);
      break;
    case 'year':
      start.setMonth(0, 1);
      start.setHours(0, 0, 0, 0);
      end.setMonth(11, 31);
      end.setHours(23, 59, 59, 999);
      break;
  }

  return { start, end };
}

/**
 * Checks if a date is between two other dates
 */
export function isDateBetween(date: Date, start: Date, end: Date): boolean {
  return date >= start && date <= end;
}

/**
 * Gets the number of days between two dates
 */
export function getDaysBetween(start: Date | string, end: Date | string): number {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
