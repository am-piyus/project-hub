// Discovery registries (Bucket 0.1.5) — tags as navigable discovery paths.
//
// Tags are extracted from project and knowledge metadata, merged case-insensitively
// by slug, and exposed as a registry that drives the generated /tags pages. The
// registry shape is content-type agnostic: future content types (blog posts,
// tutorials) add an array without redesigning the architecture.

import type { ProjectMetadata } from './metadata';
import type { KnowledgeMetadata } from './knowledge';
import { withBase } from './url-generator';

/** URL-safe slug for a tag or category name. */
export function discoverySlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function tagUrl(tag: string): string {
  return withBase(`/tags/${discoverySlug(tag)}`);
}

export interface TagRecord {
  /** Display name — the first-seen spelling of the tag. */
  tag: string;
  slug: string;
  url: string;
  count: number;
  projects: ProjectMetadata[];
  knowledge: KnowledgeMetadata[];
}

/** Aggregate tags across all content into a registry (merged by slug). */
export function buildTagRegistry(
  projects: ProjectMetadata[],
  knowledge: KnowledgeMetadata[],
): TagRecord[] {
  const records = new Map<string, TagRecord>();

  const add = (tag: string, item: ProjectMetadata | KnowledgeMetadata, type: 'p' | 'k') => {
    const slug = discoverySlug(tag);
    if (!slug) return;
    let record = records.get(slug);
    if (!record) {
      record = { tag, slug, url: withBase(`/tags/${slug}`), count: 0, projects: [], knowledge: [] };
      records.set(slug, record);
    }
    record.count += 1;
    if (type === 'p') record.projects.push(item as ProjectMetadata);
    else record.knowledge.push(item as KnowledgeMetadata);
  };

  for (const project of projects) for (const tag of project.tags) add(tag, project, 'p');
  for (const article of knowledge) for (const tag of article.tags) add(tag, article, 'k');

  return [...records.values()].sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

// --- Categories (Droplet 0.1.5.3) ---------------------------------------------
// Tags answer "what is related"; categories answer "what domain does this belong
// to". Single category per document; uncategorized content simply doesn't appear
// on category pages.

export function categoryUrl(category: string): string {
  return withBase(`/categories/${discoverySlug(category)}`);
}

export interface CategoryRecord {
  /** Display name — the first-seen spelling of the category. */
  category: string;
  slug: string;
  url: string;
  count: number;
  projects: ProjectMetadata[];
  knowledge: KnowledgeMetadata[];
}

/** Aggregate categories across all content into a registry (merged by slug). */
export function buildCategoryRegistry(
  projects: ProjectMetadata[],
  knowledge: KnowledgeMetadata[],
): CategoryRecord[] {
  const records = new Map<string, CategoryRecord>();

  const add = (name: string | undefined, item: ProjectMetadata | KnowledgeMetadata, type: 'p' | 'k') => {
    if (!name) return;
    const slug = discoverySlug(name);
    if (!slug) return;
    let record = records.get(slug);
    if (!record) {
      record = {
        category: name,
        slug,
        url: withBase(`/categories/${slug}`),
        count: 0,
        projects: [],
        knowledge: [],
      };
      records.set(slug, record);
    }
    record.count += 1;
    if (type === 'p') record.projects.push(item as ProjectMetadata);
    else record.knowledge.push(item as KnowledgeMetadata);
  };

  for (const project of projects) add(project.category, project, 'p');
  for (const article of knowledge) add(article.category, article, 'k');

  return [...records.values()].sort(
    (a, b) => b.count - a.count || a.category.localeCompare(b.category),
  );
}
