# GitHub Actions Pipeline

> The continuous publishing workflow of Project Hub: every approved documentation update
> automatically becomes a published website update.
>
> Deliverable of Droplet 0.1.6.2 – GitHub Actions Pipeline.

## 1. The Pipeline

[.github/workflows/deploy.yml](../.github/workflows/deploy.yml) — triggered on every push
to `main` (plus manual `workflow_dispatch`):

```
Documentation updated (Obsidian)
   ↓  git commit + push (GitHub Desktop)
GitHub Actions
   ↓  npm ci                 — reproducible install (lockfile)
   ↓  npm run check          — astro check: types + components must be clean
   ↓  npm run build          — Astro build + integrations:
   ↓                            resource mirror · wikilink validation · Pagefind index
   ↓  upload-pages-artifact  — package website/dist
   ↓  deploy-pages           — publish to GitHub Pages
Public website updated — https://am-piyus.github.io/project-hub/
```

## 2. Build Validation & Failure Handling

- **`astro check` gate** — type or component errors fail the run before any build.
- **Build-time integrity** — the build itself runs the publishing-engine validations:
  content collections + PHDS schemas, broken resource references (warn), wikilink
  resolution (warn), search index generation. A hard build error fails the job.
- **Fail-safe deploys** — `deploy` runs only if `build` succeeds; a failed run leaves the
  **previous deployment live**. Status is visible in the repo's Actions tab; failed runs
  show exactly which step broke.
- **Concurrency** — one Pages deployment at a time (`group: pages`), no canceled
  half-deploys.

## 3. Permissions & Security

The workflow uses the official Pages flow: `contents: read` (checkout only),
`pages: write` + `id-token: write` (OIDC deployment). No secrets, tokens, or third-party
deploy actions are required.

## 4. Operating It

| Action | How |
| --- | --- |
| Publish content | Commit + push to `main` — that's it |
| Re-deploy without changes | Actions tab → *Deploy Project Hub* → *Run workflow* |
| Inspect a failure | Actions tab → failed run → step logs (`check` or `build`) |
| First-time enablement | Settings → Pages → Source: **GitHub Actions** (one time) |

## 5. V0.1 Boundaries

Not implemented (future versions): preview/staging environments, multi-environment
deploys, rollback automation, advanced CI (matrix tests, link-checking gates,
Lighthouse budgets).

---

*See also: [GitHub Pages Deployment](GitHub_Pages_Deployment.md) · [Publishing Build Verification](Publishing_Build_Verification.md)*
