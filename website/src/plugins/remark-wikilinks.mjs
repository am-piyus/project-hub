// Remark plugin — Obsidian wikilinks → website links.
//
// Transforms `[[Target]]` and `[[Target|Custom Label]]` in markdown into internal links:
//
//   [[Project_02_PWM_Output]]              → <a href="/projects/Project_02_PWM_Output">Project_02_PWM_Output</a>
//   [[Project_02_PWM_Output|PWM Project]]  → <a href="/projects/Project_02_PWM_Output">PWM Project</a>
//
// Targets are resolved against the set of known content entries passed in `options.projects`
// (computed by the `internal-links` integration from the content/ directory). A wikilink to
// an unknown target is rendered as a non-navigating marker span; the integration emits the
// build warning for it. Wikilinks inside inline code / code blocks are left untouched
// because those are not `text` mdast nodes.

const WIKILINK_RE = /\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g;

function escapeHtml(value = '') {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function splitText(value, resolve) {
  const nodes = [];
  let lastIndex = 0;
  WIKILINK_RE.lastIndex = 0;
  let match;
  while ((match = WIKILINK_RE.exec(value)) !== null) {
    const [full, rawTarget, rawLabel] = match;
    if (match.index > lastIndex) {
      nodes.push({ type: 'text', value: value.slice(lastIndex, match.index) });
    }
    const target = rawTarget.trim();
    const label = (rawLabel ?? rawTarget).trim();
    const url = resolve(target);
    if (url) {
      nodes.push({ type: 'link', url, children: [{ type: 'text', value: label }] });
    } else {
      nodes.push({
        type: 'html',
        value: `<span class="wikilink-broken" title="Unresolved wikilink: ${escapeHtml(target)}">${escapeHtml(label)}</span>`,
      });
    }
    lastIndex = match.index + full.length;
  }
  if (lastIndex < value.length) {
    nodes.push({ type: 'text', value: value.slice(lastIndex) });
  }
  return nodes;
}

function transform(node, resolve) {
  if (!node || !Array.isArray(node.children)) return;
  const next = [];
  for (const child of node.children) {
    if (child.type === 'text' && typeof child.value === 'string' && child.value.includes('[[')) {
      next.push(...splitText(child.value, resolve));
    } else {
      transform(child, resolve);
      next.push(child);
    }
  }
  node.children = next;
}

export default function remarkWikilinks(options = {}) {
  const projects = new Set(options.projects ?? []);
  const knowledge = new Set(options.knowledge ?? []);
  // Deployment base path (e.g. '/project-hub' on GitHub Pages), '' at root.
  const base = (options.base ?? '').replace(/\/$/, '');
  // Resolve a wikilink target to a URL, or null if it is unknown.
  // Projects resolve first (the established namespace), then knowledge articles
  // (namespace added by Droplet 0.1.4.4).
  const resolve = (target) => {
    if (projects.has(target)) return `${base}/projects/${target}`;
    if (knowledge.has(target)) return `${base}/knowledge/${target}`;
    return null;
  };
  return (tree) => transform(tree, resolve);
}