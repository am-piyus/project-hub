# UPDS Information Preservation Rules

> Defines the engineering knowledge that **MUST** survive refinement. Nothing on this list
> may be dropped, flattened into uselessness, or merged away when the Documentation
> Refinement Engine turns raw markdown into a PHDS document.
>
> Part of Droplet 0.1.2.2 – Documentation Refinement Engine.

## 1. Purpose

Refinement reshapes and merges raw extractions. Reshaping is only safe when the
high-value engineering signal is preserved. These rules name that signal explicitly so
the [Documentation Refinement Engine](../README_DRE.md) can be verified against an objective
standard.

## 2. Preservation Priority

| Priority | Meaning | Rule |
| --- | --- | --- |
| **MUST preserve** | Loss makes the documentation incomplete or misleading. | Never remove. Preserve even if uncertain. |
| **SHOULD preserve** | Adds value but is recoverable or secondary. | Keep when present; never invent. |
| **MAY drop** | Conversational noise with no engineering value. | Already stripped at Stage 1; drop any that remains. |

When in doubt, **preserve**. A slightly verbose document is acceptable; a document missing
a root cause or a decision is not.

## 3. Core Information (MUST Preserve)

| Category | What it captures | PHDS section |
| --- | --- | --- |
| **Metadata** | Project name, dates, status, sources, AI systems. | Frontmatter |
| **Objectives** | What the project set out to achieve. | Objectives |
| **Progress** | What was done, in the order it happened. | Progress |
| **Decisions** | Choices made and the reasoning behind each. | Decisions |
| **Problems Encountered** | Concrete issues, blockers, bugs, failures. | Problems & Solutions |
| **Root Causes** | The underlying reason each problem occurred. | Problems & Solutions |
| **Solutions** | How each problem was resolved, including what was tried. | Problems & Solutions |
| **Mistakes** | Errors and approaches that failed. | Mistakes |
| **Learnings** | Generalizable insights, corrected misunderstandings. | Learnings |
| **Discoveries** | New findings, non-obvious behavior, unexpected results. | Discoveries |
| **Technical Insights** | Deep technical understanding worth reusing. | Technical Insights |
| **References** | Links, datasheets, docs, forum threads cited. | References |
| **Future Work** | Open questions, next steps, deferred ideas. | Future Work |

## 4. Engineering Reasoning (MUST Preserve)

Beyond facts, the *thinking* behind the work must survive — this is what makes
documentation reusable rather than a bare log.

| Category | What it captures | PHDS section |
| --- | --- | --- |
| **Engineering Reasoning** | The "why" behind actions — the logic chain. | Decisions / Progress |
| **Debugging History** | Symptoms → hypotheses → tests → resolution. | Debugging History |
| **Design Decisions** | Architectural choices and the constraints behind them. | Design Decisions & Trade-Offs |
| **Important Trade-Offs** | Options weighed, what was sacrificed, and why. | Design Decisions & Trade-Offs |
| **Lessons Learned** | What would be done differently next time. | Learnings |

## 5. Preservation Guarantees

The refinement process **MUST** uphold:

- **No silent loss** — if MUST-preserve information is present in any raw file, it appears
  in the refined output.
- **Chronology preserved** — progress and decisions retain their real order of events.
- **Reasoning intact** — a decision is never recorded without its rationale when the
  rationale is available.
- **Attribution where it matters** — when a fact or discovery comes from a specific raw
  source/AI system, that origin is preserved if it affects interpretation (see
  [Merge Rules](UPDS_Multi_Conversation_Merge_Rules.md)).
- **No fabrication** — `[unclear]` / `[not stated]` markers from Stage 1 are carried
  through, never invented away. See [Extraction Rules](UPDS_Extraction_Rules.md).

## 6. Handling Missing Information

If a MUST-preserve category has no corresponding content across the raw sources:

- Keep the PHDS section heading.
- State `Not documented in source conversations.` beneath it.
- Do **not** delete the section and do **not** fabricate content.

This keeps the PHDS structure stable and makes gaps visible for
[Manual Refinement](../README_DRE.md) (Droplet 0.1.2.3).

---

*See also: [README_DRE](../README_DRE.md) · [PHDS Template](../PHDS_Template.md) · [Extraction Rules](UPDS_Extraction_Rules.md) · [Multi-Conversation Merge Rules](UPDS_Multi_Conversation_Merge_Rules.md) · [Output Formatting Rules](UPDS_Output_Formatting_Rules.md)*
