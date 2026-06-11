// Slug and URL generation for project pages.
//
// The project slug is the content folder name — which Astro's glob loader already uses as
// the collection entry id (see content.config.ts `generateId`). Deriving URLs from the
// folder name keeps them stable, predictable, and aligned with the Obsidian Storage
// Structure. Centralizing it here gives the whole site one source of truth for project URLs.

export const PROJECTS_BASE = '/projects';

/** The URL slug for a project, from its collection entry id (the content folder name). */
export function projectSlug(entryId: string): string {
  return entryId;
}

/** The site-absolute URL for a project page. */
export function projectUrl(slug: string): string {
  return `${PROJECTS_BASE}/${slug}`;
}
