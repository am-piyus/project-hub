// Slug and URL generation for project pages.
//
// The project slug is the content folder name — which Astro's glob loader already uses as
// the collection entry id (see content.config.ts `generateId`). Deriving URLs from the
// folder name keeps them stable, predictable, and aligned with the Obsidian Storage
// Structure. Centralizing it here gives the whole site one source of truth for project URLs.

/** The deployment base path (e.g. '/project-hub' on GitHub Pages), without a
 *  trailing slash. '' when the site is served from the root. */
const RAW_BASE = import.meta.env.BASE_URL ?? '/';
export const BASE = RAW_BASE.endsWith('/') ? RAW_BASE.slice(0, -1) : RAW_BASE;

/** Prefix a site-absolute path with the deployment base path (0.1.6.1). */
export function withBase(path: string): string {
  return `${BASE}${path}`;
}

export const PROJECTS_BASE = '/projects';

/** The URL slug for a project, from its collection entry id (the content folder name). */
export function projectSlug(entryId: string): string {
  return entryId;
}

/** The site-absolute URL for a project page (base-aware). */
export function projectUrl(slug: string): string {
  return withBase(`${PROJECTS_BASE}/${slug}`);
}
