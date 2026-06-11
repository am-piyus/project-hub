// Astro integration — internal linking engine for the Publishing Engine.
//
// Documentation uses Obsidian wikilinks (`[[Target]]`, `[[Target|Label]]`) to navigate
// between documents. This integration:
//   1. Computes the set of valid wikilink targets from the repo-root content roots:
//      content/ (projects → /projects/<Target>) and knowledge/ (articles →
//      /knowledge/<Target>, namespace added by Droplet 0.1.4.4).
//   2. Registers the remark-wikilinks transform with those target sets, so wikilinks
//      render as internal links during markdown processing (projects take precedence
//      on a name collision).
//   3. Validates every wikilink in every document and warns on targets that do not
//      resolve (broken-link detection), keeping navigation integrity verifiable.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import remarkWikilinks from '../src/plugins/remark-wikilinks.mjs';

const WIKILINK_RE = /\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g;

async function listFolders(dir) {
  try {
    return (await fs.readdir(dir, { withFileTypes: true }))
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
  } catch {
    return null;
  }
}

export default function internalLinks(options = {}) {
  const contentDirName = options.contentDir ?? '../content';
  const knowledgeDirName = options.knowledgeDir ?? '../knowledge';

  return {
    name: 'internal-links',
    hooks: {
      'astro:config:setup': async ({ config, updateConfig, logger }) => {
        const root = fileURLToPath(config.root);
        const contentDir = path.resolve(root, contentDirName);
        const knowledgeDir = path.resolve(root, knowledgeDirName);

        const projects = (await listFolders(contentDir)) ?? [];
        if (projects.length === 0) {
          logger.warn(`content directory not found or empty at ${contentDir}`);
        }
        // knowledge/ may not exist yet — that is a valid (empty-library) state.
        const knowledge = (await listFolders(knowledgeDir)) ?? [];

        const targets = new Set([...projects, ...knowledge]);

        // Register the wikilink transform with the discovered targets.
        updateConfig({ markdown: { remarkPlugins: [[remarkWikilinks, { projects, knowledge }]] } });

        // Validate wikilinks across all documentation roots.
        let total = 0;
        let broken = 0;
        const roots = [
          { dir: contentDir, folders: projects },
          { dir: knowledgeDir, folders: knowledge },
        ];
        for (const { dir, folders } of roots) {
          for (const folder of folders) {
            const folderDir = path.join(dir, folder);
            for (const entry of await fs.readdir(folderDir, { withFileTypes: true })) {
              if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
              const markdown = await fs.readFile(path.join(folderDir, entry.name), 'utf8');
              for (const match of markdown.matchAll(WIKILINK_RE)) {
                total += 1;
                const target = match[1].trim();
                if (!targets.has(target)) {
                  broken += 1;
                  logger.warn(`[${folder}] broken wikilink: [[${target}]] (in ${entry.name})`);
                }
              }
            }
          }
        }

        if (total > 0) {
          logger.info(
            `resolved ${total - broken}/${total} wikilink(s) across ${projects.length} project(s) and ${knowledge.length} knowledge article(s)`,
          );
        }
        if (broken > 0) {
          logger.warn(`${broken} broken wikilink(s) detected — see warnings above`);
        }
      },
    },
  };
}
