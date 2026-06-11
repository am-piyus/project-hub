# README_IDE — Operating Guide for Implementation Sessions

> How AI-assisted IDE sessions (Claude Code or any agent) must work inside this
> repository. Read this **before implementing anything**.
>
> Companion: [docs/Project_Hub_Vision_Log.md](docs/Project_Hub_Vision_Log.md) — the
> long-term vision this work serves.

## 1. What You Are Working On

- **Project Hub is larger than V0.1.** V0.1 is a **validation release** — a boilerplate
  of a much bigger ecosystem (creator profiles, blog publishing, knowledge publishing,
  AI-assisted content derivation). See the Vision Log.
- The current goal is to prove the pipeline: Obsidian documentation → publishing engine
  → public website, maintained by a single author with minimal effort.
- Every bucket should be implemented **considering future expansion** — but future ideas
  are **recorded in the Vision Log, never auto-implemented**.

## 2. Execution Authority

The **Orbit → Bucket → Droplet** workflow is the only execution authority.

- **Orbit** (`Orbit 0.1 - Project Hub.md` in the vault) — product maturity stage, bucket
  index, success criteria.
- **Bucket** — one subsystem with objectives, scope boundaries, droplet list.
- **Droplet** — one implementable task with objective, expected files, verification
  checklist, and a git commit message template.

Specs live in the Obsidian vault:

```
K:\My Drive\Complete_Archive\02. Professional\0. Projects\0. Unified Obsidan Vault - Projects\project-hub\
├── Orbit 0.1 - Project Hub.md
├── buckets-archive\   ← bucket specs
└── droplets-archive\  ← droplet specs
```

Do not invent scope. Do not skip ahead. Do not implement excluded responsibilities
(each bucket lists what it does NOT cover and which bucket owns it).

## 3. Session Start Ritual

Before implementing a new bucket or droplet:

1. Read the **Orbit** file (the user revises it — bucket numbering has changed before).
2. Read the **current bucket** spec fully; understand its scope boundaries.
3. Read **completed buckets** that the current one depends on.
4. Read the **Vision Log** — connect the bucket's objective to the long-term direction.
5. Inspect the **repo state** (`git status`, recent log) — the user edits files and
   pushes via GitHub Desktop between sessions.

Build connections before building code: each bucket should consume what previous buckets
produced (e.g. the Website Interface consumes the Publishing Engine's content index) and
expose what future buckets need (e.g. navigation data for the Discovery System).

## 4. Droplet Implementation Cycle

For every droplet:

```
Read droplet spec (vault)
   ↓
Design — connect to vision, check prior buckets, flag decisions
   ↓
Implement (smallest correct change; match repo conventions)
   ↓
Verify — all checks below must pass
   ↓
Present results to the user
   ↓
WAIT for the user's validation green signal
   ↓
Commit (format below) — the user pushes via GitHub Desktop
   ↓
Update the droplet's vault .md (concrete file list + commit message)
   ↓
Next droplet
```

**Do not commit before the user's green signal.** Verification by the agent is necessary
but not sufficient.

### Verification (code droplets)

```bash
cd website
npm run build    # must complete clean — watch integration warnings
npm run check    # astro check — 0 errors / 0 warnings required
```

- `astro build` does **not** type-check — always run `check` too.
- Astro caches rendered markdown in `website/.astro/` — after changing remark plugins or
  content config, clear it: `rm -rf .astro node_modules/.astro`.
- For rendering changes, verify actual output (grep `dist/`, or `npm run preview` +
  `curl`) in addition to a clean build.

## 5. Git Commit Format

```
<type> (<scope>) : <summary> (Droplet <ID>)

- (+) [path/to/added/file]
	- what it does
- (m) [path/to/modified/file]
	- what changed

Outcome:
- result bullet
- result bullet

Refs: Droplet <ID>
```

- `feat`/`fix`/`test`/`refactor`/`chore` are for **code** changes; documentation-only
  changes use `docs` — even when fixing something.
- Follow-up changes to a completed droplet are **Ripples**: `(Ripple <DropletID>.<n>)`,
  committed separately, `Refs: Ripple <ID>`.
- One droplet = one commit. Never bundle unrelated changes.
- The user pushes via **GitHub Desktop** — create commits, don't push (and never
  force-push without explicit instruction).

## 6. Repository Map

```
project-hub/
├── README.md               # product overview
├── README_IDE.md           # this guide
├── docs/                   # product definition + decisions + vision log
├── prompts/                # Stage 1: Knowledge Extraction Prompt
├── dre/                    # Stage 2: Documentation Refinement Engine (+ rules_DRE/)
├── workflow/               # Stage 3–4: manual refinement + Obsidian storage specs
├── content/                # published projects: <Project>/<Project>.md + images|gifs|files/
├── website/                # Astro publishing engine (Bucket 0.1.3 — FROZEN baseline)
├── assets/                 # shared assets
└── planning/               # planning artifacts
```

Key website internals: content collection reads repo-root `content/` via glob loader;
`integrations/` mirror resources and resolve wikilinks (both validate at build);
`src/lib/` holds metadata/URL/content-index generation; resource and internal URLs are
**root-absolute** (`/projects/<slug>/…`).

## 7. Current State & Boundaries

- **Frozen:** Bucket 0.1.3 – Publishing Engine (verified by
  [docs/Publishing_Build_Verification.md](docs/Publishing_Build_Verification.md)).
  Reopen only for future version upgrades; its §6 lists the deferred re-entry points
  (callout admonitions, knowledge wikilink namespace, image optimization, …).
- **Do not** rewrite completed bucket/droplet records, modify approved architecture
  decisions, or restructure frozen systems while implementing new buckets. Add context;
  don't alter history.
- **GitHub Pages base path** is deliberately deferred to Bucket 0.1.6 — keep links
  root-absolute until then.
- Knowledge articles, search/tags UI, and deployment automation each belong to their
  designated bucket — check before implementing.

## 8. Avoiding Future-Blocking Debt

- No hardcoded single-project or single-user assumptions where a collection works.
- Keep content portable (relative resources inside project folders; no lock-in).
- Keep derived data (indexes, registries) machine-readable — future systems consume them.
- Prefer extensible seams (e.g. the wikilink resolver is built to gain a knowledge
  namespace) over closed implementations.
- When an idea exceeds the current droplet: **write it into the Vision Log's Raw Thought
  Log**, tell the user, move on.

---

*Vision: [docs/Project_Hub_Vision_Log.md](docs/Project_Hub_Vision_Log.md) · Formal docs: [docs/](docs/) · Verification baseline: [docs/Publishing_Build_Verification.md](docs/Publishing_Build_Verification.md)*
