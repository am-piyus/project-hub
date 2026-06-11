# Project Hub — Vision Log

> Raw thoughts, philosophy, and long-term direction. This document is deliberately less
> formal than the architecture documents. It preserves **why** — the reasoning and intent
> behind Project Hub — so future sessions (human or AI) understand where this is going,
> not just what currently exists.
>
> Rule of this file: ideas are **recorded here, not automatically implemented**. The
> Orbit → Bucket → Droplet workflow remains the only execution authority.

---

## 1. Why Project Hub Exists

Engineering learning today actually happens inside conversations — ChatGPT, Claude,
Gemini — plus forums, datasheets, screenshots, and late-night debugging sessions. The
knowledge produced there is real and hard-won, and then it evaporates. Conversations
scroll away. Screenshots get lost. The reasoning that solved a problem is never written
anywhere.

Project Hub exists to stop that loss.

It is not a blog platform. It is not a notes app. It is a **knowledge preservation and
publishing system** for the way engineers actually learn now: by building things with AI
assistance, failing, investigating, and fixing.

**V0.1 is a boilerplate of the whole ecosystem.** Everything built so far — the
extraction prompt, the DRE, the PHDS standard, the publishing engine — is the smallest
end-to-end skeleton that validates the idea. The real product is much larger. Every
bucket from here on should be implemented with that expansion in mind.

## 2. Knowledge Preservation Philosophy

The purpose is not simply to save information. Information is cheap. What's expensive —
and what Project Hub preserves — is:

- **Reasoning** — why a decision was made, not just what was decided.
- **Discoveries** — the non-obvious findings that cost hours to surface.
- **Mistakes** — the failed approaches, preserved so they're never repeated blind.
- **Debugging paths** — symptom → hypothesis → test → resolution, the actual route.
- **Engineering thinking** — the trade-offs weighed, the constraints that shaped choices.

A future reader (often: yourself, six months later) should be able to *re-acquire the
understanding*, not just see the answer. That's why PHDS has Mistakes, Debugging History,
and Design Decisions & Trade-Offs as first-class sections — most documentation systems
throw exactly those away.

This is also why the extraction rules forbid fabrication and force `[unclear]` /
`[not stated]` markers: a preserved gap is honest; a filled gap is a lie that will
mislead a future learner.

## 3. Learning-By-Building Philosophy

The natural learning process this system serves:

```
Build
  ↓
Fail
  ↓
Investigate
  ↓
Understand
  ↓
Fix
  ↓
Repeat
```

Project Hub does not try to replace this loop — it **harvests** it. Every pass through
the loop generates exactly the knowledge categories PHDS captures. The system is shaped
around the loop, not the other way round.

Project_01_H757_LED_Blink is the proof: three independent failures (eclipsec path-space
crash, missing GPIO init, boot-sync deadlock), each investigated to root cause — and the
documentation is *more valuable because of the failures*, not despite them.

## 4. Two-Pass Project Execution Model

Projects are executed twice, with different goals:

**Pass 1 — Achieve.**
- Reach the objective. Discover the path. Learn.
- Messy, exploratory, AI-assisted, full of dead ends.
- Output: a working result + raw conversational knowledge.

**Pass 2 — Explain.**
- Walk the discovered path again, cleanly.
- Teach the path. Capture the screenshots and GIFs deliberately.
- Output: documentation, and eventually content (blog, video).

Pass 1 optimizes for the **result**. Pass 2 optimizes for the **reader**. Trying to do
both at once does both badly — that separation is a core design belief of this system.

The current pipeline (extraction → DRE → manual refinement) is the Pass 2 machinery for
Pass 1 conversations.

## 5. Documentation Philosophy

- Documentation is **manufactured, not written**. The pipeline turns raw conversation
  into structured documents; the human applies judgement (refinement), not drudgery.
- **One standard shape (PHDS)** so every project reads the same way, refinement is
  mechanical, and rendering is predictable.
- Documentation must be **human-readable standalone** — useful in plain Obsidian with no
  website, and understandable without the original conversations.
- **Portability is sacred.** A project folder (md + images/gifs/files) can be moved,
  zipped, re-homed — nothing breaks. No lock-in, ever.
- Gaps are visible, never papered over.

## 6. Content Creation Philosophy — One Project → Many Outputs

The future workflow aims at:

```
Project
  ↓
Documentation        ← exists today (V0.1)
  ↓
Blog Assets          ← future
  ↓
Video Assets         ← future
  ↓
Portfolio Assets     ← future
```

**without duplicating effort.** The PHDS document is the single source; blog posts,
video scripts, portfolio cards, and social snippets are *derivations* of it. Write once,
derive many. The reason PHDS metadata is structured (status, tags, dates, sources) is so
these derivations can eventually be generated, not hand-built.

## 7. Future Ecosystem Vision

Project Hub may evolve from a personal system into a creator ecosystem:

- **User accounts** — others run their own Project Hub.
- **Public profiles** — an engineer's identity: who they are, what they build, how they
  think.
- **Creator portfolios** — curated, presentable project showcases for employers,
  collaborators, communities.
- **Blog publishing** — PHDS-derived articles published with near-zero extra effort.
- **Knowledge publishing** — standalone knowledge articles (concepts, techniques,
  references) alongside projects.
- **Community participation** — discussions, shared learning paths, project remixing.
- **AI-assisted documentation** — the extraction/refinement pipeline as a hosted service.
- **AI-assisted content generation** — blog/video/social derivations produced by AI from
  the PHDS source.

**V0.1 implements none of these.** But architecture choices must not block them:

- Static-first now, but content is structured data (content index, registries) that a
  dynamic platform could consume later.
- PHDS frontmatter has reserved future fields (project_type, difficulty, featured,
  portfolio_category).
- The portfolio page (Bucket 0.1.4) is the seed of the future public profile.
- The knowledge library (Bucket 0.1.4+) is the seed of knowledge publishing.

## 8. Future Blog Publishing Vision

- A PHDS project document is already 80% of a technical blog post.
- Future: a "derive blog post" step — select audience + angle, AI drafts from PHDS,
  human refines, publish to the same site (or cross-post elsewhere).
- Blog posts are *narrative* (story of the build); documentation is *reference*
  (structured knowledge). Same source, different shapes.

## 9. Future Portfolio Vision

- The portfolio is the **professional face** of the knowledge base.
- Featured projects, skill clusters derived from tags, timeline of work, depth signals
  (problems solved, debugging stories) that a CV can't carry.
- Eventually: per-audience portfolio views (embedded-systems employer vs. open-source
  community see different cuts of the same data).

## 10. Future Profile System Vision

- Profile = identity + portfolio + knowledge + activity.
- An engineer's profile shows not just *what* they built but *how they think* — because
  the documentation preserves reasoning.
- This is the differentiator vs. existing portfolio sites: depth of process, not just
  screenshots of results.

## 11. Future AI-Assisted Workflow Vision

Today (V0.1): AI extracts (Stage 1), AI refines in a configured workspace (Stage 2 DRE),
human refines (Stage 3), manual storage (Stage 4).

Future direction:

- **Auto-ingestion** — conversations flow into the pipeline without copy-paste.
- **AI-validated refinement** — the DRE validation checklist runs automatically; the
  human only reviews flagged items.
- **AI content derivation** — blog drafts, summaries, social posts generated from PHDS.
- **AI knowledge assistant** — ask questions across your own project history ("how did I
  fix that I²C ACK failure?") and get answers grounded in your documents.
- **Knowledge graph** — automatic linking of related projects, concepts, and lessons
  across the whole vault.

## 12. Future Automation Opportunities

- Obsidian → GitHub sync automation (watch folder, auto-commit, auto-push).
- Auto-publish on push (Bucket 0.1.6 starts this; later: preview builds, link-check
  gates, broken-reference CI).
- Resource pipeline automation — screenshot/GIF capture, naming, optimization, placement.
- Scheduled republish / content freshness checks.
- Validation bots — PHDS conformance, metadata completeness, dead external links.

## 13. Future Chrome Extension Ideas

The biggest friction today is **getting knowledge out of the browser**:

- One-click capture of a ChatGPT/Claude/Gemini conversation → sent straight into the
  extraction pipeline.
- Forum thread clipper (capture the relevant exchange, preserve the URL + context).
- Screenshot-to-project capture: grab, name (`image_NN.png`), and file into the active
  project's `images/` folder automatically.
- "Add to project log" — highlight any text on any page, append to the active project's
  raw notes with source attribution.

## 14. Future Local AI Integration Ideas

- Run extraction (Stage 1) and refinement (Stage 2) on a **local model** (e.g. via
  Ollama) — privacy, cost, offline capability.
- Local semantic index over the vault for the knowledge assistant.
- Local validation pass (PHDS conformance, preservation-rule checking) as a pre-commit
  step.
- Hybrid: local for routine extraction, frontier models for hard merges/derivations.

## 15. How V0.1 Maps to the Vision

| V0.1 piece | Seed of |
| --- | --- |
| Extraction prompt + DRE | AI-assisted documentation service |
| PHDS standard | One-source → many-outputs derivation |
| `content/` portable folders | User-owned data in the future ecosystem |
| Content index + tag registry | Discovery, knowledge graph, profile stats |
| Portfolio page (0.1.4) | Public creator profiles |
| Knowledge pages (0.1.4) | Knowledge publishing platform |
| Static site + GitHub flow | Low-cost personal tier of a larger platform |

## 16. Guidance for Future Buckets

- Read this log before designing any new bucket.
- Implement the bucket's scope — **only** its scope — but shape interfaces so the future
  items above remain reachable.
- When a new idea appears mid-implementation: **record it here** (Raw Thought Log below),
  don't build it.
- Avoid technical debt that blocks evolution: no hardcoded single-user assumptions where
  a collection works, no content lock-in, no styling that fights future theming.

---

## Raw Thought Log

*Append-only. Date + thought. No polish required — this section exists to catch ideas
before they evaporate.*

**2026-06-12** — V0.1 declared the "boilerplate of the whole ecosystem." Buckets 0.1.1–0.1.3
complete and frozen; the pipeline works end-to-end with a real project
(Project_01_H757_LED_Blink). Vision recorded: two-pass execution, one-project→many-outputs,
creator ecosystem (accounts/profiles/portfolios/blog), Chrome-extension capture, local AI
integration. Next: Bucket 0.1.4 Website Interface — treat the portfolio page as the seed of
the future profile system, and the knowledge experience as the seed of knowledge publishing.

---

*See also: [Vision](Vision.md) (formal V0.1 vision) · [Roadmap](Roadmap.md) · [README_IDE](../README_IDE.md) (operating guide for implementation sessions)*
