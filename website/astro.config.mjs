// @ts-check
import { defineConfig } from 'astro/config';
import projectResources from './integrations/project-resources.mjs';
import internalLinks from './integrations/internal-links.mjs';
import searchIndex from './integrations/search-index.mjs';
import remarkResourceLinks from './src/plugins/remark-resource-links.mjs';

// Project Hub — static site generator (see docs/Publishing_Technology_Selection.md).
//
// `site` and `base` (required for the GitHub Pages sub-path) are configured later in the
// Deployment Pipeline (Bucket 0.1.6). Default output is a static build under dist/.
export default defineConfig({
  // Mirror project resources (images/gifs/files) into the build and validate references;
  // resolve Obsidian wikilinks into internal navigation and validate them;
  // generate the Pagefind search index after each build.
  integrations: [projectResources(), internalLinks(), searchIndex()],
  markdown: {
    // Keep resource embeds at their portable project-relative paths (preserves GIFs).
    remarkPlugins: [remarkResourceLinks],
  },
});
