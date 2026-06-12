// Related Content Engine (Droplet 0.1.5.5) — metadata-driven relationships.
//
// Relationship signals (V0.1): shared tags (primary, +2 per match, compared by
// slug so casing never splits a topic) and shared category (secondary, +1).
// No self-references, no duplicates, capped for readability, ties broken by
// recency. The goal is continuation: no page should be a dead end.
//
// This is the seed of the future knowledge graph; richer signals (wikilinks,
// semantic similarity, behavior) are recorded in the Vision Log, not built here.

import type { ProjectMetadata } from './metadata';
import type { KnowledgeMetadata } from './knowledge';
import { recencyKey } from './metadata';
import { knowledgeRecencyKey } from './knowledge';
import { discoverySlug } from './discovery';

const MAX_RELATED = 3;

interface Scorable {
  slug: string;
  tags: string[];
  category?: string;
}

function score(source: Scorable, candidate: Scorable): number {
  const sourceTags = new Set(source.tags.map(discoverySlug));
  let total = 0;
  for (const tag of candidate.tags) if (sourceTags.has(discoverySlug(tag))) total += 2;
  if (
    source.category &&
    candidate.category &&
    discoverySlug(source.category) === discoverySlug(candidate.category)
  ) {
    total += 1;
  }
  return total;
}

function rank<T extends Scorable>(
  source: Scorable,
  candidates: T[],
  recency: (item: T) => string,
  exclude: Set<string> = new Set(),
): T[] {
  return candidates
    .filter((c) => c.slug !== source.slug && !exclude.has(c.slug))
    .map((candidate) => ({ candidate, points: score(source, candidate) }))
    .filter(({ points }) => points > 0)
    .sort(
      (a, b) =>
        b.points - a.points || recency(b.candidate).localeCompare(recency(a.candidate)),
    )
    .map(({ candidate }) => candidate)
    .slice(0, MAX_RELATED);
}

/** Projects related to the given project or knowledge article. */
export function relatedProjectsFor(
  source: Scorable,
  projects: ProjectMetadata[],
  exclude?: Set<string>,
): ProjectMetadata[] {
  return rank(source, projects, recencyKey, exclude);
}

/** Knowledge articles related to the given project or knowledge article. */
export function relatedKnowledgeFor(
  source: Scorable,
  knowledge: KnowledgeMetadata[],
  exclude?: Set<string>,
): KnowledgeMetadata[] {
  return rank(source, knowledge, knowledgeRecencyKey, exclude);
}
