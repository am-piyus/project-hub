// Remark plugin — make project resource embeds portable and trailing-slash-proof.
//
// Two jobs:
//   1. Bypass astro:assets for `images/` and `gifs/` embeds (which would optimize images
//      and, critically, flatten animated GIFs to a single WebP frame). We emit literal
//      <img> HTML instead, so resources ship unchanged from the project-relative mirror.
//   2. Resolve every resource reference (images, gifs, files) to an ABSOLUTE URL rooted at
//      the project route: `/projects/<Project>/<dir>/<file>`.
//
// Why absolute: project pages are served without a trailing slash (e.g.
// `/projects/Sample_Project`), so a page-relative `images/x.png` resolves one level too
// high (`/projects/images/x.png` → 404). An absolute `/projects/<Project>/images/x.png`
// resolves correctly regardless of trailing slash, in dev, build, and preview. This matches
// the rest of the site, which already uses root-absolute internal links.
//
// The project slug is the markdown file's parent folder name
// (`content/<Project>/<Project>.md`), which equals the project route slug.

import path from 'node:path';

const RESOURCE_RE = /^(?:\.\/)?(?:images|gifs|files)\//;

function escapeAttr(value = '') {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function projectSlug(file) {
  const filePath = file?.path ?? file?.history?.[file.history.length - 1];
  return filePath ? path.basename(path.dirname(filePath)) : null;
}

function toAbsolute(url, slug) {
  const clean = url.replace(/^\.\//, '');
  // Fall back to the original relative URL if the slug could not be determined.
  return slug ? `/projects/${slug}/${clean}` : clean;
}

function walk(node, slug) {
  if (!node || !Array.isArray(node.children)) return;
  node.children = node.children.map((child) => {
    if (child.type === 'image' && typeof child.url === 'string' && RESOURCE_RE.test(child.url)) {
      const src = toAbsolute(child.url, slug);
      const alt = escapeAttr(child.alt ?? '');
      const title = child.title ? ` title="${escapeAttr(child.title)}"` : '';
      return {
        type: 'html',
        value: `<img src="${src}" alt="${alt}"${title} loading="lazy" decoding="async">`,
      };
    }
    if (child.type === 'link' && typeof child.url === 'string' && RESOURCE_RE.test(child.url)) {
      child.url = toAbsolute(child.url, slug);
      walk(child, slug);
      return child;
    }
    walk(child, slug);
    return child;
  });
}

export default function remarkResourceLinks() {
  return (tree, file) => walk(tree, projectSlug(file));
}
