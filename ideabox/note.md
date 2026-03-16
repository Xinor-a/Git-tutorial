# Git Guideline — Idea Notes

## Overall Structure

- **Part 1**: Local — gitconfig setup → basics → branching → advanced
- **Part 2**: Remote — GitHub basics → workflow → collaboration → advanced

## Core Concept

- **Story-driven** — tutors learn through narrative/scenarios, not a reference manual

## Structure

- `README.md` is the entrypoint — index with links to all pages
- Each page: prev/next nav + "Back to Index" link
- Page layout: (1) Intro (what & why), (2) Content, (3) Summary & Exercises
- One task/scenario per page — not one command per page
- Prefer many thin pages over few dense ones
- Some pages intentionally end in a common mistake; next page explains what happened and recovers
- Two repos: tutorial content (this repo) + tutor's practice repo (separate)
- Exercises repeat `git status` / `git log` / `git diff` frequently — build the habit
- Same commands recur across exercises — repetition builds muscle memory
- Each exercise includes a recovery section: "run this to reset, then try again"

## Presentation

### Emoji Usage

Use emojis sparingly but deliberately for visual scanning:

- Tips, hints, encouragement (e.g. 💡 ✅ 🎉)
- Warnings or common mistakes (e.g. ⚠️ ❌)
- Section landmarks within a long page (e.g. 📁 🔍)

Keep it consistent across pages — same meaning, same emoji.
Don't overuse; one or two per page is enough.

### Code Block Color-Coding

Color-code blocks by role (CSS loaded via VSCode `markdown.styles`):

- **light blue** (`code-input`): commands the tutor types
- **light green** (`code-output`): normal command output
- **light red** (`code-error`): failure / error output
- **default**: everything else (config file contents, etc.)

Wrap code fences in an HTML `<div>` (e.g., `<div class="code-input">` ... `</div>`).

CSS lives in `docs/stylesheets/extra.css`; loaded via `.vscode/settings.json` `markdown.styles`. No SSG needed.

## Part 1: Local

### Tooling & Setup

- Start Part 1 with global gitconfig, not with the first git command
- Explain each setting with context; have tutors `cat ~/.gitconfig` to see the file
  - `user.name` / `user.email`
  - `core.editor` — VSCode
  - `core.autocrlf` — line endings (Windows/Mac)
  - `core.excludesfile` — global `.gitignore`
  - `pull.rebase`
  - `init.defaultBranch` — `main`
  - `color.ui`
- Cover `safe.directory` early — common gotcha on WSL + Windows filesystem
- Aliases — cover later, not at setup

### Basics

- Start with a conceptual explanation of git (middle/high school level)
- Introduce Linux commands alongside git as needed
- Flow: `mkdir` → `cd` → `git init` → `touch` → `git status` → `git add` → `git status` → `git diff` → `git commit` → `git log`
- `.gitignore`

### Branching

- `git branch` / `git checkout` / `git switch`
- `git merge` and `git rebase` — both, with when to use which
- `git stash` — introduced in branching context (e.g. "need to switch branches mid-work")

### Advanced Topics

- `git reset` / `git revert` / `git restore` — undoing changes
- `git reflog` — recovering lost commits
- `git cherry-pick`
- `git bisect`
- `git rebase -i` — cleaning up history
- `git worktree`
- Commit message conventions (Conventional Commits)

## Part 2: Remote

### GitHub Basics

- Explain GitHub concepts at middle/high school level
- Remote vs local
- Account setup + SSH configuration

### Collaboration

- Part 2 opens with a step-by-step fork guide — entry point for all remote exercises
- After forking, `git clone` — start of hands-on Part 2
- Use GitHub Actions to simulate a collaborator (auto-commits/branches as a "second person")
- Tutor's forked repo must be public — Actions runs free with no limits
- fork, pull request, issues

### Workflow

- `git push` / `git pull` / `git fetch` — usage and differences

### Advanced Topics

- `git tag` — release management
- `git submodule`
