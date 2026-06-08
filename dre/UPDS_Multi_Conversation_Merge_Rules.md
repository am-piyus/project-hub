# UPDS Multi-Conversation Merge Rules

> How the Documentation Refinement Engine combines multiple raw markdown files — possibly
> from different AI systems — into a single, unified project history without duplication or
> contradiction.
>
> Part of Droplet 0.1.2.2 – Documentation Refinement Engine.

## 1. When These Rules Apply

These rules apply whenever **more than one raw file** is loaded into the
[Documentation Refinement Engine](README_DRE.md): several conversations, several AI systems
(ChatGPT + Claude + Gemini), or a conversation plus notes, logs, or forum threads. With a
single raw file, only the [Extraction Rules](UPDS_Extraction_Rules.md) apply.

## 2. Merge Objective

Produce **one unified project history** that reads as though the project were documented
from a single coherent record — even though it was assembled from many raw fragments.

The merged output must:

- Combine all raw files into a unified project history.
- Remove duplicated information.
- Connect related information across sources.
- Resolve conflicting information when possible.
- Preserve the latest understanding.
- Preserve project chronology.
- Preserve discoveries made across conversations.
- Preserve important milestones throughout development.

## 3. Merge Rules

| # | Rule |
| --- | --- |
| MR-1 | Build one timeline. Order events by real chronology, not by which raw file they came from. |
| MR-2 | Deduplicate by meaning, not wording — two differently-phrased statements of the same fact are one entry. |
| MR-3 | On duplication, keep the **most complete** statement; if equally complete, keep the **most recent**. |
| MR-4 | On conflict, prefer the **latest understanding** — later corrections supersede earlier mistakes. |
| MR-5 | Preserve the superseded view as history when it carries a lesson (record under Mistakes / Learnings, not the current state). |
| MR-6 | Never average or blend conflicting technical values — choose one per MR-4 and note the discrepancy if unresolved. |
| MR-7 | Union all discoveries, problems, and references across sources — these accumulate, they do not overwrite. |
| MR-8 | Attribute a fact to its `Source AI` when that origin affects interpretation or when sources disagree. |
| MR-9 | If a conflict cannot be resolved from the sources, keep both and flag with `> [!note] Needs review: conflicting accounts`. |
| MR-10 | Connect related items across files — link a decision to the problem it solved, a learning to the mistake that produced it. |

## 4. Conflict Resolution Order

When two raw files disagree, resolve in this order:

1. **Explicit correction** — a source that explicitly fixes an earlier statement wins.
2. **Chronology** — the later statement reflects newer understanding (MR-4).
3. **Completeness** — the more detailed, specific account wins (MR-3).
4. **Unresolved** — keep both, attribute each, and flag for review (MR-9).

## 5. Latest-Understanding Principle

Projects evolve. An approach tried early and abandoned later must not appear as the
project's conclusion.

- The **current state** of the project reflects the final understanding.
- The **journey** to that state (including the abandoned approach and *why* it was
  abandoned) is preserved under Progress, Mistakes, Decisions, and Learnings.

This keeps the document both correct (current) and instructive (the path).

## 6. Chronology & Milestones

- Reconstruct a single timeline spanning all raw files.
- Mark significant milestones (first working result, major pivots, completion) within
  Progress.
- When exact ordering between sources is unknown, order by best available evidence and
  flag uncertainty rather than asserting a false sequence.

## 7. Worked Example

> **Raw file A (Source AI: ChatGPT, earlier):** "Using a 10 kΩ pull-up on the I²C line."
> **Raw file B (Source AI: Claude, later):** "Switched to 4.7 kΩ pull-ups — 10 kΩ was too
> weak at 400 kHz, caused ACK failures."

**Merged result:**

- *Current state (Decisions / Solutions):* 4.7 kΩ I²C pull-ups.
- *History (Problems → Root Cause → Solution):* 10 kΩ pull-ups caused ACK failures at
  400 kHz → too weak for the bus capacitance → replaced with 4.7 kΩ.
- *Attribution:* retained because the two AI systems disagreed and chronology resolved it.

---

*See also: [README_DRE](README_DRE.md) · [PHDS Template](PHDS_Template.md) · [Extraction Rules](UPDS_Extraction_Rules.md) · [Information Preservation Rules](UPDS_Information_Preservation_Rules.md) · [Output Formatting Rules](UPDS_Output_Formatting_Rules.md)*
