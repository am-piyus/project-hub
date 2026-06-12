---
title: Sample Project
status: Completed
category: Documentation Systems
date_started: 2026-06-08
date_sealed: 2026-06-08
sources: [claude]
ai_systems: [Claude]
tags: [sample, project-hub, pipeline]
---

# Sample Project

> A placeholder project that verifies the Project Hub markdown rendering pipeline. Safe to
> delete once real project documentation is published.

## Overview

This page proves the publishing engine can discover a project folder under `content/`,
parse its PHDS markdown, and render it as a routed webpage at `/projects/Sample_Project`.

![Sample image](images/sample_01.png)
*A 1×1 PNG from `images/` — verifies image resource resolution.*

![Sample demo](gifs/sample_demo.gif)
*A GIF from `gifs/` — verifies animated-resource resolution.*

Download the [sample notes](files/sample_notes.txt) — verifies downloadable files from `files/`.

## Objectives

- Verify markdown discovery from `content/`.
- Verify markdown-to-HTML rendering.
- Verify project route generation.

## Progress

The Astro pipeline loads this file through a content-layer `glob()` loader and renders it
via the project route template.

## Decisions

- **Content-layer glob loader** — keeps `content/` as the single source of truth without
  copying files into the Astro app.

## Problems & Solutions

### Content lives outside the Astro project

- **Problem:** project markdown is in the repo-root `content/`, not inside `website/src/`.
- **Root Cause:** content is the source of truth and must stay portable for Obsidian.
- **Solution:** Astro's `glob()` loader reads from `base: '../content'`.

## Mistakes

Not documented in source conversations.

## Learnings

- Astro content collections can ingest markdown from any directory via the content layer.

## Discoveries

Not documented in source conversations.

## Technical Insights

GitHub-flavored markdown renders out of the box — including tables:

| Capability | This droplet |
| --- | --- |
| Markdown rendering | ✅ |
| Resource processing | later (0.1.3.3) |
| Wikilink resolution | later (0.1.3.4) |

## Design Decisions & Trade-Offs

- **Folder-name routing** — the project folder name becomes the page slug for clean URLs.

## Debugging History

Not documented in source conversations.

## References

- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)

## Future Work

- Resource processing, wikilink resolution, metadata/URL generation, and search arrive in
  later droplets of Bucket 0.1.3 and Bucket 0.1.5.
- Continue with [[Project_02_PWM_Output|the PWM output project]] for cross-project
  navigation. See also [[Project_02_PWM_Output]].
