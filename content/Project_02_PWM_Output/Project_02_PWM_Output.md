---
title: Project_02_PWM_Output
status: Completed
category: Embedded Systems
date_started: 2026-06-11
date_sealed: 2026-06-11
sources:
  - Claude
ai_systems:
  - Claude
tags:
  - sample
  - STM32
  - PWM
  - timer
  - GPIO
---

# Project_02_PWM_Output

> A second sample project used to verify cross-project navigation in the internal linking
> engine. Demonstrates a wikilink back to [[Sample_Project]].

## Overview

This project exists to prove that Obsidian wikilinks resolve into working website
navigation between project pages. It links back to [[Sample_Project|the first sample]].

## Objectives

- Provide a second project so `[[Project_02_PWM_Output]]` resolves from another document.
- Verify project-to-project navigation in both directions.

## Progress

Authored as a navigation fixture alongside the internal linking engine.

## Decisions

- **Keep the fixture minimal** — only enough PHDS content to render a real, linkable page.

## Problems & Solutions

### Cross-project links must resolve to real routes

- **Problem:** a wikilink is only useful if its target page actually exists.
- **Root Cause:** wikilink targets are validated against discovered project folders.
- **Solution:** this project folder makes `[[Project_02_PWM_Output]]` a valid target.

## Mistakes

Not documented in source conversations.

## Learnings

- A wikilink target resolves only when a matching project folder exists under `content/`.

## Discoveries

Not documented in source conversations.

## Technical Insights

- Wikilinks render at build time, so navigation is plain static HTML with no client JS.

## Design Decisions & Trade-Offs

- **Resolve to `/projects/<Target>`** — matches the project route slug exactly.

## Debugging History

Not documented in source conversations.

## References

- [Obsidian internal links](https://help.obsidian.md/Linking+notes+and+files/Internal+links)

## Future Work

- Once the knowledge library exists (Bucket 0.1.4), extend wikilink resolution to a
  `/knowledge/<Article>` namespace.
