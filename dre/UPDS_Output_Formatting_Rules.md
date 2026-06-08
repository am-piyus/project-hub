# UPDS Output Formatting Rules

> The formatting conventions the Documentation Refinement Engine applies to a PHDS
> document, plus the validation checklist every refined document must pass before it is
> considered done.
>
> Part of Droplet 0.1.2.2 – Documentation Refinement Engine.

## 1. Output Contract

The refined output **MUST**:

- Be valid markdown.
- Follow the [PHDS Template](PHDS_Template.md) structure exactly.
- Be directly pasteable into Obsidian with no restructuring.
- Require only minimal manual refinement (adding screenshots, GIFs, links).
- Be suitable for future website publishing.
- Be understandable **without** the original conversations or raw files.

> **Structure vs. formatting.** The [PHDS Template](PHDS_Template.md) defines *which
> sections* exist and *in what order*. This document defines *how the content inside them
> is formatted*.

## 2. Formatting Conventions

| Rule | Detail |
| --- | --- |
| Headings | `##` for PHDS sections, `###` for entries within a section (e.g. each problem). |
| Lists | `-` for unordered; numbered lists only for true sequences. |
| Code | Fenced blocks with a language hint; inline backticks for identifiers, commands, values. |
| Technical values | Preserved exactly — units, versions, parameters, error text verbatim. |
| Emphasis | `**bold**` for labels (Problem / Root Cause / Solution, decision names); avoid decorative styling. |
| Callouts | `> [!note] Needs review: ...` marks uncertainty or unresolved conflicts. |
| Markers | Carry `[unclear]` / `[not stated]` from raw files through unchanged. |
| Links | Standard markdown links in References; Obsidian `[[wikilinks]]` are added later during manual refinement. |
| Missing data | `Not documented in source conversations.` under the kept heading. |

## 3. Problem → Root Cause → Solution Format

Each entry under **Problems & Solutions** uses this block so the chain is never broken:

```markdown
### <short problem title>

- **Problem:** <what went wrong, with symptoms>
- **Root Cause:** <the underlying reason>
- **Solution:** <how it was resolved, including what was tried>
```

## 4. Empty Sections

- Keep every PHDS section heading even when no content exists.
- Place `Not documented in source conversations.` beneath empty MUST-preserve sections.
- This keeps documents structurally identical and makes gaps visible during manual
  refinement.

## 5. Validation Checklist

Every refined document must pass this checklist before delivery. The
[Documentation Refinement Engine](README_DRE.md) runs it as a final self-check.

### 5.1 Structure

- [ ] Output is valid markdown.
- [ ] YAML frontmatter is present and complete.
- [ ] All PHDS sections are present and in the template's order.
- [ ] No section was reordered, renamed, or silently dropped.

### 5.2 Preservation

- [ ] Every MUST-preserve category is represented or explicitly marked as missing.
- [ ] Engineering reasoning accompanies decisions and outcomes.
- [ ] Chronology of progress and decisions is intact.
- [ ] Technical values are reproduced exactly.
- [ ] No information was fabricated; `[unclear]` / `[not stated]` markers were carried through.

### 5.3 Merge

- [ ] Duplicates are merged to the most complete / most recent version.
- [ ] Conflicts are resolved per the [Merge Rules](UPDS_Multi_Conversation_Merge_Rules.md), or flagged.
- [ ] Related information across sources is connected.
- [ ] Multiple raw files read as one unified history.

### 5.4 Usability

- [ ] Document is understandable without the original conversations or raw files.
- [ ] Pasteable into Obsidian with no restructuring.
- [ ] Only screenshots / GIFs / links remain for manual refinement.
- [ ] Suitable for future website publishing.

---

*See also: [README_DRE](README_DRE.md) · [PHDS Template](PHDS_Template.md) · [Extraction Rules](UPDS_Extraction_Rules.md) · [Information Preservation Rules](UPDS_Information_Preservation_Rules.md) · [Multi-Conversation Merge Rules](UPDS_Multi_Conversation_Merge_Rules.md)*
