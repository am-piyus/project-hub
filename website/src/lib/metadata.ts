// Project metadata extraction.
//
// Normalizes a project's PHDS frontmatter (validated by the content collection schema in
// content.config.ts) into a flat, stable record used by listings, the content index, and
// future discovery systems. Required fields (title, status) are guaranteed by the schema;
// optional fields default to empty so consumers never deal with `undefined` collections.
//
// The summary is not frontmatter: PHDS documents open with a `>` blockquote summary
// directly under the H1, so it is extracted from the markdown body.

import type { CollectionEntry } from 'astro:content';
import { projectSlug, projectUrl } from './url-generator';

export interface ProjectMetadata {
  slug: string;
  url: string;
  title: string;
  status: string;
  summary?: string;
  dateStarted?: string;
  dateSealed?: string;
  tags: string[];
  sources: string[];
  aiSystems: string[];
}

/** Extract the document summary — the first blockquote in the markdown body
 *  (the PHDS convention, shared by project and knowledge documents). */
export function extractSummary(body: string | undefined): string | undefined {
  if (!body) return undefined;
  const match = body.match(/(?:^|\n)((?:[ \t]*>[^\n]*\n?)+)/);
  if (!match) return undefined;
  const text = match[1]
    .split('\n')
    .map((line) => line.replace(/^[ \t]*>[ \t]?/, '').trim())
    .join(' ')
    // strip wikilinks and markdown links down to their labels
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > 0 ? text : undefined;
}

/** Extract normalized metadata from a project collection entry. */
export function extractMetadata(entry: CollectionEntry<'projects'>): ProjectMetadata {
  const slug = projectSlug(entry.id);
  const { data } = entry;
  return {
    slug,
    url: projectUrl(slug),
    title: data.title,
    status: data.status,
    summary: extractSummary(entry.body),
    dateStarted: data.date_started,
    dateSealed: data.date_sealed,
    tags: data.tags ?? [],
    sources: data.sources ?? [],
    aiSystems: data.ai_systems ?? [],
  };
}

/** Recency key: sealed date, else started date, else empty (sorts last). */
export function recencyKey(project: ProjectMetadata): string {
  if (project.dateSealed && project.dateSealed !== 'unknown') return project.dateSealed;
  if (project.dateStarted && project.dateStarted !== 'unknown') return project.dateStarted;
  return '';
}

/** Projects sorted newest-first by recency (undated work sorts last). */
export function sortByRecency(projects: ProjectMetadata[]): ProjectMetadata[] {
  return [...projects].sort((a, b) => recencyKey(b).localeCompare(recencyKey(a)));
}
