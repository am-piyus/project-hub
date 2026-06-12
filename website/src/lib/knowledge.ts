// Knowledge metadata extraction (Droplet 0.1.4.4).
//
// Normalizes a knowledge article's frontmatter into a flat record used by the
// knowledge library, the content index, and future discovery systems. The summary
// follows the same convention as projects: the document's opening blockquote.

import type { CollectionEntry } from 'astro:content';
import { extractSummary } from './metadata';
import { withBase } from './url-generator';

export const KNOWLEDGE_BASE = '/knowledge';

export interface KnowledgeMetadata {
  slug: string;
  url: string;
  title: string;
  category: string;
  summary?: string;
  dateCreated?: string;
  dateUpdated?: string;
  tags: string[];
  relatedProjects: string[];
  relatedKnowledge: string[];
}

/** The site-absolute URL for a knowledge article page (base-aware). */
export function knowledgeUrl(slug: string): string {
  return withBase(`${KNOWLEDGE_BASE}/${slug}`);
}

/** Extract normalized metadata from a knowledge collection entry. */
export function extractKnowledgeMetadata(entry: CollectionEntry<'knowledge'>): KnowledgeMetadata {
  const { data } = entry;
  return {
    slug: entry.id,
    url: knowledgeUrl(entry.id),
    title: data.title,
    category: data.category ?? 'General',
    summary: extractSummary(entry.body),
    dateCreated: data.date_created,
    dateUpdated: data.date_updated,
    tags: data.tags ?? [],
    relatedProjects: data.related_projects ?? [],
    relatedKnowledge: data.related_knowledge ?? [],
  };
}

/** Recency key: updated date, else created date, else empty (sorts last). */
export function knowledgeRecencyKey(article: KnowledgeMetadata): string {
  if (article.dateUpdated && article.dateUpdated !== 'unknown') return article.dateUpdated;
  if (article.dateCreated && article.dateCreated !== 'unknown') return article.dateCreated;
  return '';
}

/** Articles sorted newest-first by recency (undated articles sort last). */
export function sortKnowledgeByRecency(articles: KnowledgeMetadata[]): KnowledgeMetadata[] {
  return [...articles].sort((a, b) => knowledgeRecencyKey(b).localeCompare(knowledgeRecencyKey(a)));
}
