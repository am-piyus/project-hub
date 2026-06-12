# GitHub Pages Deployment

> Production deployment configuration for Project Hub — GitHub Pages as the V0.1 hosting
> target, and how the site is made base-path-aware.
>
> Deliverable of Droplet 0.1.6.1 – GitHub Pages Deployment.

## 1. Deployment Target

| Item | Value |
| --- | --- |
| Host | **GitHub Pages** (project site) |
| Public URL | `https://am-piyus.github.io/project-hub/` |
| Source | GitHub Actions build of `website/` (Droplet 0.1.6.2) |
| Cost | Free — matches the V0.1 low-maintenance requirement |

GitHub Pages was selected in [Publishing Technology Selection](Publishing_Technology_Selection.md)
(free, native to the GitHub-based workflow, no extra accounts). A project site serves
under the repository sub-path, which drives the base-path work below.

## 2. Astro Production Configuration

[website/astro.config.mjs](../website/astro.config.mjs):

```js
const SITE = 'https://am-piyus.github.io';
const BASE = '/project-hub';
export default defineConfig({ site: SITE, base: BASE, ... });
```

`BASE` is the single source of truth and reaches every URL producer:

| Surface | Mechanism |
| --- | --- |
| Astro routing / assets | `base` config (built-in) |
| Page/component links | `withBase()` helper in `src/lib/url-generator.ts` (reads `import.meta.env.BASE_URL`) |
| URL generators (projects, knowledge, tags, categories) | call `withBase()` — every card, registry, and content-index URL is base-aware |
| Wikilinks (`[[Target]]`) | `internal-links` integration passes `base` to the remark plugin |
| Resource embeds (images/GIFs/files) | `remark-resource-links` receives `base` via plugin options |
| Pagefind assets on /search | `define:vars` passes the base into the inline loader script |

**Rule for future code:** never write a root-absolute internal URL (`/projects/...`)
directly — always go through `withBase()` or a URL generator. Changing hosts (custom
domain → `base: '/'`) is then a one-line config change.

## 3. Production Validation (local, against the base-path build)

Verified on `npm run build` + `npm run preview` (serves at `/project-hub/`):

- ✅ Build clean — 33 routes; resources 3/3; wikilinks 7/7; search index generated; `astro check` 0/0
- ✅ All rendered URLs carry the base (`/project-hub/...`); zero un-prefixed internal links in output
- ✅ Live sweep 200: homepage, listings, portfolio, search, tag/category pages, project/knowledge docs, GIF resource, Pagefind bundle, content-index
- ✅ Wrong-base request → 404 (no accidental root serving)

## 4. Enabling Pages on the Repository (one-time)

GitHub → repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.
The deploy workflow (Droplet 0.1.6.2) handles everything else; no branch configuration
is needed.

## 5. V0.1 Boundaries

Not implemented (future versions): custom domains, CDN optimization, multi-environment
deployments, preview deployments.

---

*See also: [GitHub Actions Pipeline](GitHub_Actions_Pipeline.md) · [Publishing Technology Selection](Publishing_Technology_Selection.md)*
