// Project metadata extraction.
//
// Normalizes a project's PHDS frontmatter (validated by the content collection schema in
// content.config.ts) into a flat, stable record used by listings, the content index, and
// future discovery systems. Required fields (title, status) are guaranteed by the schema;
// optional fields default to empty so consumers never deal with `undefined` collections.

import type { CollectionEntry } from 'astro:content';
import { projectSlug, projectUrl } from './url-generator';

export interface ProjectMetadata {
  slug: string;
  url: string;
  title: string;
  status: string;
  dateStarted?: string;
  dateSealed?: string;
  tags: string[];
  sources: string[];
  aiSystems: string[];
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
    dateStarted: data.date_started,
    dateSealed: data.date_sealed,
    tags: data.tags ?? [],
    sources: data.sources ?? [],
    aiSystems: data.ai_systems ?? [],
  };
}
