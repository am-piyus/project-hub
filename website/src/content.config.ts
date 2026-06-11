import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// PHDS dates may be a YAML date (e.g. 2026-06-08) or the literal "unknown". YAML parses an
// unquoted date into a Date object, so normalize it back to a YYYY-MM-DD string.
const phdsDate = z
  .preprocess(
    (value: unknown) =>
      value instanceof Date ? value.toISOString().slice(0, 10) : value,
    z.string(),
  )
  .optional();

// Project documentation lives in the repo-root `content/` directory — OUTSIDE this Astro
// app — authored per the Obsidian Storage Structure (workflow/Obsidian_Storage_Structure.md):
//
//   content/<Project_Name>/<Project_Name>.md   ← the page
//   content/<Project_Name>/images|gifs|files/  ← resources
//
// The content-layer `glob()` loader reads that markdown directly, so `content/` stays the
// single source of truth (no copying into the Astro app). The project folder name becomes
// the entry id, which drives a clean `/projects/<Project_Name>` route.
const projects = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: '../content',
    // id = the project folder name (first path segment), preserving its exact casing.
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  // PHDS frontmatter (dre/PHDS_Template.md). `title` and `status` are the required
  // metadata fields; the rest are optional and default sensibly during extraction.
  schema: z.object({
    title: z.string(),
    status: z.string(),
    date_started: phdsDate,
    date_sealed: phdsDate,
    sources: z.array(z.string()).optional(),
    ai_systems: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
  }),
});

// Knowledge articles live in the repo-root `knowledge/` directory, mirroring the
// project storage structure (knowledge/<Article>/<Article>.md + images|gifs|files/).
// Knowledge answers "what was learned / what concepts matter"; projects answer
// "what was built". Routes render at /knowledge/<Article> (Droplet 0.1.4.4).
const knowledge = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: '../knowledge',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    title: z.string(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    date_created: phdsDate,
    date_updated: phdsDate,
    // Relationship foundation: slugs of related content (rendered as links).
    related_projects: z.array(z.string()).optional(),
    related_knowledge: z.array(z.string()).optional(),
  }),
});

export const collections = { projects, knowledge };
