# UPDS Extraction Rules

> The specification that governs how the Documentation Refinement Engine lifts knowledge
> out of raw markdown and organizes it into a PHDS document. Defines what refinement does,
> what it must not do, and what it strips away.
>
> Part of Droplet 0.1.2.2 – Documentation Refinement Engine.

## 1. Scope

These rules apply whenever the [Documentation Refinement Engine](../README_DRE.md) processes
raw markdown produced by Stage 1
([Knowledge Extraction Prompt](../../prompts/Knowledge_Extraction_Prompt.md)). They define the
*behavior* of refinement. Companion specifications cover what to keep
([Preservation Rules](UPDS_Information_Preservation_Rules.md)), how to combine sources
([Merge Rules](UPDS_Multi_Conversation_Merge_Rules.md)), and how to format the result
([Output Formatting Rules](UPDS_Output_Formatting_Rules.md)). The target shape is the
[PHDS Template](../PHDS_Template.md).

## 2. Supported Inputs

The engine accepts, individually or in combination, raw markdown extracted from:

- ChatGPT conversations
- Claude conversations
- Gemini conversations
- Forum discussions
- Personal notes
- Project logs
- Development records
- Documentation references
- Screenshots and observations

Raw files may originate from **different AI systems** and may be provided **one or many**
at a time. The engine must not assume a single source or a single AI.

## 3. Refinement Goals

Each refinement run must:

- Read all provided raw files in full before producing output.
- Lift the project knowledge out of the raw notes.
- Drop any conversational noise that survived Stage 1 (see [Removal Rules](#5-information-removal-rules)).
- Preserve everything required by the [Preservation Rules](UPDS_Information_Preservation_Rules.md).
- Merge multiple sources per the [Merge Rules](UPDS_Multi_Conversation_Merge_Rules.md).
- Produce a single, coherent document in the [PHDS](../PHDS_Template.md) structure.

## 4. Refinement Rules

| # | Rule |
| --- | --- |
| RR-1 | Read every raw file completely before writing any output. |
| RR-2 | Refine meaning into documentation prose; do not paste raw notes verbatim. |
| RR-3 | Never fabricate. Carry `[unclear]` / `[not stated]` markers through; do not infer facts that were not stated. |
| RR-4 | Preserve technical specifics exactly — numbers, units, parameters, versions, commands, error messages, identifiers, and code blocks. |
| RR-5 | Preserve chronological order of progress and decisions across all sources. |
| RR-6 | Attribute a fact to its source/AI system when the origin affects how it should be read. |
| RR-7 | Keep engineering reasoning attached to its outcome — record *why*, not only *what*. |
| RR-8 | Consolidate references into the References section; keep links intact. |
| RR-9 | Express each distinct problem as a Problem → Root Cause → Solution block. |
| RR-10 | When raw sources conflict, follow the [Merge Rules](UPDS_Multi_Conversation_Merge_Rules.md); never silently pick one. |
| RR-11 | Organize all output strictly into the [PHDS Template](../PHDS_Template.md); keep every section. |
| RR-12 | Output valid markdown only — no commentary, no meta-explanation of the refinement itself. |

## 5. Information Removal Rules

Stage 1 strips most noise, but the engine **SHOULD** remove anything that slipped through
and carries no engineering value:

| Remove | Examples |
| --- | --- |
| **Greetings** | "Hi", "Hello", "Thanks!", sign-offs. |
| **Small talk** | Off-topic chatter unrelated to the project. |
| **Repeated explanations** | The same concept re-stated — keep the clearest single version. |
| **Duplicate discussions** | Re-treading ground already covered within or across raw files. |
| **Unrelated topics** | Tangents that do not concern the project. |
| **Conversation filler** | Model disclaimers, prompt echoes, "let me think…". |

### 5.1 Removal Safeguards

- Removal is **secondary**. When a passage mixes filler with signal, keep the signal.
- Never remove anything on the
  [Preservation list](UPDS_Information_Preservation_Rules.md) to make the document shorter.
- Deduplication keeps the **most complete and most recent** version of a statement (see
  [Merge Rules](UPDS_Multi_Conversation_Merge_Rules.md)).

## 6. Refinement Workflow

```
Provide raw file(s)
   ↓
Read all raw files fully (RR-1)
   ↓
Identify project knowledge (Preservation Rules)
   ↓
Drop residual noise (Removal Rules)
   ↓
Merge & deduplicate across sources (Merge Rules)
   ↓
Organize into PHDS structure (PHDS Template)
   ↓
Apply formatting (Output Formatting Rules)
   ↓
Self-validate (Output Formatting → Validation Checklist)
   ↓
Refined PHDS markdown
```

## 7. Non-Goals

- The engine does **not** re-read original conversations — it refines Stage 1 raw output.
- The engine does **not** insert screenshots, GIFs, or Obsidian links — that is
  [Manual Refinement](../README_DRE.md) (Droplet 0.1.2.3).
- The engine does **not** publish — that is the Publishing Engine (Bucket 0.1.5).

---

*See also: [README_DRE](../README_DRE.md) · [PHDS Template](../PHDS_Template.md) · [Information Preservation Rules](UPDS_Information_Preservation_Rules.md) · [Multi-Conversation Merge Rules](UPDS_Multi_Conversation_Merge_Rules.md) · [Output Formatting Rules](UPDS_Output_Formatting_Rules.md)*
