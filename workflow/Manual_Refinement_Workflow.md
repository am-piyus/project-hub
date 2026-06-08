# Manual Refinement Workflow

> Stage 3 of the documentation workflow. The human pass that enriches a refined PHDS
> document with screenshots, GIFs, links, and references, then signs it off as
> publication-ready.
>
> Deliverable of Droplet 0.1.2.3 – Manual Refinement Workflow.

## 1. Where This Fits

```
Stage 1 — Droplet 0.1.2.1   Knowledge Extraction Prompt   → Raw Markdown
Stage 2 — Droplet 0.1.2.2   Documentation Refinement Engine → Refined Markdown (PHDS)
Stage 3 — Droplet 0.1.2.3   Manual Refinement Workflow  ◀ THIS DOCUMENT
                                                          → Publication-Ready Markdown
Stage 4 — Droplet 0.1.2.4   Obsidian Storage Structure   → stored & ready to publish
```

**Input:** Refined Markdown — one PHDS-structured document from the
[Documentation Refinement Engine](../dre/README_DRE.md).

**Output:** Publication-Ready Markdown — the same document with all supporting resources
attached and every link resolved, ready for [Obsidian storage](../dre/README_DRE.md)
(Droplet 0.1.2.4) and future publishing.

## 2. Why a Manual Stage

The DRE deliberately stops at text. It never invents screenshots, never guesses which
demo to record, and never fabricates links. Those decisions need a human who was there.
This stage is where judgement is applied — what to show, what to link, what to cite — so
the document becomes genuinely useful to a future reader.

The refined document arrives with `> [!note] Needs review:` callouts and
`[unclear]` / `[not stated]` markers left by earlier stages. Resolving these is part of
the job.

## 3. Refinement Checklist (order of operations)

Work top to bottom; each pass builds on the last.

1. [Screenshot insertion](#4-screenshot-insertion)
2. [GIF insertion](#5-gif-insertion)
3. [External link insertion](#6-external-link-insertion)
4. [Internal Obsidian link insertion](#7-internal-obsidian-link-insertion)
5. [Reference insertion](#8-reference-insertion)
6. [Final review](#9-final-review)

> **Resource folders.** Screenshots, GIFs, and files live in per-project folders
> (`images/`, `gifs/`, `files/`) alongside the project's markdown. The exact structure and
> naming are formally defined in **Droplet 0.1.2.4 – Obsidian Storage Structure**; this
> workflow uses those folders as its destination.

## 4. Screenshot Insertion

For visual evidence — wiring, schematics, terminal output, UI states, results.

| Step | Action |
| --- | --- |
| Capture | Take the screenshot at the moment it best explains the point. |
| Crop | Trim to the relevant region; remove unrelated desktop clutter. |
| Name | `image_NN.png` (zero-padded, ordered) in the project's `images/` folder. |
| Place | Insert directly beneath the sentence or step it illustrates. |
| Caption | Add a one-line italic caption stating what the reader is looking at. |

```markdown
![Logic analyzer showing the corrected 4.7 kΩ I²C ACK](images/image_03.png)
*I²C bus after the pull-up fix — clean ACK at 400 kHz.*
```

- Prefer a screenshot over a long textual description of a visual result.
- Replace any `[screenshot needed]` placeholder the earlier stages may have left.

## 5. GIF Insertion

For anything that moves — demos, blink sequences, animations, before/after behavior.

| Step | Action |
| --- | --- |
| Record | Capture the shortest loop that proves the behavior. |
| Trim | Keep it tight; drop dead frames at start and end. |
| Optimize | Keep file size reasonable so it loads on the website. |
| Name | `demo_NN.gif` in the project's `gifs/` folder. |
| Place | Insert near the milestone or result it demonstrates. |

```markdown
![LED blink at 1 Hz after timer fix](gifs/demo_01.gif)
*Working 1 Hz blink driven by the reconfigured TIM2 prescaler.*
```

- **Demonstrations should be GIFs whenever possible** (per the Bucket 0.1.2 documentation
  rules) — a moving result is worth more than a still.

## 6. External Link Insertion

For sources outside the vault — datasheets, docs, forum threads, repos, articles.

| Step | Action |
| --- | --- |
| Identify | Find each external resource that was actually used or cited. |
| Link | Use descriptive markdown link text — never a bare URL. |
| Verify | Confirm the link resolves before saving. |
| Place | Inline at the point of mention, and collected under **References**. |

```markdown
The fix follows the [I²C pull-up sizing guidance](https://www.ti.com/lit/an/slva689/slva689.pdf).
```

- Link text describes the destination (`[STM32 reference manual]`), not "click here".

## 7. Internal Obsidian Link Insertion

For connections inside the vault — related projects, shared concepts, prior learnings.

| Step | Action |
| --- | --- |
| Find relations | Identify other notes/projects this document connects to. |
| Link | Use Obsidian wikilinks: `[[Related Note]]` or `[[Note\|alias]]`. |
| Be deliberate | Link where it genuinely helps navigation — avoid link spam. |
| Place | Inline where the relationship is mentioned. |

```markdown
This reuses the timer setup from [[STM32 Timer Basics]].
```

- Internal links are added **here**, not by the DRE — the engine leaves text clean so the
  author controls the vault graph.

## 8. Reference Insertion

Consolidate every source into the document's **References** section.

| Step | Action |
| --- | --- |
| Collect | Gather all external links and cited sources used in the project. |
| Format | One markdown link per line under the **References** heading. |
| Order | Group logically (datasheets, docs, threads) or by order of use. |
| Deduplicate | One entry per unique source. |

```markdown
## References
- [STM32F4 Reference Manual (RM0090)](https://www.st.com/resource/en/reference_manual/rm0090.pdf)
- [TI — I²C pull-up resistor calculation (SLVA689)](https://www.ti.com/lit/an/slva689/slva689.pdf)
```

## 9. Final Review

The sign-off pass. The document is **not** publication-ready until every box is checked.

### 9.1 Content

- [ ] Every `> [!note] Needs review:` callout is resolved or consciously kept.
- [ ] Every `[unclear]` / `[not stated]` marker is resolved or explicitly accepted.
- [ ] All PHDS sections still present and in order (refinement added resources, not gaps).
- [ ] Technical values are correct and unchanged.

### 9.2 Resources

- [ ] Screenshots inserted, cropped, named, and captioned.
- [ ] GIFs inserted for dynamic results, named and captioned.
- [ ] All images/GIFs reference the correct project folder paths and render.

### 9.3 Links

- [ ] External links use descriptive text and resolve.
- [ ] Internal Obsidian wikilinks resolve to real notes.
- [ ] References section is complete and deduplicated.

### 9.4 Readability

- [ ] Document reads clearly start to finish without the original conversations.
- [ ] Human-readable without the website.
- [ ] No leftover placeholders or editing notes.

When all boxes are checked, the document is **Publication-Ready Markdown** and proceeds to
**Droplet 0.1.2.4 – Obsidian Storage Structure**.

---

*Previous stage: [Documentation Refinement Engine](../dre/README_DRE.md) (Droplet 0.1.2.2) · Next stage: Obsidian Storage Structure (Droplet 0.1.2.4)*
