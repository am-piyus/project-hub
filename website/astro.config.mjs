// @ts-check
import { defineConfig } from 'astro/config';
import projectResources from './integrations/project-resources.mjs';
import internalLinks from './integrations/internal-links.mjs';
import searchIndex from './integrations/search-index.mjs';
import remarkResourceLinks from './src/plugins/remark-resource-links.mjs';

// Project Hub — static site generator (see docs/Publishing_Technology_Selection.md).
//
// Production target (Droplet 0.1.6.1): GitHub Pages project site —
// https://am-piyus.github.io/project-hub/ — so every internal URL carries the
// repository base path. BASE is the single source of truth: Astro routing uses
// it via `base`, components/libs read it via import.meta.env.BASE_URL, and the
// remark plugins receive it through their options below.
const SITE = 'https://am-piyus.github.io';
const BASE = '/project-hub';

export default defineConfig({
  site: SITE,
  base: BASE,
  // Mirror project resources (images/gifs/files) into the build and validate references;
  // resolve Obsidian wikilinks into internal navigation and validate them;
  // generate the Pagefind search index after each build.
  integrations: [projectResources(), internalLinks({ base: BASE }), searchIndex()],
  markdown: {
    // Keep resource embeds at their portable project-relative paths (preserves GIFs).
    remarkPlugins: [[remarkResourceLinks, { base: BASE }]],
  },
});
