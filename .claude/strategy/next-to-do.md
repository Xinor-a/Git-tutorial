# Next To-Do

> Orchestrator-only. Do not edit from worker agents.

## Current Status

- Completed: P1-001 – P1-015 (Setup section + Basics through first commit)
- In progress: none
- Pending: P1-016 onward, all of Part 2, INF-001

## Up Next

### Priority 1: INF-001 (unblocks visual polish on all future pages)

- [ ] INF-001: Add `docs/stylesheets/extra.css` + `.vscode/settings.json`

### Priority 2: Retrofit existing docs to match note.md guidelines

Update all pages under `docs/` (P1-001 – P1-015) to align with the two new conventions in `ideabox/note.md`:

1. **Code block color-coding** — wrap command input/output/error fences in `<div class="code-input/output/error">` (requires INF-001 to land first)
2. **Emoji usage** — add appropriate emojis (💡 ✅ ⚠️ ❌ etc.) at tips, warnings, and section landmarks; keep it to one or two per page

This is an integration pass — can be done section by section, in parallel across pages.

### Then: continue Part 1 — Basics (can parallelize P1-016/017 with branching section start)

- [ ] P1-016: `.gitignore` page
- [ ] P1-017: Exercise — create project, add files, commit, check log and diff

After P1-016 and P1-017 merge, the Basics section is complete.
Next batch: P1-018 onward (Branching section) — all independent, can be parallelized.

## Notes

- P1-021 → P1-022 must be sequential (merge → merge conflict scenario).
- Integration pass needed after each section completes (check nav links).
