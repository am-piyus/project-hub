// Astro integration — internal linking engine for the Publishing Engine.
//
// Project documentation uses Obsidian wikilinks (`[[Target]]`, `[[Target|Label]]`) to
// navigate between documents. This integration:
//   1. Computes the set of valid wikilink targets from the repo-root content/ directory.
//   2. Registers the remark-wikilinks transform with that target set, so wikilinks render
//      as `/projects/<Target>` links during markdown processing.
//   3. Validates every wikilink in every project's markdown and warns on targets that do
//      not resolve (broken-link detection), keeping navigation integrity verifiable.
//
// Only the projects namespace exists today; a knowledge namespace can be added in
// Bucket 0.1.4 (Website Interface) by extending the resolver and this target set.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import remarkWikilinks from '../src/plugins/remark-wikilinks.mjs';

const WIKILINK_RE = /\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g;

export default function internalLinks(options = {}) {
  const contentDirName = options.contentDir ?? '../content';

  return {
    name: 'internal-links',
    hooks: {
      'astro:config:setup': async ({ config, updateConfig, logger }) => {
        const root = fileURLToPath(config.root);
        const contentDir = path.resolve(root, contentDirName);

        let projects = [];
        try {
          projects = (await fs.readdir(contentDir, { withFileTypes: true }))
            .filter((entry) => entry.isDirectory())
            .map((entry) => entry.name);
        } catch {
          logger.warn(`content directory not found at ${contentDir} — no wikilinks processed`);
        }
        const targets = new Set(projects);

        // Register the wikilink transform with the discovered targets.
        updateConfig({ markdown: { remarkPlugins: [[remarkWikilinks, { projects }]] } });

        // Validate wikilinks across all project markdown.
        let total = 0;
        let broken = 0;
        for (const project of projects) {
          const projectDir = path.join(contentDir, project);
          for (const entry of await fs.readdir(projectDir, { withFileTypes: true })) {
            if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
            const markdown = await fs.readFile(path.join(projectDir, entry.name), 'utf8');
            for (const match of markdown.matchAll(WIKILINK_RE)) {
              total += 1;
              const target = match[1].trim();
              if (!targets.has(target)) {
                broken += 1;
                logger.warn(`[${project}] broken wikilink: [[${target}]] (in ${entry.name})`);
              }
            }
          }
        }

        if (total > 0) {
          logger.info(`resolved ${total - broken}/${total} wikilink(s) across ${projects.length} project(s)`);
        }
        if (broken > 0) {
          logger.warn(`${broken} broken wikilink(s) detected — see warnings above`);
        }
      },
    },
  };
}
