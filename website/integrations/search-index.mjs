// Astro integration — search index generation (Droplet 0.1.5.1).
//
// After every production build, Pagefind indexes the generated static HTML and
// writes its search bundle to dist/pagefind/. Pages opt their documentation into
// the index with `data-pagefind-body` (project and knowledge layouts); site
// chrome is not indexed. Fully static — no backend, deploys with the site.
//
// The index only exists in build output: `npm run build` then `npm run preview`
// to exercise search. The /search page shows a notice in dev mode.

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import * as pagefind from 'pagefind';

export default function searchIndex() {
  return {
    name: 'search-index',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distPath = fileURLToPath(dir);
        const { index } = await pagefind.createIndex();
        if (!index) {
          logger.error('pagefind index could not be created');
          return;
        }
        const { page_count } = await index.addDirectory({ path: distPath });
        await index.writeFiles({ outputPath: path.join(distPath, 'pagefind') });
        await pagefind.close();
        logger.info(`search index generated — ${page_count} page(s) indexed`);
      },
    },
  };
}
