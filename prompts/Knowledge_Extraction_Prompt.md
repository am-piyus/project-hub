# Knowledge Extraction Prompt

> Stage 1 of the documentation workflow. A portable prompt that extracts **raw** project
> knowledge from any AI conversation and emits structured raw markdown — the input for the
> Documentation Refinement Engine.
>
> Deliverable of Droplet 0.1.2.1 – Raw Knowledge Extraction Prompt.

## Where This Fits

```
Project Conversation(s)          ← any AI: ChatGPT, Claude, Gemini, …
        ↓
Knowledge_Extraction_Prompt.md   ← THIS prompt (Stage 1 — raw extraction)
        ↓
Raw Markdown                     ← one raw file per conversation
        ↓
Documentation Refinement Engine  ← Stage 2 (Droplet 0.1.2.2): merge + structure → PHDS
        ↓
Refined Markdown                 → Manual Refinement (Droplet 0.1.2.3)
```

This prompt does **one job**: pull the real engineering knowledge out of a single
conversation and write it down as clean, structured raw markdown. It does **not** merge
multiple conversations, apply the final Project Hub template, or polish — that is the
[Documentation Refinement Engine](../dre/README_DRE.md)'s job.

## How to Use

1. Seal the project (the work is complete enough to document).
2. Copy the **full prompt** from "The Prompt" below.
3. Paste it into the AI that holds the conversation (ChatGPT, Claude, Gemini, …).
4. Run it against that conversation.
5. Save the output as a raw markdown file (e.g. `raw_<project>_<ai>.md`).
6. Repeat for every conversation that touched the project.
7. Hand all raw files to the **Documentation Refinement Engine** (Stage 2).

> **One conversation → one raw file.** When several conversations or AI systems were used,
> run this prompt once per conversation and collect the raw outputs. Merging happens later.

---

## The Prompt

```text
You are a Raw Knowledge Extraction Engine — Stage 1 of a documentation pipeline.

Your job: read the project conversation below and extract the real engineering knowledge
into clean, structured RAW markdown. This output is an intermediate artifact that a later
refinement stage will merge and reformat — so be faithful and complete, not polished.

== READ FIRST ==
Read the entire conversation before writing anything. The conversation may include code,
errors, datasheets, forum quotes, notes, and screenshot descriptions mixed with chat.

== EXTRACT (keep all of this) ==
- Objectives and goals
- What was actually done, in the order it happened (progress / chronology)
- Decisions made AND the reasoning behind them
- Problems encountered, their root causes, and how they were solved
- Mistakes and failed approaches (and what they revealed)
- Learnings, discoveries, and non-obvious findings
- Technical insights worth reusing
- Trade-offs weighed and design decisions
- Debugging steps (symptom → hypothesis → test → result)
- References: links, datasheets, docs, threads
- Future work / open questions
Preserve technical values EXACTLY — numbers, units, versions, parameters, commands, and
error messages verbatim. Keep code blocks intact.

== REMOVE (noise only) ==
Greetings, small talk, model disclaimers, "let me think…", prompt echoes, repeated
explanations, and unrelated tangents. When a passage mixes filler with real content, keep
the real content.

== RULES ==
- Extract MEANING into notes; do not paste the chat turn-by-turn.
- NEVER invent facts. If something is unclear or missing, write it plainly as
  "[unclear]" or "[not stated]" — do not guess.
- Do not merge with other conversations and do not apply any final template — this is raw.
- Mark the source so the refinement stage can track origin (see header below).
- Output VALID MARKDOWN ONLY. No meta-commentary about the extraction.

== OUTPUT FORMAT (raw, flexible headings) ==
Begin with this header, then organize the extracted knowledge under clear headings.
Keep headings descriptive; they do not need to match a fixed template at this stage.

# Raw Extraction: <Project Name>

- **Source AI:** <ChatGPT | Claude | Gemini | other>
- **Conversation scope:** <one line on what this conversation covered>
- **Extracted:** raw — pending refinement

## Objectives
## What Was Done (chronological)
## Decisions & Reasoning
## Problems, Root Causes & Solutions
## Mistakes & Failed Approaches
## Learnings & Discoveries
## Technical Insights
## Trade-offs & Design Decisions
## Debugging Notes
## References
## Future Work / Open Questions

Now extract the conversation that follows.
```

---

## Notes for the Author

- **Raw, not final** — expect rough edges. The refinement engine fixes structure,
  deduplicates, and applies the [PHDS template](../dre/PHDS_Template.md). Don't hand-polish
  here.
- **Mark the source** — keeping `Source AI:` in each raw file lets the refinement engine
  attribute conflicts when it merges several conversations.
- **Portable** — the prompt is self-contained text; it runs in any AI chat with no setup.
- **`[unclear]` / `[not stated]`** — these markers survive into refinement so gaps stay
  visible instead of being silently filled.

---

*Next stage: [Documentation Refinement Engine](../dre/README_DRE.md) (Droplet 0.1.2.2)*
