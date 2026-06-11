# Architecture

> High-level architecture for Project Hub V0.1. Technology-stack decisions are recorded
> in [Publishing Technology Selection](Publishing_Technology_Selection.md) (Droplet 0.1.3.1).

## 1. Architectural Overview

Project Hub is a **static documentation publishing system**. Content is authored as
markdown in Obsidian, version-controlled in GitHub, transformed by a publishing engine,
and served as a static website. No runtime database or backend application is required
for V0.1.

## 2. Content Flow

```
┌──────────────────────────┐
│  Knowledge Sources       │  ChatGPT · Claude · Gemini · Forums · Videos · Notes
└────────────┬─────────────┘
             ▼
   Knowledge Extraction Prompt
             ▼
        UPDS Markdown
             ▼
       Manual Refinement
             ▼
┌──────────────────────────┐
│  Obsidian Vault          │  Authoring + linking (markdown + assets)
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│  GitHub Repository       │  Version control + source of truth
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│  Publishing Engine       │  Markdown → HTML, assets, links, search index
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│  Live Website            │  Static site: projects, knowledge, search
└──────────────────────────┘
```

## 3. Major System Components

| Component | Responsibility |
| --- | --- |
| **Obsidian Vault** | Primary authoring surface; markdown notes, links, and attachments. |
| **GitHub Repository** | Source of truth, version history, and deployment trigger. |
| **Publishing Engine** | Converts Obsidian markdown into web pages; resolves images, attachments, links, and embeds; builds the search index. |
| **Website Interface** | Homepage, project pages, documentation pages, portfolio pages, navigation. |
| **Discovery System** | Search, tags, categories, and filtering over published content. |
| **Deployment Pipeline** | Automates Obsidian → GitHub → Project Hub → live site. |

## 4. Storage Locations

| Location | Purpose |
| --- | --- |
| Obsidian Vault (Google Drive) | Authoring and documentation source. |
| GitHub `project-hub` | Code, content, and configuration. |
| Static hosting | Deployed live website. |

## 5. Repository Folder Tree

```
project-hub/
├── planning      # Orbit / bucket / droplet planning artifacts
├── docs          # Product definition, decisions, and vision log (this folder)
├── prompts       # Stage 1 — Knowledge Extraction Prompt
├── dre           # Stage 2 — Documentation Refinement Engine workspace
├── workflow      # Stage 3–4 — manual refinement + Obsidian storage specs
├── website       # Astro publishing engine (static site)
├── assets        # Images, attachments, embedded resources
├── content       # Published projects sourced from Obsidian
└── README.md
```

## 6. Integration Points

- **Obsidian → GitHub** — notes and assets are synced/committed into the repository.
- **GitHub → Publishing Engine** — a push triggers the build and deployment pipeline.
- **Publishing Engine → Website** — generated static output is deployed to hosting.

## 7. Constraints

- No user authentication, profiles, or accounts (V0.1).
- No database-backed editing — markdown files are the only content store.
- The system must remain low-maintenance for a single author.

---

*Technology-stack and publishing decisions: [Publishing Technology Selection](Publishing_Technology_Selection.md).
Long-term direction: [Vision Log](Project_Hub_Vision_Log.md).*

*See also: [Vision](Vision.md) · [Product Requirements](ProductRequirements.md) · [Roadmap](Roadmap.md)*
