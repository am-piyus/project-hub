# Orbit 0.1 — Version History

> The release-history record for Project Hub. Each Orbit release appends an entry here —
> this file is the foundation of the versioning system for Orbit 0.2 and beyond.

## Release Index

| Version | Name | Released | Status | Tag |
| --- | --- | --- | --- | --- |
| **V0.1** | Orbit 0.1 — Project Hub | 2026-06-12 | ✅ Released · Frozen | `V0.1` |

---

## V0.1 — Orbit 0.1 (2026-06-12)

**Maturity:** 0.1 Prototype → first operational release.
**Mission:** validate the complete documentation-publishing workflow.

### Buckets Completed

| Bucket | Delivered | Commits |
| --- | --- | --- |
| 0.1.1 Product Definition | Vision, requirements, architecture, roadmap | `a2917a8` |
| 0.1.2 Documentation Workflow | Extraction prompt, DRE, manual refinement, storage structure | `d632905`…`75af6b4` |
| 0.1.3 Publishing Engine | Astro pipeline: rendering, resources, wikilinks, metadata, verification | `b0aedab`…`95fc65e` |
| 0.1.4 Website Interface | Design system, homepage, project/knowledge/portfolio, navigation | `4ebe92f`…`aff7713` |
| 0.1.5 Discovery System | Search, tags, categories, filtering, related content | `cd424f9`…`875ec7c` |
| 0.1.6 Deployment Pipeline | Pages config, Actions CI/CD, E2E + production validation, release | `99f5f50`…`V0.1` |

### Major Capabilities Added

- Conversation → PHDS documentation workflow (2-stage AI + manual refinement)
- Static publishing engine with portable, validated content
- Professional documentation website with dark mode and reading aids
- Full discovery layer: search, tags, categories, filters, related content
- Continuous publishing: push-to-deploy via GitHub Actions to GitHub Pages

### Architectural Milestones

- PHDS standard + UPDS rules as the content contract
- Content as data: registries and a machine-readable content index
- Token-driven design system (theme-swap-ready)
- Base-path-aware URL architecture (host-portable)
- Profile-as-data — seed of the future creator profile system

### Known Limitations at Freeze

See [Release Notes](Orbit_0.1_Release_Notes.md) §Known Limitations and the §6/§9
deferred-item lists in the verification reports.

### Verification Trail

[Publishing Build Verification](Publishing_Build_Verification.md) ·
[Discovery Verification](Discovery_Verification_Report.md) ·
[End-to-End Publishing](End_to_End_Publishing_Report.md) ·
[Production Validation](Production_Validation_Report.md) ·
[Certification](Orbit_0.1_Certification_Report.md)

---

## Future Releases

*Orbit 0.2 — planned. Direction emerges from V0.1 usage feedback; candidate scope lives
in the [Vision Log](Project_Hub_Vision_Log.md) and the Orbit document's "Next Orbit
Priorities".*
