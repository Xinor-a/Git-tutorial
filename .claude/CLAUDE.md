# Project: Git Tutorial

Story-driven git tutorial for beginners (middle/high school level).
See `ideabox/note.md` for design principles, `strategy/tickets.md` for the ticket list.

## Directory Structure

```
docs/
  part1/
    01-setup/
      01-gitconfig-user.md
      02-gitconfig-editor.md
      ...
    02-basics/
      01-what-is-git.md
      02-linux-commands.md
      ...
    03-branching/
    04-advanced/
  part2/
    01-github-basics/
    02-collaboration/
    03-workflow/
    04-advanced/
README.md              ← entrypoint (index with links to all pages)
strategy/tickets.md    ← ticket tracker
.claude/strategy/next-to-do.md  ← orchestrator's running notes on what to tackle next
ideabox/note.md        ← design notes
```

- Section directories use zero-padded numbering: `01-`, `02-`, ...
- Page files within sections also use zero-padded numbering.
- File names are kebab-case, derived from the ticket description.
- Each ticket maps to exactly one `.md` file unless explicitly noted otherwise.

## Page Template

Every tutorial page MUST follow this layout:

```markdown
# Page Title

<!-- prev/next navigation -->
[< Previous: Page Name](../path/to/prev.md) | [Back to Index](../../README.md) | [Next: Page Name >](../path/to/next.md)

## What & Why

Brief intro: what the reader will learn and why it matters (2-3 sentences).

## Content

The main tutorial content. Story-driven, scenario-based.

## Summary

- Bullet-point recap of key takeaways.

## Exercises

Step-by-step exercises. Requirements:
- Include `git status` / `git log` / `git diff` where relevant (build the habit).
- Include a "Reset & Retry" block at the end:

  ```
  ### Reset & Retry
  Run the following to reset and try again:
  (commands here)
  ```

<!-- prev/next navigation (repeated at bottom) -->
[< Previous: Page Name](../path/to/prev.md) | [Back to Index](../../README.md) | [Next: Page Name >](../path/to/next.md)
```

Navigation links: leave `Previous` empty on the first page of a section,
`Next` empty on the last. Cross-section links connect the last page of
one section to the first page of the next.

## Writing Style Guide

- **Audience**: middle/high school students. No jargon without explanation.
- **Tone**: friendly, encouraging, casual. Like a kind senpai, not a textbook.
- **Person**: second person — "you" (not "we").
- **Language**: Japanese (日本語). Pages are written in Japanese.
- **Code blocks**: always specify the language (```bash, ```markdown, etc.).
- **Commands**: show the full command, then explain what it does after.
  Show the expected output when it helps understanding.
- **One scenario per page** — not one command per page.
  A page can cover multiple related commands if they serve one scenario.
- **Mistake pages**: some pages intentionally end with a common mistake.
  The next page opens by explaining what went wrong and how to recover.
  Mark these pages with a comment at the top: `<!-- mistake-page -->`.

## Ticket Dependencies

Tickets within a section are ordered sequentially — page N may reference
concepts from page N-1. However, for parallel work:

- **Independent sections** can be worked on in parallel
  (e.g., `01-setup` and `03-branching` have no cross-references during drafting).
- **Within a section**, pages CAN be written in parallel IF the author reads
  the ticket descriptions of prior pages to understand what the reader already knows.
  Do not repeat explanations from earlier pages — reference them with a link instead.
- **Cross-section references**: use placeholder links `(../path/to/future-page.md)`
  even if the target doesn't exist yet. These will be resolved at merge time.

Dependency groups (must be written sequentially OR by the same author):

- P1-012 → P1-013 → P1-014 → P1-015 (first repo flow — each builds on the previous)
- P1-021 → P1-022 (merge → merge conflict is one continuous scenario)
- P2-005 → P2-006 (fork → clone is one continuous flow)

## Parallel Work with Worktrees

Multiple Claude Code instances (workers) work in parallel using `git worktree`.
A master Claude (orchestrator) coordinates all work from the main repo directory.

### Roles

**Orchestrator (master Claude)** — runs in the main repo on `main`:

- Reads `strategy/tickets.md` to decide what to assign next.
- Groups tickets into batches respecting dependency groups.
- Spawns worker agents via the Agent tool with `isolation: "worktree"`.
- Updates `strategy/tickets.md` to mark tickets as assigned (`[-]`) or done (`[x]`).
- Reviews completed worktrees and merges branches into `main`.
- Runs integration passes after a section's tickets are all merged.
- Is the only role that commits to `main`.

**Worker (spawned Claude agent)** — runs in an isolated worktree:

- Receives a ticket assignment and context from the orchestrator.
- Works only on assigned ticket(s). Does not modify `strategy/tickets.md`.
- Commits to its feature branch only.
- Signals completion by returning results to the orchestrator.
- Does NOT merge, push, or touch `main`.

### Ticket Status in `tickets.md`

- `[ ]` — unclaimed, available for assignment.
- `[-]` — assigned, work in progress.
- `[x]` — completed and merged into `main`.

Only the orchestrator updates ticket status.

### Orchestrator Workflow

1. Read `strategy/tickets.md` and identify available tickets (`[ ]`).
2. Select a batch of tickets that can be worked in parallel
   (different sections, or non-dependent tickets within a section).
3. Mark selected tickets as `[-]` in `tickets.md` and commit to `main`.
4. Spawn worker agents in parallel. For each worker, provide:
   - The ticket ID(s) and description.
   - The target file path(s) based on the directory structure.
   - The page template to follow.
   - Context about what the reader already knows from prior pages.
   - Prev/next page paths for navigation links.
5. When workers complete, review the output.
6. Merge each worker's branch into `main` (rebase first if needed).
7. Mark tickets as `[x]` in `tickets.md` and commit to `main`.
8. Repeat from step 1 until all tickets are done.

### Spawning a Worker

Use the Agent tool with `isolation: "worktree"`:

```
Agent(
  description: "Write P1-002 gitconfig-user page",
  isolation: "worktree",
  prompt: """
    You are a worker agent writing a git tutorial page.
    Read .claude/CLAUDE.md for project conventions.

    Assignment: P1-002
    File: docs/part1/01-setup/01-gitconfig-user.md
    Topic: Setting up user.name and user.email in gitconfig
    Previous page: (none — first page in section)
    Next page: docs/part1/01-setup/02-gitconfig-editor.md
    Reader context: The reader has just installed git. This is their first config step.

    Follow the page template and writing style guide in CLAUDE.md.
    Commit your work with a conventional commit message.
  """
)
```

### Batch Planning

Respect these dependency groups — tickets in the same group must be
assigned sequentially (or to the same worker in order):

- P1-012 → P1-013 → P1-014 → P1-015 (first repo flow)
- P1-021 → P1-022 (merge → merge conflict)
- P2-005 → P2-006 (fork → clone)

Independent sections can always be parallelized:

- `01-setup` / `02-basics` / `03-branching` / `04-advanced` (across sections)
- Part 1 / Part 2 (across parts)

### Branch Naming

Workers do not name branches — `isolation: "worktree"` creates them automatically.
If manually creating worktrees, use:

```
<ticket-id>/<short-description>
```

Examples: `P1-002/gitconfig-user`, `P1-021/merge-scenario`

When a branch covers multiple consecutive tickets: `P1-012-015/first-repo-and-commit`

### Commit Conventions

- Use Conventional Commits: `docs:`, `feat:`, `chore:`, `fix:`.
- Most tutorial page work is `docs:`. GitHub Actions setup is `feat:`.
- Subject line under 72 characters.
- One logical change per commit.

### File Ownership

Each ticket owns specific files. Workers must not modify files outside their scope.

| Scope | Owner |
|---|---|
| `docs/part1/01-setup/01-*.md` | P1-002 |
| `docs/part1/01-setup/02-*.md` | P1-003 |
| (pattern continues per ticket) | |
| `README.md` | P1-001 only; others must not edit |
| `strategy/tickets.md` | orchestrator only |

If you need to reference another page, use a link — never copy content.

### Shared Files

These files are touched by multiple tickets and need special handling:

- **`README.md`**: P1-001 creates the initial version. Other tickets do NOT modify it.
  After all pages are merged, the orchestrator runs an integration pass to update links.
- **Navigation links**: each page includes prev/next links. Workers should write
  correct links based on the expected file paths. If the target page doesn't exist
  yet, write the link anyway — it will work after all branches merge.

### Definition of Done

A ticket is complete when:

- [ ] Page file exists at the correct path with correct naming.
- [ ] Page follows the page template (What & Why → Content → Summary → Exercises).
- [ ] Navigation links (prev/next/index) are present.
- [ ] Exercises include `git status`/`git log`/`git diff` where appropriate.
- [ ] Exercises include a "Reset & Retry" section.
- [ ] No content from other tickets is duplicated — link instead.
- [ ] All code blocks have a language specifier.
- [ ] Commit(s) follow Conventional Commits.

### Merge Strategy

- Orchestrator rebases each worker branch onto `main` before merging.
- Use squash merge for single-page tickets; regular merge for multi-ticket branches.
- Resolve conflicts in the worker branch, never on `main`.
- After all tickets in a section merge, the orchestrator runs an integration pass
  to verify navigation links and fix any broken references.

### What NOT to Do

Workers:

- Do not modify `strategy/tickets.md`.
- Do not merge or push to `main`.
- Do not modify files outside assigned ticket scope.
- Do not duplicate content — link to existing pages instead.

Orchestrator:

- Do not assign tickets that have dependencies on unfinished tickets.
- Do not merge without reviewing the worker's output.
- Do not skip the integration pass after completing a section.
