# PHDS — Project Hub Documentation Standard

> The target structure for every refined project document. The Documentation Refinement
> Engine organizes raw extracted knowledge into exactly this shape.
>
> Part of Droplet 0.1.2.2 – Documentation Refinement Engine.

## 1. Purpose

PHDS defines the canonical structure of a Project Hub documentation file. One standard
shape means every project reads consistently, refinement is mechanical rather than
creative, and the Publishing Engine can render documents predictably.

The Documentation Refinement Engine MUST emit documents that conform to this template.
The [Output Formatting Rules](rules_DRE/UPDS_Output_Formatting_Rules.md) govern the formatting
details; this file defines the **sections and their order**.

## 2. The Template

Copy this structure verbatim. Keep every section heading even when a section is empty.

```markdown
---
title: <Project Name>
status: <Planned | In Progress | Sealed | Completed>
date_started: <YYYY-MM-DD or "unknown">
date_sealed: <YYYY-MM-DD or "unknown">
sources: [<chatgpt, claude, gemini, forum, notes, ...>]
ai_systems: [<ChatGPT, Claude, Gemini, ...>]
tags: [<project, domain, technology, ...>]
---

# <Project Name>

> One-paragraph summary: what the project is and what was achieved.

## Overview
<2–4 sentences of context: the goal and the outcome in plain language.>

## Objectives
- <goal 1>
- <goal 2>

## Progress
<Chronological account of what was done.>

## Decisions
- **<decision>** — <reasoning behind it>

## Problems & Solutions

### <problem title>
- **Problem:** <what went wrong, with symptoms>
- **Root Cause:** <the underlying reason>
- **Solution:** <how it was resolved, including what was tried>

## Mistakes
- <mistake or failed approach, and what it taught>

## Learnings
- <generalizable knowledge gained>

## Discoveries
- <new or non-obvious finding>

## Technical Insights
- <reusable deep technical understanding>

## Design Decisions & Trade-Offs
- **<choice>** — <options weighed, what was sacrificed, why>

## Debugging History
- <symptom → hypothesis → test → resolution>

## References
- [<label>](<url>)

## Future Work
- <open question or next step>
```

## 3. Section Reference

| Section | Required | Content |
| --- | --- | --- |
| Frontmatter | Yes | YAML metadata — title, status, dates, sources, AI systems, tags. |
| Summary | Yes | Blockquote, project at a glance. |
| Overview | Yes | Short context paragraph. |
| Objectives | Yes | Goals and intended outcomes. |
| Progress | Yes | Chronological account of work. |
| Decisions | Yes | Choices with rationale. |
| Problems & Solutions | Yes | Problem → Root Cause → Solution blocks. |
| Mistakes | Yes | Errors and failed approaches. |
| Learnings | Yes | Generalizable knowledge. |
| Discoveries | Yes | New / non-obvious findings. |
| Technical Insights | Yes | Reusable technical understanding. |
| Design Decisions & Trade-Offs | Yes | Architectural choices and what was weighed. |
| Debugging History | Yes | Investigation narratives. |
| References | Yes | Links and sources. |
| Future Work | Yes | Open questions and next steps. |

## 4. Rules

- **All sections present, always.** Empty sections keep their heading and state
  `Not documented in source conversations.` beneath them.
- **Fixed order.** Sections appear in the order above; never reorder or rename.
- **Frontmatter first.** The YAML block opens every document.
- **One project, one document.** A single PHDS file per project (per the Bucket 0.1.2
  documentation rules).
- **Human-readable standalone.** The document must make sense without the website and
  without the original conversations.

---

*See also: [README_DRE](README_DRE.md) · [Output Formatting Rules](rules_DRE/UPDS_Output_Formatting_Rules.md) · [Information Preservation Rules](rules_DRE/UPDS_Information_Preservation_Rules.md)*
