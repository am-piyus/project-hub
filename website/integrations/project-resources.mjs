// Astro integration — resource processing for the Publishing Engine.
//
// Documentation lives in repo-root content roots, each folder holding `images/`,
// `gifs/`, and `files/` subfolders (see Obsidian Storage Structure):
//
//   content/<Project>/…    → served under /projects/<Project>/…
//   knowledge/<Article>/…  → served under /knowledge/<Article>/…   (Droplet 0.1.4.4)
//
// Those resources sit OUTSIDE the Astro app, so Astro does not serve or ship them on
// its own. This integration, on startup (dev and build):
//   1. Mirrors every folder's resource subfolders into `public/<segment>/<slug>/...`,
//      so each resource is served in dev and copied into the build at the URL that
//      matches its page route. Resources ship unchanged — GIFs keep their animation,
//      files stay downloadable.
//   2. Validates resource references in each document and warns on any that point at
//      a missing file (broken-reference detection).
//
// The mirrors under `public/` are generated and git-ignored.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RESOURCE_DIRS = ['images', 'gifs', 'files'];
// Matches markdown image embeds and links pointing into a resource folder, e.g.
// `![alt](images/x.png)` or `[label](files/y.zip)`.
const REF_RE = /!?\[[^\]]*\]\((?:\.\/)?(images|gifs|files)\/([^)\s]+)\)/g;

async function exists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

async function countFiles(dir) {
  let count = 0;
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) count += await countFiles(path.join(dir, entry.name));
    else count += 1;
  }
  return count;
}

async function validateRefs(folderDir, folder, logger) {
  let broken = 0;
  const entries = await fs.readdir(folderDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    const markdown = await fs.readFile(path.join(folderDir, entry.name), 'utf8');
    for (const match of markdown.matchAll(REF_RE)) {
      const [, dir, rest] = match;
      const target = path.join(folderDir, dir, rest);
      if (!(await exists(target))) {
        broken += 1;
        logger.warn(`[${folder}] broken resource reference: ${dir}/${rest} (in ${entry.name})`);
      }
    }
  }
  return broken;
}

export default function projectResources(options = {}) {
  const roots = options.roots ?? [
    { dir: '../content', segment: 'projects' },
    { dir: '../knowledge', segment: 'knowledge' },
  ];

  return {
    name: 'project-resources',
    hooks: {
      'astro:config:setup': async ({ config, logger }) => {
        const root = fileURLToPath(config.root);
        const publicDir = fileURLToPath(config.publicDir);

        let copied = 0;
        let broken = 0;
        let folderCount = 0;

        for (const { dir, segment } of roots) {
          const sourceRoot = path.resolve(root, dir);
          const mirrorRoot = path.join(publicDir, segment);

          let folders;
          try {
            folders = (await fs.readdir(sourceRoot, { withFileTypes: true }))
              // dot-folders (e.g. .obsidian vault config) are not content
              .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
              .map((entry) => entry.name);
          } catch {
            // A missing root (e.g. an empty knowledge library) is a valid state.
            continue;
          }

          // Rebuild the mirror from scratch so deleted resources never linger.
          await fs.rm(mirrorRoot, { recursive: true, force: true });

          for (const folder of folders) {
            folderCount += 1;
            const folderDir = path.join(sourceRoot, folder);

            for (const resourceDir of RESOURCE_DIRS) {
              const sourceDir = path.join(folderDir, resourceDir);
              if (await exists(sourceDir)) {
                await fs.cp(sourceDir, path.join(mirrorRoot, folder, resourceDir), {
                  recursive: true,
                });
                copied += await countFiles(sourceDir);
              }
            }

            broken += await validateRefs(folderDir, folder, logger);
          }
        }

        if (copied > 0) {
          logger.info(`mirrored ${copied} resource file(s) across ${folderCount} folder(s)`);
        }
        if (broken > 0) {
          logger.warn(`${broken} broken resource reference(s) detected — see warnings above`);
        }
      },
    },
  };
}
