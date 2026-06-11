// Content index generation.
//
// Builds a single structured index of all published content at build time:
//   - projects  : the project metadata collection (the Project Index)
//   - knowledge : the knowledge article metadata collection (Droplet 0.1.4.4)
//   - urls      : slug -> URL registry (projects + knowledge)
//   - tags      : tag -> [slug] registry across both collections (consumed by the
//                 Discovery System in Bucket 0.1.5; search/categories out of scope here)
//
// This is the structured content data future discovery systems build on. It is served as
// /content-index.json by src/pages/content-index.json.ts and drives the listing pages.

import { getCollection } from 'astro:content';
import { extractMetadata, type ProjectMetadata } from './metadata';
import { extractKnowledgeMetadata, type KnowledgeMetadata } from './knowledge';

export interface ContentIndex {
  count: number;
  knowledgeCount: number;
  projects: ProjectMetadata[];
  knowledge: KnowledgeMetadata[];
  urls: Record<string, string>;
  tags: Record<string, string[]>;
}

/** Build the content index from the projects and knowledge collections. */
export async function buildContentIndex(): Promise<ContentIndex> {
  const projectEntries = await getCollection('projects');
  const knowledgeEntries = await getCollection('knowledge');

  const projects = projectEntries
    .map(extractMetadata)
    .sort((a, b) => a.title.localeCompare(b.title));
  const knowledge = knowledgeEntries
    .map(extractKnowledgeMetadata)
    .sort((a, b) => a.title.localeCompare(b.title));

  const urls: Record<string, string> = {};
  const tags: Record<string, string[]> = {};
  for (const item of [...projects, ...knowledge]) {
    urls[item.slug] = item.url;
    for (const tag of item.tags) {
      (tags[tag] ??= []).push(item.slug);
    }
  }

  return {
    count: projects.length,
    knowledgeCount: knowledge.length,
    projects,
    knowledge,
    urls,
    tags,
  };
}
