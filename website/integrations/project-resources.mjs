// Astro integration — project resource processing for the Publishing Engine.
//
// Project documentation lives in the repo-root `content/<Project>/` folders, each holding
// `images/`, `gifs/`, and `files/` subfolders (see Obsidian Storage Structure). Those
// resources sit OUTSIDE the Astro app, so Astro does not serve or ship them on its own.
//
// This integration, on startup (dev and build):
//   1. Mirrors every project's resource folders into `public/projects/<Project>/...`, so
//      each resource is served in dev and copied into the build at a project-relative URL
//      that matches the page route (`/projects/<Project>/`). Resources are shipped
//      unchanged — GIFs keep their animation, files stay downloadable.
//   2. Validates resource references in each project's markdown and warns on any that point
//      at a missing file (broken-reference detection).
//
// The mirror under `public/projects/` is generated and git-ignored.

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

async function validateRefs(projectDir, project, logger) {
  let broken = 0;
  const entries = await fs.readdir(projectDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    const markdown = await fs.readFile(path.join(projectDir, entry.name), 'utf8');
    for (const match of markdown.matchAll(REF_RE)) {
      const [, dir, rest] = match;
      const target = path.join(projectDir, dir, rest);
      if (!(await exists(target))) {
        broken += 1;
        logger.warn(`[${project}] broken resource reference: ${dir}/${rest} (in ${entry.name})`);
      }
    }
  }
  return broken;
}

export default function projectResources(options = {}) {
  const contentDirName = options.contentDir ?? '../content';

  return {
    name: 'project-resources',
    hooks: {
      'astro:config:setup': async ({ config, logger }) => {
        const root = fileURLToPath(config.root);
        const contentDir = path.resolve(root, contentDirName);
        const mirrorRoot = path.join(fileURLToPath(config.publicDir), 'projects');

        let projects;
        try {
          projects = (await fs.readdir(contentDir, { withFileTypes: true }))
            .filter((entry) => entry.isDirectory())
            .map((entry) => entry.name);
        } catch {
          logger.warn(`content directory not found at ${contentDir} — no resources processed`);
          return;
        }

        // Rebuild the mirror from scratch so deleted resources never linger.
        await fs.rm(mirrorRoot, { recursive: true, force: true });

        let copied = 0;
        let broken = 0;

        for (const project of projects) {
          const projectDir = path.join(contentDir, project);

          for (const dir of RESOURCE_DIRS) {
            const sourceDir = path.join(projectDir, dir);
            if (await exists(sourceDir)) {
              await fs.cp(sourceDir, path.join(mirrorRoot, project, dir), { recursive: true });
              copied += await countFiles(sourceDir);
            }
          }

          broken += await validateRefs(projectDir, project, logger);
        }

        if (copied > 0) {
          logger.info(`mirrored ${copied} resource file(s) across ${projects.length} project(s)`);
        }
        if (broken > 0) {
          logger.warn(`${broken} broken resource reference(s) detected — see warnings above`);
        }
      },
    },
  };
}
