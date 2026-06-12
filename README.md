# Project Hub

> A documentation publishing platform that transforms engineering project knowledge into structured, reusable, and publicly accessible documentation.

**Version:** V0.1 (Orbit 0.1) · **Constellation:** am-piyus · **Status:** Released — frozen baseline
**Live site:** https://am-piyus.github.io/project-hub/ · **Release notes:** [Orbit 0.1](docs/Orbit_0.1_Release_Notes.md)

---

## What is Project Hub?

Engineering knowledge is fragmented across AI conversations (ChatGPT, Claude, Gemini),
forums, screenshots, videos, project files, and notes. As projects grow, important
decisions, mistakes, learnings, and discoveries become difficult to locate and reuse —
most project work stays trapped inside conversations instead of becoming a structured
knowledge asset.

Project Hub fixes this. Instead of manually writing blog posts or webpages, you document
projects in **Obsidian** using markdown and supporting resources. Project Hub converts
that documentation into a structured, searchable website suitable for learning, sharing,
portfolio building, and long-term knowledge preservation.

## The Pipeline

```
AI Conversation (ChatGPT, Claude, Gemini) / Forums / Videos
        ↓
Project Execution
        ↓
Project Sealed
        ↓
Knowledge Extraction Prompt
        ↓
UPDS Markdown
        ↓
Manual Refinement
        ↓
Obsidian
        ↓
GitHub
        ↓
Project Hub
        ↓
Live Website
```

## Version 0.1 Goal

V0.1 exists solely to **validate the documentation publishing workflow** — to prove that:

- Project knowledge can be documented efficiently.
- Documentation can be maintained inside Obsidian.
- Markdown documentation can be published automatically.
- A personal engineering knowledge website can be maintained with minimal effort.

### V0.1 is **not**

A community platform · a project management platform · a collaboration platform ·
a social network · a commercial SaaS product.

## Repository Structure

```
project-hub/
├── planning      # Orbit / bucket / droplet planning artifacts
├── docs          # Product definition: vision, requirements, architecture, roadmap
├── prompts       # Stage 1 — Knowledge Extraction Prompt
├── dre           # Stage 2 — Documentation Refinement Engine workspace
├── workflow      # Stage 3–4 — manual refinement + Obsidian storage specs
├── website       # Astro publishing engine (static site)
├── assets        # Images, attachments, embedded resources
├── content       # Published projects sourced from Obsidian
└── README.md
```

## Documentation

| Document | Purpose |
| --- | --- |
| [Vision](docs/Vision.md) | Product purpose, problem, and long-term vision |
| [Vision Log](docs/Project_Hub_Vision_Log.md) | Raw long-term vision, philosophy, and future ecosystem direction |
| [Product Requirements](docs/ProductRequirements.md) | Scope, features, and V0.1 boundaries |
| [Architecture](docs/Architecture.md) | System components, content flow, storage |
| [Roadmap](docs/Roadmap.md) | Success criteria, bucket progress, and future direction |
| [Publishing Technology Selection](docs/Publishing_Technology_Selection.md) | Publishing stack decisions and rationale |
| [Publishing Build Verification](docs/Publishing_Build_Verification.md) | V0.1 publishing baseline verification report |
| [README_IDE](README_IDE.md) | Operating guide for AI-assisted implementation sessions |

## Links

- **GitHub:** https://github.com/am-piyus/project-hub
- **Documentation Vault:** [Obsidian (Google Drive)](https://drive.google.com/drive/u/1/folders/1GJY7ITM6PYLhC04LXl2RhTBxvtWxLcPf)

---

*Project Hub · Orbit 0.1 · Built on the UPDS documentation workflow.*
