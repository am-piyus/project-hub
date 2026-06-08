# Publishing Technology Selection

> The technology stack for the Project Hub Publishing Engine, and the rationale behind each
> decision. This is the technical foundation that Droplets 0.1.3.2–0.1.3.6 build on.
>
> Deliverable of Droplet 0.1.3.1 – Publishing Technology Selection.

## 1. Purpose

Bucket 0.1.3 turns the organized project documentation under `content/` into a published
website. Before building the pipeline, this document fixes the stack: the architecture,
the framework, how markdown and resources are processed, and where the site deploys —
each chosen against the project's constraints and recorded so later droplets inherit a
settled foundation.

## 2. Requirements the Stack Must Satisfy

The selected stack must support, end to end:

- **PHDS documentation** — render the [PHDS](../dre/PHDS_Template.md) document structure.
- **Images** — render screenshots from each project's `images/` folder.
- **GIFs** — render animated demonstrations from `gifs/`.
- **Downloadable files** — serve resources from `files/` (PDFs, archives, source bundles).
- **Relative resource paths** — resolve `images/…`, `gifs/…`, `files/…` references exactly
  as authored (per the [Obsidian Storage Structure](../workflow/Obsidian_Storage_Structure.md)).
- **Obsidian wikilinks** — resolve `[[Project_Name]]` cross-project links into web links.
- **GitHub-based workflow** — read content straight from the repository; deploy from a push.

## 3. Evaluation Criteria

Each candidate was weighed against:

| Criterion | Why it matters here |
| --- | --- |
| Ease of implementation | Single author; the build must be quick to stand up and reason about. |
| Markdown compatibility | Content is plain markdown; first-class markdown support is mandatory. |
| Obsidian-workflow compatibility | Must handle wikilinks, callouts, and relative resource folders. |
| GitHub integration | Source of truth is the repo; deploy should trigger from a push. |
| Performance | Static, fast-loading content pages with minimal client JS. |
| Cost | V0.1 should run on free tiers. |
| Maintainability | Low-maintenance for one person over the long term. |
| Future scalability | Must grow into search, tags, project/portfolio pages, and more content. |

## 4. Decision Summary

| Decision area | Selected | Alternatives considered |
| --- | --- | --- |
| **Architecture** | Static Site Generator (SSG) | Server-Side Rendering, Client-Side Rendering |
| **Content source** | GitHub repository (`content/`) | Obsidian vault export, alternative sources |
| **Rendering framework** | **Astro** | Next.js, Docusaurus |
| **Markdown processing** | Astro content collections + remark/rehype | Custom parser, runtime markdown |
| **Deployment platform** | **GitHub Pages** (via GitHub Actions) | Vercel, Netlify |

## 5. Architecture — Static Site Generator

**Selected: Static Site Generator.**

Project Hub is content that changes only when the author publishes — there is no per-request
dynamic data, no user accounts, and no database (see [Architecture](Architecture.md) §7
constraints). An SSG renders every project folder to static HTML at build time and serves
it from a CDN/static host.

| Architecture | Verdict | Reason |
| --- | --- | --- |
| **Static Site Generator** | ✅ Selected | Content is build-time static; fastest, cheapest, simplest to host; matches the no-backend constraint. |
| Server-Side Rendering | ✗ Rejected | Requires a running server; needless cost and maintenance for static content. |
| Client-Side Rendering | ✗ Rejected | Ships heavy JS, weak SEO, poor for a content/portfolio site; slower first paint. |

## 6. Content Source — GitHub Repository

**Selected: the GitHub repository's `content/` directory.**

Documentation already lands in `content/<Project>/` through the
[Obsidian Storage Structure](../workflow/Obsidian_Storage_Structure.md), and the repo is the
declared source of truth ([Architecture](Architecture.md) §3). The build reads markdown and
resources directly from `content/` — no separate export step, no second copy to keep in
sync.

- Each `content/<Project>/` folder is one publishable unit.
- `Project_Name.md` is the page; `images/`, `gifs/`, `files/` are its assets.

## 7. Rendering Framework — Astro

**Selected: Astro.**

Astro is a content-first static site generator with native markdown support, file-based
**content collections**, and an islands model that ships ~zero JavaScript by default — an
excellent match for a markdown documentation and portfolio site.

| Framework | Verdict | Reason |
| --- | --- | --- |
| **Astro** | ✅ Selected | First-class markdown/MDX; content collections map cleanly to `content/`; near-zero JS = fast pages; flexible custom layouts for project, knowledge, and portfolio pages; Pagefind static search drops in for Bucket 0.1.5; deploys to any static host. |
| Docusaurus | ✗ Rejected | Strong for pure docs, but opinionated theming makes custom project/portfolio layouts harder, and it ships a full React runtime. |
| Next.js | ✗ Rejected | Powerful and can static-export, but SSR-oriented and heavier than needed for static markdown; more surface to maintain for one author. |

**Why Astro wins for the criteria that matter most:** markdown compatibility and
Obsidian-workflow compatibility are mandatory, and Astro's remark/rehype pipeline handles
both wikilinks and callouts via plugins; performance and maintainability favor its
zero-JS-by-default output; and its layout flexibility covers the varied page types Bucket
0.1.4 will need.

## 8. Markdown Processing Strategy

Markdown is processed at build time through Astro's content collections and the
**remark/rehype** plugin pipeline:

| Concern | Approach |
| --- | --- |
| PHDS documents | Each `content/<Project>/Project_Name.md` is a content-collection entry with typed frontmatter (title, status, dates, tags, sources). |
| GitHub-flavored markdown | `remark-gfm` for tables, task lists, strikethrough. |
| Obsidian wikilinks | A wikilink remark plugin (e.g. `remark-wiki-link`) resolves `[[Project_Name]]` to the project's generated URL. |
| Obsidian callouts | A callout plugin renders `> [!note]` blocks (used for "Needs review" markers) as styled admonitions. |
| Code highlighting | Astro's built-in Shiki highlighter for fenced code blocks. |
| Frontmatter validation | A content-collection schema (Zod) enforces required PHDS metadata at build time. |

This keeps rendering deterministic and build-time — no client-side markdown parsing.

## 9. Resource Handling Strategy

Resources follow the per-project folder layout and are referenced with **relative paths**,
exactly as the [Obsidian Storage Structure](../workflow/Obsidian_Storage_Structure.md)
defines:

| Resource | Source | Handling |
| --- | --- | --- |
| Images | `images/` | Resolved relative to the project page; optimized at build where possible. |
| GIFs | `gifs/` | Copied to the build output and served alongside the page. |
| Files | `files/` | Emitted as downloadable static assets with stable URLs. |
| Relative links | `images/… · gifs/… · files/…` | Rewritten to correct output URLs during the build so a moved project folder still resolves. |

Detailed resource processing is specified in **Droplet 0.1.3.3 – Resource Processing
System**; link resolution in **Droplet 0.1.3.4 – Internal Linking Engine**.

## 10. Deployment Compatibility — GitHub Pages

**Selected: GitHub Pages, built and deployed via GitHub Actions.**

The source of truth is already the GitHub repo, so GitHub Pages keeps the entire workflow
in one ecosystem at zero cost, deploying automatically on push.

| Platform | Verdict | Reason |
| --- | --- | --- |
| **GitHub Pages** | ✅ Selected | Free, native to the GitHub-based workflow, deploys via Actions; one ecosystem, no extra accounts. Matches V0.1's low-maintenance, single-author goal. |
| Vercel | ◻ Viable alternative | Excellent DX and per-push preview deploys, easy custom domains — but adds an external service. |
| Netlify | ◻ Viable alternative | Comparable to Vercel; also an external service/account. |

**Implementation notes:**

- A GitHub Actions workflow runs `astro build` and publishes the output to Pages on push to
  the main branch — realizing the Obsidian → GitHub → Project Hub pipeline.
- Astro's `site` and `base` must be configured for the Pages URL (project sites serve from a
  sub-path).
- **Portability:** because Astro outputs a standard static bundle, switching to Vercel or
  Netlify later is a deploy-target change only — no rewrite. This keeps the alternatives
  open as the project grows.

## 11. Future Scalability Considerations

The stack is chosen to grow through the rest of Orbit 0.1 without re-platforming:

- **Search (Bucket 0.1.5)** — Pagefind indexes Astro's static output at build time; no
  backend required.
- **Tags & categories (Bucket 0.1.5)** — derived from PHDS frontmatter via content
  collections; dynamic listing pages generated at build.
- **Website interface (Bucket 0.1.4)** — Astro layouts and components support distinct
  homepage, project, knowledge, and portfolio page types.
- **Deployment pipeline (Bucket 0.1.6)** — the Actions-based build is the automation
  backbone to validate end-to-end.
- **Content growth** — static builds scale to large numbers of project pages with no
  per-request cost.
- **Host portability** — standard static output keeps Vercel/Netlify (and custom domains)
  available as drop-in options.

## 12. Resulting Decisions

After this droplet, the Publishing Engine has:

- A selected **architecture** — Static Site Generator.
- A selected **content source** — the GitHub `content/` directory.
- A selected **rendering framework** — Astro.
- A selected **markdown rendering strategy** — content collections + remark/rehype.
- A selected **deployment target** — GitHub Pages via GitHub Actions.
- A documented **rationale** for each decision above.

---

*See also: [Architecture](Architecture.md) · [Obsidian Storage Structure](../workflow/Obsidian_Storage_Structure.md) · [PHDS Template](../dre/PHDS_Template.md) · [Roadmap](Roadmap.md)*

*Next: Droplet 0.1.3.2 – Markdown Rendering Pipeline.*
