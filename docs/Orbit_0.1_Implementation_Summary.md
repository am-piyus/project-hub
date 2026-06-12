# Orbit 0.1 — Implementation Summary

> What was built, how it fits together, and where everything lives — the implementation
> record of Project Hub V0.1 for future maintainers (human or AI).

## 1. System Map

```
prompts/Knowledge_Extraction_Prompt.md     Stage 1 — conversation → raw markdown
dre/ (+ rules_DRE/)                        Stage 2 — AI workspace: raw → PHDS document
workflow/Manual_Refinement_Workflow.md     Stage 3 — screenshots, GIFs, links
workflow/Obsidian_Storage_Structure.md     Stage 4 — content/<Project>/ layout
content/<Project>/                         published projects (md + images|gifs|files)
knowledge/<Article>/                       published knowledge articles
website/                                   the publishing engine + website (Astro 5)
.github/workflows/deploy.yml               continuous publishing to GitHub Pages
docs/                                      product definition, decisions, verifications, releases
```

## 2. Website Internals (`website/`)

| Area | Files | Purpose |
| --- | --- | --- |
| Config | `astro.config.mjs` | site + base (`/project-hub`), integrations, markdown plugins |
| Collections | `src/content.config.ts` | `projects` + `knowledge` glob loaders, PHDS schemas |
| Libraries | `src/lib/` | `url-generator` (BASE/withBase), `metadata`, `knowledge`, `discovery` (tags/categories), `related`, `content-index`, `profile` |
| Integrations | `integrations/` | `project-resources` (mirror+validate), `internal-links` (wikilinks+validate), `search-index` (Pagefind) |
| Remark plugins | `src/plugins/` | `remark-resource-links` (portable resource URLs), `remark-wikilinks` |
| Layouts | `src/layouts/` | `BaseLayout` (shell, SEO, theme init), `ProjectLayout`, `KnowledgeLayout` |
| Components | `src/components/` | 13: header/footer, containers, cards, badges/tags, metadata, TOC, breadcrumb, callout, search box, content filter |
| Pages | `src/pages/` | home, projects, knowledge, portfolio, search, tags/*, categories/*, content-index.json |

## 3. Key Design Decisions (with rationale records)

| Decision | Where recorded |
| --- | --- |
| Astro + GitHub Pages + static-first | [Publishing Technology Selection](Publishing_Technology_Selection.md) |
| Content outside the app (`content/`, `knowledge/`) via glob loaders | 0.1.3.2 vault record; portability is sacred |
| Resources unprocessed at portable URLs (GIF animation preserved) | 0.1.3.3 + Ripple 0.1.3.3.1 |
| Root-absolute → base-aware URLs through `withBase()` | [GitHub Pages Deployment](GitHub_Pages_Deployment.md) |
| PHDS summary extracted from body blockquote (no new frontmatter) | 0.1.4.3 vault record |
| Tags = connections, categories = structure (single category) | [Discovery Verification](Discovery_Verification_Report.md) |
| Related = shared tags (2×) + category (1×), capped 3, no self-refs | `src/lib/related.ts` |
| Profile as data | `src/lib/profile.ts` — future multi-user seed |

## 4. Quality Gates in Force

- `astro check` — type/component gate (CI runs it before build)
- Build-time validation — PHDS schemas, broken resource refs, broken wikilinks (warn), dot-folder exclusion
- Verification reports per bucket — publishing (0.1.3.6), discovery (0.1.5.6), E2E (0.1.6.3), production (0.1.6.4)

## 5. Operating the System

| Task | How |
| --- | --- |
| Publish a project | Document → refine → place in `content/<Name>/` → commit → push |
| Publish knowledge | Same flow into `knowledge/<Name>/` |
| Feature on portfolio | `featured: true` frontmatter |
| Categorize | `category: <Domain>` frontmatter |
| Local check | `cd website && npm run check && npm run build && npm run preview` |
| Deploy | push to `main` (Actions does the rest) |

## 6. What Was Deliberately Not Built

V0.1 boundaries (recorded for V0.2+ planning): accounts/profiles/community, blog
publishing, AI-assisted ingestion/derivation, semantic search, knowledge graph
visualization, custom domain/404, image optimization, analytics. Sources:
[Vision Log](Project_Hub_Vision_Log.md), verification reports' deferred sections.

---

*[Release Notes](Orbit_0.1_Release_Notes.md) · [Version History](Orbit_0.1_Version_History.md)*
