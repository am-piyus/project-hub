# Obsidian Storage Structure

> Stage 4 of the documentation workflow. The storage specification that defines where a
> publication-ready project document lives and how its supporting resources are organized
> inside the Obsidian vault.
>
> Deliverable of Droplet 0.1.2.4 – Obsidian Storage Structure.

## 1. Where This Fits

```
Stage 1 — Droplet 0.1.2.1   Knowledge Extraction Prompt    → Raw Markdown
Stage 2 — Droplet 0.1.2.2   Documentation Refinement Engine → Refined Markdown (PHDS)
Stage 3 — Droplet 0.1.2.3   Manual Refinement Workflow      → Publication-Ready Markdown
Stage 4 — Droplet 0.1.2.4   Obsidian Storage Structure   ◀ THIS DOCUMENT
                                                          → Organized Project Documentation
```

**Input:** Publication-Ready Markdown — a finished document from the
[Manual Refinement Workflow](Manual_Refinement_Workflow.md), with all screenshots, GIFs,
and links in place.

**Output:** Organized Project Documentation — the document and its resources filed into a
consistent, portable, publish-ready folder layout.

## 2. Principles

These carry forward the Bucket 0.1.2 documentation rules:

- **One primary markdown file per project.**
- **Images, GIFs, and files each get a dedicated subfolder.**
- **Demonstrations are GIFs whenever possible.**
- **Obsidian links used wherever they help navigation.**
- **The document stays human-readable without the website.**
- **Self-contained & portable** — a project folder can be moved or zipped and nothing
  breaks, because every resource lives beside the markdown that references it.

## 3. Project Folder Structure

Each project is a single self-contained folder named after the project:

```
Project_Name/
├── Project_Name.md        ← the one primary document (PHDS-structured)
│
├── images/                ← screenshots and still images
│   ├── image_01.png
│   └── image_02.png
│
├── gifs/                  ← animated demonstrations
│   └── demo_01.gif
│
└── files/                 ← supporting resources
    ├── schematic.pdf
    └── firmware.zip
```

| Item | Holds |
| --- | --- |
| `Project_Name.md` | The single primary project document. Same name as the folder. |
| `images/` | Screenshots and still images (`.png`, `.jpg`). |
| `gifs/` | Animated demonstrations (`.gif`). |
| `files/` | Everything else — datasheets, schematics, archives, source bundles. |

## 4. Placement Inside the Repository

Project folders live under `content/`, the published-content root:

```
project-hub/
├── planning/
├── docs/
├── website/
├── content/
│   ├── STM32_LED_Blink/
│   │   ├── STM32_LED_Blink.md
│   │   ├── images/
│   │   │   ├── image_01.png
│   │   │   └── image_02.png
│   │   ├── gifs/
│   │   │   └── demo_01.gif
│   │   └── files/
│   │       ├── STM32CubeMX_Project.ioc
│   │       └── Firmware.zip
│   │
│   ├── MATLAB_PID_Controller/
│   │   ├── MATLAB_PID_Controller.md
│   │   ├── images/
│   │   ├── gifs/
│   │   └── files/
│   └── ...
│
└── README.md
```

- One folder per project, directly under `content/`.
- The folder is the unit the Publishing Engine (Bucket 0.1.5) will render into a page.

## 5. Naming Conventions

| Element | Convention | Example |
| --- | --- | --- |
| Project folder | `PascalCase` or `Snake_Case`, descriptive, no spaces. | `STM32_LED_Blink` |
| Primary markdown | Exactly the folder name + `.md`. | `STM32_LED_Blink.md` |
| Screenshots | `image_NN.png`, zero-padded, in order of appearance. | `image_01.png` |
| GIFs | `demo_NN.gif`, zero-padded, in order of appearance. | `demo_01.gif` |
| Files | Descriptive, lowercase where practical; keep meaningful original names. | `schematic.pdf` |

Rules:

- **No spaces** in folder or resource names — use `_` (avoids broken links and URL issues).
- **Zero-pad** sequence numbers (`01`, `02`) so ordering stays correct past nine items.
- **Folder name = markdown name** so the primary document is unambiguous.

## 6. Resource Storage Conventions

| Resource | Folder | Notes |
| --- | --- | --- |
| Screenshot / still | `images/` | Cropped to the relevant region; captioned in the markdown. |
| Animated demo | `gifs/` | Prefer over a still when the result moves; keep file size reasonable. |
| Datasheet / doc | `files/` | PDFs, references, datasheets. |
| Project / source bundle | `files/` | `.ioc`, `.zip`, source archives, config exports. |

- Every resource referenced by the markdown **must** exist in the correct subfolder.
- No resource lives outside these three subfolders.

## 7. Internal Linking Conventions

Links and embeds use **relative paths** from the project's markdown file, so the folder
stays portable.

| Purpose | Syntax | Example |
| --- | --- | --- |
| Embed image | `![caption](images/<file>)` | `![Wiring](images/image_01.png)` |
| Embed GIF | `![caption](gifs/<file>)` | `![1 Hz blink](gifs/demo_01.gif)` |
| Link a file | `[label](files/<file>)` | `[Schematic (PDF)](files/schematic.pdf)` |
| Link another project | `[[Project_Name]]` (Obsidian wikilink) | `[[MATLAB_PID_Controller]]` |
| External source | `[label](https://…)` | `[STM32 RM0090](https://www.st.com/…)` |

Rules:

- **Resources** are referenced with **relative paths** (`images/…`, `gifs/…`, `files/…`) —
  never absolute paths — so a moved or zipped folder still resolves.
- **Cross-project** links use Obsidian wikilinks `[[…]]`; **external** sources use standard
  markdown links.
- Image and GIF embeds keep the italic caption line beneath them (from the
  [Manual Refinement Workflow](Manual_Refinement_Workflow.md)).

## 8. Storage Checklist

Before a project is considered filed:

- [ ] Project folder created under `content/`, named per the conventions.
- [ ] Primary markdown named exactly `<Folder>.md` and placed at the folder root.
- [ ] `images/`, `gifs/`, `files/` subfolders present (omit a subfolder only if truly unused).
- [ ] Every referenced resource exists in the correct subfolder.
- [ ] All embeds and file links use relative paths and resolve.
- [ ] No spaces in any folder or resource name; sequence numbers zero-padded.
- [ ] The project folder is self-contained — moving it breaks nothing.

When all boxes are checked, the project is **Organized Project Documentation**, ready for
the Publishing Engine (Bucket 0.1.5).

---

*Previous stage: [Manual Refinement Workflow](Manual_Refinement_Workflow.md) (Droplet 0.1.2.3) · This completes Bucket 0.1.2 – Documentation Workflow.*
