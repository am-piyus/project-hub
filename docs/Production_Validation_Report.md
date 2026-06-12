# Production Validation Report

> Validation of the production-configured Project Hub build — the exact artifact the
> deployment pipeline publishes to GitHub Pages.
>
> Deliverable of Droplet 0.1.6.4 – Production Validation.

## 1. Validation Target

The production build: `astro build` with `site: https://am-piyus.github.io`,
`base: /project-hub`, integrations (resources, wikilinks, search index) and `astro check`
— identical to what `.github/workflows/deploy.yml` produces and deploys.

## 2. Results

### 2.1 Build & Type Integrity

| Check | Result |
| --- | --- |
| `astro check` | ✅ 0 errors / 0 warnings |
| Build | ✅ 33 routes; resources 3/3 mirrored; wikilinks 7/7; search index generated |
| Output structure | ✅ pages + `_astro` bundles + `pagefind/` + resource mirrors + `content-index.json` |

### 2.2 Link Integrity (full crawl)

Every `href`/`src` in every generated HTML file was extracted and resolved against the
build output:

| Metric | Value |
| --- | --- |
| HTML pages crawled | 33 |
| Unique internal URLs found | 37 |
| **Broken internal links** | **0** |

### 2.3 Live Serving (preview of the production artifact)

Full route sweep under the production base path — all **200**: homepage, `/projects`,
`/knowledge`, `/portfolio`, `/search`, tag pages, category pages, project & knowledge
documents, GIF resource (correct `image/gif`), Pagefind bundle, `content-index.json`.
Wrong-base request → **404** (no accidental root serving).

### 2.4 Page Quality

| Check | Result |
| --- | --- |
| SEO meta (description, og:title/description/type) | ✅ on every page via BaseLayout |
| Mobile viewport | ✅ |
| Dark-mode pre-paint init | ✅ present in head (no flash) |
| TOC scroll-spy + reading features | ✅ on documentation pages |
| Search facets (`data-pagefind-body`, tag + type filters) | ✅ in indexed pages |
| Accessibility landmarks (skip link, nav labels, aria-current) | ✅ |

### 2.5 Navigation & Discovery (production build)

Verified in the discovery and E2E reports against this same configuration: active nav
states, breadcrumbs, prev/next, related content, tags, categories, filtering, search
index content.

## 3. Live Deployment Checklist (executes on push)

1. ☐ One-time: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. ☐ Push `main` — the pipeline validates, builds, and deploys automatically.
3. ☐ Spot-check `https://am-piyus.github.io/project-hub/`: homepage, one project page
   (TOC + dark mode), search (type a query, use the Tag/Type filters), a tag page, the
   GIF on Sample_Project.

*(The `gh` CLI is not installed locally, so Pages enablement could not be automated;
it remains the single manual step above.)*

## 4. Known Limitations

- **No custom 404 page** — GitHub Pages serves its default 404 (future enhancement:
  `src/pages/404.astro`).
- **Interactive behaviors** (search typing, filter clicking, theme toggle) are verified
  by code path and asset presence; final in-browser spot-check happens on the live URL
  (checklist above).

## 5. Conclusion

The production artifact is fully validated: clean build, zero broken links, complete
route coverage under the production base path, correct content types, and all quality
gates green. **Approved for deployment.**

---

*See also: [GitHub Pages Deployment](GitHub_Pages_Deployment.md) · [GitHub Actions Pipeline](GitHub_Actions_Pipeline.md) · [End-to-End Publishing Report](End_to_End_Publishing_Report.md)*
