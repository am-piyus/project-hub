# Project Hub

> A documentation publishing platform that transforms engineering project knowledge into structured, reusable, and publicly accessible documentation.

**Version:** 0.1 (Prototype) · **Constellation:** am-piyus · **Status:** Planned

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
├── website       # Static site generator and templates
├── assets        # Images, attachments, embedded resources
├── content       # Published markdown content sourced from Obsidian
└── README.md
```

## Documentation

| Document | Purpose |
| --- | --- |
| [Vision](docs/Vision.md) | Product purpose, problem, and long-term vision |
| [Product Requirements](docs/ProductRequirements.md) | Scope, features, and V0.1 boundaries |
| [Architecture](docs/Architecture.md) | System components, content flow, storage |
| [Roadmap](docs/Roadmap.md) | Success criteria and future direction |

## Links

- **GitHub:** https://github.com/am-piyus/project-hub
- **Documentation Vault:** [Obsidian (Google Drive)](https://drive.google.com/drive/u/1/folders/1GJY7ITM6PYLhC04LXl2RhTBxvtWxLcPf)

---

*Project Hub · Orbit 0.1 · Built on the UPDS documentation workflow.*
