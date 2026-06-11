// Content index generation.
//
// Builds a single structured index of all published projects at build time:
//   - projects : the project metadata collection (the Project Index)
//   - urls     : slug -> URL registry
//   - tags     : tag -> [slug] registry (exposed now, consumed by the Discovery System
//                in Bucket 0.1.5; search/categories are out of scope here)
//
// This is the structured content data future discovery systems build on. It is served as
// /content-index.json by src/pages/content-index.json.ts and drives the listing page.

import { getCollection } from 'astro:content';
import { extractMetadata, type ProjectMetadata } from './metadata';

export interface ContentIndex {
  count: number;
  projects: ProjectMetadata[];
  urls: Record<string, string>;
  tags: Record<string, string[]>;
}

/** Build the content index from the projects collection. */
export async function buildContentIndex(): Promise<ContentIndex> {
  const entries = await getCollection('projects');
  const projects = entries
    .map(extractMetadata)
    .sort((a, b) => a.title.localeCompare(b.title));

  const urls: Record<string, string> = {};
  const tags: Record<string, string[]> = {};
  for (const project of projects) {
    urls[project.slug] = project.url;
    for (const tag of project.tags) {
      (tags[tag] ??= []).push(project.slug);
    }
  }

  return { count: projects.length, projects, urls, tags };
}
