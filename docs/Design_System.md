# Website Design System

> The visual foundation of Project Hub: visual language, typography, color, layout, and
> the reusable component library that every website page inherits.
>
> Deliverable of Droplet 0.1.4.1 – Website Design System.

## 1. Visual Language

The website communicates **engineering, professionalism, technical depth, learning, and
knowledge sharing**. The design is editorial and content-first — inspired by clean
documentation/blog layouts (e.g. Productive.io's editorial clarity), adapted to
engineering documentation rather than marketing.

**Principles** (from the bucket): content first · documentation first · readability over
decoration · minimal visual noise · professional engineering appearance · fast loading ·
responsive · accessibility friendly · maintainable components.

**Implementation stance:** plain CSS custom properties — no UI framework, no font
downloads, near-zero JavaScript. Design tokens make future theming (including dark mode)
a token swap, not a rewrite.

## 2. Typography System

| Role | Token / value |
| --- | --- |
| Primary family | `--font-sans` — system stack (`-apple-system, Segoe UI, Roboto, …`) — zero load time |
| Code family | `--font-mono` — `ui-monospace, Cascadia Code, Consolas, …` |
| Body | `--text-base` (1rem), line-height `--leading-normal` (1.55) |
| Documentation prose | `.prose` class — line-height `--leading-prose` (1.75) for long-form reading |
| H1 | `--text-3xl` — fluid `clamp(1.875rem … 2.5rem)` |
| H2 | `--text-2xl` (1.75rem); in prose: top-spaced with bottom rule (section separation) |
| H3 / H4 | `--text-xl` (1.375rem) / `--text-lg` (1.125rem) |
| Small / meta | `--text-sm` (0.875rem) |

Documentation typography (`.prose`) covers the full PHDS rendering surface: headings,
lists, **tables** (horizontally scrollable on small screens), **code blocks** (Shiki),
blockquotes, images with caption styling (`img + em` convention from manual refinement).

## 3. Color System

Light mode ships now; tokens are structured so dark mode is a future
`prefers-color-scheme` block (recorded, not implemented).

| Token | Value | Use |
| --- | --- | --- |
| `--color-bg` | `#f8fafc` | Page background |
| `--color-surface` | `#ffffff` | Cards, header, footer |
| `--color-surface-alt` | `#f1f5f9` | Inline code, subtle fills |
| `--color-border` / `-strong` | `#e2e8f0` / `#cbd5e1` | Hairlines / hover borders |
| `--color-text` | `#0f172a` | Primary text |
| `--color-text-secondary` | `#475569` | Supporting text |
| `--color-text-muted` | `#64748b` | Meta, captions |
| `--color-primary` / `-strong` / `-subtle` | `#2563eb` / `#1d4ed8` / `#eff6ff` | Links, accents, callouts |

**Status colors** (project lifecycle, used by `StatusBadge`):

| Status | Text | Background |
| --- | --- | --- |
| Completed | `#16803c` | `#f0fdf4` |
| In Progress | `#b45309` | `#fffbeb` |
| Sealed | `#1d4ed8` | `#eff6ff` |
| Planned (fallback) | `#475569` | `#f1f5f9` |

Text/background pairs maintain WCAG-AA contrast on their surfaces.

## 4. Layout System

| Token | Value | Use |
| --- | --- | --- |
| `--width-content` | 46rem | Long-form documentation measure (reading comfort) |
| `--width-wide` | 72rem | Page container: listings, homepage sections |
| `--space-1 … --space-16` | 0.25–4rem (4px scale) | All spacing |
| `--radius` / `--radius-sm` | 8px / 4px | Cards / chips |
| Breakpoints | 40rem (tablet), 64rem (desktop) | Listing grid: 1 → 2 → 3 columns |

Structure: `BaseLayout` (header → `main` → footer) → `Container`
(`content` | `wide`) → `Section` (vertical rhythm + titled headers) → components.

## 5. Component Library

All components in `website/src/components/`, scoped-styled, zero client JS:

| Component | Purpose | Status |
| --- | --- | --- |
| `SiteHeader` | Navigation bar — brand + primary links (sticky) | Mounted via BaseLayout |
| `SiteFooter` | Footer — identity, GitHub, credits | Mounted via BaseLayout |
| `Container` | Page container (content/wide widths) | In use |
| `Section` | Section container with titled header | In use |
| `ProjectCard` | Project in a listing (title, status, tags, date) | In use (index) |
| `KnowledgeCard` | Knowledge article card | Future-ready (0.1.4.4) |
| `MetadataBlock` | PHDS metadata presentation on project pages | In use |
| `StatusBadge` | Lifecycle status pill (status colors) | In use |
| `Tag` | Topic/technology chip (filter link in 0.1.5) | In use |
| `Callout` | Note/warning block for site pages | Available |
| `Breadcrumb` | Location trail | Defined; wired site-wide in 0.1.4.6 |
| `SearchBox` | Search input | Future-ready; mounted in 0.1.5 |

Layouts: `BaseLayout.astro` (HTML shell, SEO meta, skip link, header/footer) and
`ProjectLayout.astro` (project page: back link, title, `MetadataBlock`, `.prose` body).

## 6. Responsive & Accessibility

- Mobile-first; listing grid scales 1 → 2 → 3 columns at 40rem/64rem.
- Prose tables scroll horizontally instead of breaking layout on small screens.
- Semantic landmarks (`header`/`nav`/`main`/`footer`), skip-to-content link,
  `:focus-visible` outlines, `aria-label`ed navigation, `aria-current` breadcrumbs.
- No animation beyond a subtle card border transition; no decorative elements.

## 7. Boundaries & Future Notes

- **Markdown callouts** (`> [!note]`) render as styled blockquotes; transforming them
  into the `Callout` component is a recorded publishing-engine re-entry point
  ([Publishing Build Verification §6](Publishing_Build_Verification.md)).
- **Dark mode** — token architecture is ready; shipping it is a future enhancement.
- **Navigation system** (active states, breadcrumb wiring, responsive menu, footer
  columns) is Droplet 0.1.4.6; this droplet defines the styled components it composes.
- Header "Projects" links to the index listing anchor until the dedicated `/projects`
  route ships (Droplet 0.1.4.3).

---

*See also: [Vision Log](Project_Hub_Vision_Log.md) · [Publishing Technology Selection](Publishing_Technology_Selection.md) · [Architecture](Architecture.md)*
