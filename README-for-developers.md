# README for Developers

This file is for contributors and Claude agents working on this project.
For the reader-facing entrypoint, see [README.md](README.md).

## What This Repo Is

A story-driven git tutorial targeting middle/high school students.
Content is written in Japanese. Pages are narrative and scenario-based —
not a command reference.

The full design rationale lives in [`ideabox/note.md`](ideabox/note.md).

## Directory Structure

```
docs/
  part1/
    01-setup/          ← gitconfig, environment setup
    02-basics/         ← git init → commit flow
    03-branching/      ← branches, merge, rebase, stash
    04-advanced/       ← reset, revert, reflog, rebase -i, …
  part2/
    01-github-basics/  ← what is GitHub, SSH
    02-collaboration/  ← fork, clone, PR, issues
    03-workflow/       ← push, pull, fetch
    04-advanced/       ← tag, submodule
  stylesheets/
    extra.css          ← color-coded block classes (INF-001)
README.md              ← reader entrypoint (index of all pages)
README-for-developers.md  ← you are here
strategy/tickets.md    ← canonical ticket tracker
ideabox/note.md        ← design notes
.claude/
  CLAUDE.md            ← project instructions for Claude agents
  strategy/
    next-to-do.md      ← orchestrator's running notes
```

## Ticket Tracker

All work items are in [`strategy/tickets.md`](strategy/tickets.md).

Status markers:

- `[ ]` — unclaimed
- `[-]` — in progress
- `[x]` — merged into `main`

**Only the orchestrator updates this file.**

## Multi-Agent Workflow

This project uses Claude Code's `git worktree` isolation to parallelize page writing.

- **Orchestrator** — runs on `main`, assigns tickets, reviews and merges branches.
- **Workers** — each runs in an isolated worktree, writes their assigned pages, commits to a feature branch, and returns.

Workers do not touch `strategy/tickets.md`, `README.md`, or files outside their ticket scope.

See `.claude/CLAUDE.md` → "Parallel Work with Worktrees" for the full protocol.

## Page Template

Every page follows this structure:

1. Title (`# …`)
2. Prev/next navigation links
3. `## What & Why` — 2–3 sentence intro
4. `## Content` — the tutorial body
5. `## Summary` — bullet recap
6. `## Exercises` — step-by-step, always ending with a **Reset & Retry** block
7. Prev/next navigation links (repeated)

Navigation links use relative paths. Write links to pages that don't exist yet —
they resolve once all branches merge.

## Writing Conventions

- Language: Japanese
- Audience: middle/high school students — no jargon without explanation
- Tone: friendly, like a kind senpai
- One scenario per page (not one command per page)
- Code blocks always have a language tag (` ```bash `, ` ```markdown `, etc.)
- Wrap command blocks in `<div class="code-input">` / `code-output` / `code-error`
  for color-coding (requires `docs/stylesheets/extra.css` from INF-001)
- Emojis: sparingly — 💡 ✅ ⚠️ ❌ at tips, warnings, section landmarks; one or two per page max

## Commit Conventions

Conventional Commits style:

```
docs: write P1-016 gitignore page
feat: add GitHub Actions collaborator workflow
chore: mark P1-012–015 as done in tickets.md
fix: correct nav link in 05-staging.md
```

Subject line under 72 characters. Most page work is `docs:`.

## Dependency Groups

These ticket sequences must be written in order (each page assumes the reader finished the previous):

- P1-012 → P1-013 → P1-014 → P1-015 (first repo flow)
- P1-021 → P1-022 (merge → merge conflict)
- P2-005 → P2-006 (fork → clone)

All other tickets within a section are independent and can be parallelized.

## Current Progress

As of 2026-03-16:

- **Done**: P1-001 – P1-015 (Setup section + Basics through first commit)
- **Next**: INF-001 (CSS), then retrofit P1-001–015 for color-coding + emoji, then P1-016–017

See [`.claude/strategy/next-to-do.md`](.claude/strategy/next-to-do.md) for the orchestrator's live notes.
