# Tickets

## Infrastructure

- [x] **INF-001**: Add `docs/stylesheets/extra.css` with color-coded block classes (`code-input`, `code-output`, `code-error`) and wire it up in `.vscode/settings.json` via `markdown.styles`

## Part 0: Preparing

- [x] **P0-000**: Write the about/intro page — concept, how to use, two repos
- [x] **P0-001**: Write the Git installation guide — Windows, macOS, Linux/WSL

## Part 1: Local

### Tooling & Setup

- [x] **P1-001**: Create README.md as the entrypoint with index links to all pages
- [x] **P1-002**: Write the gitconfig setup page — `user.name`, `user.email`
- [x] **P1-003**: Write the `core.editor` setup page — configuring VSCode as the default editor
- [x] **P1-004**: Write the `core.autocrlf` page — line ending differences between Windows and Mac
- [x] **P1-005**: Write the `core.excludesfile` page — setting up a global `.gitignore`
- [x] **P1-006**: Write the `pull.rebase` and `init.defaultBranch` page
- [x] **P1-007**: Write the `color.ui` page
- [x] **P1-008**: Write the `safe.directory` page — common gotcha on WSL + Windows filesystem
- [x] **P1-009**: Exercise: have tutors run `cat ~/.gitconfig` and verify their setup

### Basics

- [x] **P1-010**: Write conceptual explanation of git (middle/high school level)
- [x] **P1-011**: Introduce essential Linux commands — `mkdir`, `cd`, `touch`, `ls`, `cat`
- [x] **P1-012**: Write the first repo page — `mkdir` -> `cd` -> `git init`
- [x] **P1-013**: Write the first file page — `touch` -> `git status`
- [x] **P1-014**: Write the staging page — `git add` -> `git status` -> `git diff`
- [x] **P1-015**: Write the first commit page — `git commit` -> `git log`
- [x] **P1-016**: Write the `.gitignore` page — what to ignore and why
- [x] **P1-017**: Exercise: create a small project, add files, commit, check log and diff

### Branching

- [x] **P1-018**: Write the branch concept page — what branches are and why they exist
- [x] **P1-019**: Write the `git branch` / `git switch` page — creating and switching branches
- [x] **P1-020**: Write the `git checkout` page — relationship to `git switch`, when to use which
- [x] **P1-021**: Write the `git merge` page — merging branches with a scenario
- [x] **P1-022**: Write the merge conflict page — intentionally cause one, then resolve it
- [x] **P1-023**: Write the `git rebase` page — what it does, when to use it vs merge
- [x] **P1-024**: Write the `git stash` page — scenario: need to switch branches mid-work
- [x] **P1-025**: Exercise: branch, commit, merge, resolve a conflict, stash and restore

### Advanced

- [x] **P1-026**: Write the `git reset` page — soft, mixed, hard with scenarios
- [x] **P1-027**: Write the `git revert` page — safely undoing a public commit
- [x] **P1-028**: Write the `git restore` page — discarding working tree changes
- [x] **P1-029**: Write the `git reflog` page — recovering lost commits
- [x] **P1-030**: Write the `git cherry-pick` page
- [x] **P1-031**: Write the `git bisect` page — finding the commit that introduced a bug
- [x] **P1-032**: Write the `git rebase -i` page — squashing and reordering commits
- [x] **P1-033**: Write the `git worktree` page
- [x] **P1-034**: Write the commit message conventions page — Conventional Commits
- [x] **P1-035**: Write the aliases page — useful shortcuts, customizing git

## Part 2: Remote

### GitHub Basics

- [x] **P2-001**: Write conceptual explanation of GitHub (middle/high school level)
- [x] **P2-002**: Write the remote vs local page — what "remote" means
- [x] **P2-003**: Write the account setup page — creating a GitHub account
- [x] **P2-004**: Write the SSH configuration page — generating keys and adding to GitHub

### Collaboration

- [x] **P2-005**: Write the fork guide — step-by-step entry point for all remote exercises
- [x] **P2-006**: Write the `git clone` page — cloning the forked repo
- [x] **P2-007**: Set up GitHub Actions to simulate a collaborator (auto-commits/branches)
- [x] **P2-008**: Write the pull request page — creating and reviewing PRs
- [x] **P2-009**: Write the issues page — tracking work with GitHub Issues

### Workflow

- [x] **P2-010**: Write the `git push` page — pushing local changes to remote
- [x] **P2-011**: Write the `git pull` page — pulling remote changes
- [x] **P2-012**: Write the `git fetch` page — fetching without merging, difference from pull

### Advanced

- [x] **P2-013**: Write the `git tag` page — tagging releases
- [x] **P2-014**: Write the `git submodule` page

---

## Refactoring: Theory/Practice Separation

Apply theory/practice separation rule to all pages (see `../../.claude/CLAUDE.md`).
Reference implementation: `docs/part1/02-basics/05-staging.md` (commit `34a02f6`).

### Part 0

- [x] **RF-P0-001**: docs/part0/02-install/01-install-git.md
- [x] **RF-P0-000**: docs/part0/01-intro/01-about.md

### Part 1 — Setup

- [x] **RF-P1-002**: docs/part1/01-setup/01-gitconfig-user.md
- [x] **RF-P1-003**: docs/part1/01-setup/02-gitconfig-editor.md
- [x] **RF-P1-004**: docs/part1/01-setup/03-autocrlf.md
- [x] **RF-P1-005**: docs/part1/01-setup/04-excludesfile.md
- [x] **RF-P1-006**: docs/part1/01-setup/05-pull-rebase-defaultbranch.md
- [x] **RF-P1-007**: docs/part1/01-setup/06-color-ui.md
- [x] **RF-P1-008**: docs/part1/01-setup/07-safe-directory.md
- [x] **RF-P1-009**: docs/part1/01-setup/08-exercise-verify-gitconfig.md

### Part 1 — Basics

- [x] **RF-P1-010**: docs/part1/02-basics/01-what-is-git.md
- [x] **RF-P1-011**: docs/part1/02-basics/02-linux-commands.md
- [x] **RF-P1-012**: docs/part1/02-basics/03-first-repo.md
- [x] **RF-P1-013**: docs/part1/02-basics/04-first-file.md
- [x] **RF-P1-014**: docs/part1/02-basics/05-staging.md
- [x] **RF-P1-015**: docs/part1/02-basics/06-first-commit.md
- [x] **RF-P1-016**: docs/part1/02-basics/07-gitignore.md
- [x] **RF-P1-017**: docs/part1/02-basics/08-exercise.md

### Part 1 — Branching

- [x] **RF-P1-018**: docs/part1/03-branching/01-branch-concept.md
- [x] **RF-P1-019**: docs/part1/03-branching/02-branch-switch.md
- [x] **RF-P1-020**: docs/part1/03-branching/03-checkout.md
- [x] **RF-P1-021**: docs/part1/03-branching/04-merge.md
- [x] **RF-P1-022**: docs/part1/03-branching/05-merge-conflict.md
- [x] **RF-P1-023**: docs/part1/03-branching/06-rebase.md
- [x] **RF-P1-024**: docs/part1/03-branching/07-stash.md
- [x] **RF-P1-025**: docs/part1/03-branching/08-exercise.md

### Part 1 — Advanced

- [x] **RF-P1-026**: docs/part1/04-advanced/01-reset.md
- [x] **RF-P1-027**: docs/part1/04-advanced/02-revert.md
- [x] **RF-P1-028**: docs/part1/04-advanced/03-restore.md
- [x] **RF-P1-029**: docs/part1/04-advanced/04-reflog.md
- [x] **RF-P1-030**: docs/part1/04-advanced/05-cherry-pick.md
- [x] **RF-P1-031**: docs/part1/04-advanced/06-bisect.md
- [x] **RF-P1-032**: docs/part1/04-advanced/07-rebase-interactive.md
- [x] **RF-P1-033**: docs/part1/04-advanced/08-worktree.md
- [x] **RF-P1-034**: docs/part1/04-advanced/09-commit-conventions.md
- [x] **RF-P1-035**: docs/part1/04-advanced/10-aliases.md

### Part 2 — GitHub Basics

- [x] **RF-P2-001**: docs/part2/01-github-basics/01-what-is-github.md
- [x] **RF-P2-002**: docs/part2/01-github-basics/02-remote-vs-local.md
- [x] **RF-P2-003**: docs/part2/01-github-basics/03-account-setup.md
- [x] **RF-P2-004**: docs/part2/01-github-basics/04-ssh-setup.md

### Part 2 — Collaboration

- [x] **RF-P2-005**: docs/part2/02-collaboration/01-fork.md
- [x] **RF-P2-006**: docs/part2/02-collaboration/02-clone.md
- [x] **RF-P2-007**: docs/part2/02-collaboration/03-actions-collaborator.md
- [x] **RF-P2-008**: docs/part2/02-collaboration/04-pull-request.md
- [x] **RF-P2-009**: docs/part2/02-collaboration/05-issues.md

### Part 2 — Workflow

- [x] **RF-P2-010**: docs/part2/03-workflow/01-push.md
- [x] **RF-P2-011**: docs/part2/03-workflow/02-pull.md
- [x] **RF-P2-012**: docs/part2/03-workflow/03-fetch.md

### Part 2 — Advanced

- [x] **RF-P2-013**: docs/part2/04-advanced/01-tag.md
- [x] **RF-P2-014**: docs/part2/04-advanced/02-submodule.md
