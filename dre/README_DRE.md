# Documentation Refinement Engine (DRE)

> Stage 2 of the documentation workflow. A dedicated AI workspace that turns **raw**
> extracted markdown into a single **refined** document organized to the Project Hub
> Documentation Standard (PHDS).
>
> Deliverable of Droplet 0.1.2.2 – Documentation Refinement Engine.

## 1. What the DRE Is

The DRE is not a script — it is a **configured AI workspace** (a Claude Project, a custom
GPT, or any assistant you can attach files to). You configure it once with the files in
this folder, then feed it the raw markdown produced by Stage 1.

Its single responsibility: take one or more raw extraction files and produce **one clean,
merged, PHDS-structured document** ready for manual refinement.

## 2. Where It Fits

```
Stage 1 — Droplet 0.1.2.1
  Project Conversation(s)
        ↓  Knowledge_Extraction_Prompt.md
  Raw Markdown (one file per conversation)
        ↓
Stage 2 — Droplet 0.1.2.2  ◀ THIS WORKSPACE
  Documentation Refinement Engine
        ↓  merge · connect · organize · format
  Refined Markdown (one document, PHDS-structured)
        ↓
Stage 3 — Droplet 0.1.2.3
  Manual Refinement (screenshots, GIFs, links)
```

## 3. Workspace Configuration

Attach **all** of the following files to the AI workspace as its knowledge base:

| File | Role |
| --- | --- |
| [README_DRE.md](README_DRE.md) | This guide — how the workspace operates. |
| [PHDS_Template.md](PHDS_Template.md) | The target structure every refined document must follow. |
| [UPDS_Extraction_Rules.md](rules_DRE/UPDS_Extraction_Rules.md) | What the engine keeps, lifts, and strips while refining. |
| [UPDS_Information_Preservation_Rules.md](rules_DRE/UPDS_Information_Preservation_Rules.md) | The knowledge that must never be lost. |
| [UPDS_Multi_Conversation_Merge_Rules.md](rules_DRE/UPDS_Multi_Conversation_Merge_Rules.md) | How to merge several raw files into one history. |
| [UPDS_Output_Formatting_Rules.md](rules_DRE/UPDS_Output_Formatting_Rules.md) | Formatting conventions and the validation checklist. |

> **PHDS vs. UPDS.** **PHDS** (`PHDS_Template.md`) is the *target document structure* —
> the shape of the output. The **UPDS** rule files are the *operating rules* the engine
> applies to reach that shape (what to preserve, how to merge, how to format).

## 4. Inputs and Output

**Inputs** — one or more raw markdown files from Stage 1. Each is expected to carry a
`Source AI:` line so origins can be tracked.

**Output** — a single refined markdown document that:

- Merges all inputs into one unified project history.
- Connects related information across the sources.
- Follows the [PHDS template](PHDS_Template.md) exactly.
- Preserves all required knowledge ([Preservation Rules](rules_DRE/UPDS_Information_Preservation_Rules.md)).
- Is ready for manual refinement — only screenshots, GIFs, and links remain to add.

## 5. Operating Procedure

1. **Load** every raw file into the workspace.
2. **Analyze** all sources together before writing — build a mental timeline.
3. **Merge** duplicates and resolve conflicts per the
   [Merge Rules](rules_DRE/UPDS_Multi_Conversation_Merge_Rules.md).
4. **Connect** related items (a decision to the problem it solved, a learning to the
   mistake that produced it).
5. **Organize** everything into the [PHDS template](PHDS_Template.md) sections.
6. **Format** per the [Output Formatting Rules](rules_DRE/UPDS_Output_Formatting_Rules.md).
7. **Validate** against the checklist in the Output Formatting Rules before delivering.

## 6. Master Instruction (paste into the workspace)

```text
You are the Documentation Refinement Engine (Stage 2). You are configured with PHDS_Template.md
and the four UPDS rule files. Inputs are one or more RAW markdown files from Stage 1; each has
a "Source AI:" line.

Do this:
1. Read every raw file fully before writing.
2. Merge them into ONE unified project history using UPDS_Multi_Conversation_Merge_Rules:
   build a single timeline, deduplicate by meaning (keep the most complete / most recent),
   resolve conflicts to the latest understanding, preserve superseded views as history,
   and attribute facts to their Source AI when sources disagree.
3. Connect related information — link decisions to the problems they solved and learnings
   to the mistakes that produced them.
4. Preserve everything required by UPDS_Information_Preservation_Rules. Never fabricate;
   carry "[unclear]" / "[not stated]" markers through. Keep technical values exact.
5. Organize the result strictly into the PHDS_Template structure.
6. Format per UPDS_Output_Formatting_Rules and run its Validation Checklist as a final
   self-check (do not print the checklist).
Output VALID MARKDOWN ONLY: a single refined PHDS document. No commentary.
```

## 7. Boundaries

- The DRE does **not** attach images, GIFs, or insert Obsidian links — that is Manual
  Refinement (Droplet 0.1.2.3).
- The DRE does **not** publish — that is the Publishing Engine (Bucket 0.1.5).
- The DRE does **not** re-extract from conversations — it only refines Stage 1 output.

---

*Previous stage: [Knowledge Extraction Prompt](../prompts/Knowledge_Extraction_Prompt.md) (Droplet 0.1.2.1) · Next stage: Manual Refinement (Droplet 0.1.2.3)*
