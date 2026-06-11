// Remark plugin — keep project resource embeds portable.
//
// By default Astro's `astro:assets` pipeline optimizes relative markdown images, rewriting
// `images/x.png` → `/_astro/x.HASH.webp` and (critically) converting animated GIFs to a
// single-frame WebP. For Project Hub we want every resource served unchanged from its
// project-relative path (see the `project-resources` integration, which mirrors the folders
// into the build). This plugin converts `images/` and `gifs/` image embeds into literal
// `<img>` HTML nodes — which the assets pipeline leaves untouched — so GIFs stay animated
// and paths stay portable.
//
// File links (`[label](files/x.zip)`) are already emitted as literal relative hrefs by
// Astro, so they need no transformation here.

const RESOURCE_RE = /^(?:\.\/)?(?:images|gifs|files)\//;

function escapeAttr(value = '') {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function walk(node) {
  if (!node || !Array.isArray(node.children)) return;
  node.children = node.children.map((child) => {
    if (child.type === 'image' && typeof child.url === 'string' && RESOURCE_RE.test(child.url)) {
      const src = child.url.replace(/^\.\//, '');
      const alt = escapeAttr(child.alt ?? '');
      const title = child.title ? ` title="${escapeAttr(child.title)}"` : '';
      return {
        type: 'html',
        value: `<img src="${src}" alt="${alt}"${title} loading="lazy" decoding="async">`,
      };
    }
    walk(child);
    return child;
  });
}

export default function remarkResourceLinks() {
  return (tree) => walk(tree);
}
