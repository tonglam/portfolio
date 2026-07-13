import archiveData from './archive.json';
import { archivePostSchema } from './types';

export const archivePosts = archivePostSchema.array().parse(archiveData);

export const archiveGroups = Object.entries(
  archivePosts.reduce<Record<string, typeof archivePosts>>((groups, post) => {
    const parsed = new Date(post.date);
    const year = Number.isNaN(parsed.getTime()) ? 'Earlier' : String(parsed.getUTCFullYear());
    (groups[year] ??= []).push(post);
    return groups;
  }, {})
)
  .map(
    ([year, posts]) =>
      [
        year,
        [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      ] as const
  )
  .sort(([a], [b]) => b.localeCompare(a));
