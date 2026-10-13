Gitmoji Guide for AI Assistants
Purpose

This guide helps AI assistants understand and use gitmoji convention when creating commits. Using emojis on commit messages provides an easy way of identifying the purpose or intention of a commit with only looking at the emojis used. Gitmoji use emojis to make commit messages more expressive and easier to understand at a glance.
Repository Convention

A commit message is composed using the following pieces:

    intention: The intention you want to express with the commit, using one Unicode emoji from the gitmoji list.
    message: A brief, natural-language explanation of the change in imperative mood.

Format

<intention> <imperative message>

[optional body]

Do not add Conventional Commit prefixes or scopes such as `feat:`, `fix:`, `docs:`, `refactor:`, or `chore:`. Match the repository's existing history: after the emoji, begin directly with a capitalized action verb such as `Add`, `Fix`, `Refine`, `Move`, `Show`, `Guard`, `Bump`, or `Resolve`.

Gitmoji reference

Fetch all available gitmojis from: https://gitmoji.dev/api/gitmojis.
Usage Guidelines for AI
Selecting the correct emoji

    Identify the primary purpose of the commit
    Choose the most specific emoji that matches the change
    Use only one emoji per commit for clarity
    Prioritize by impact: Breaking changes (💥) > Features (✨) > Fixes (🐛) > Refactoring (♻️)

Examples

✨ Add user authentication system

Implement JWT-based authentication with login and registration endpoints.
Closes #123

🐛 Resolve null pointer exception in user service

Added null check before accessing user properties to prevent crashes.

📝 Update installation instructions

Added step-by-step guide for setting up the development environment.

⚡️ Optimize user query with indexing

Reduced query time from 500ms to 50ms by adding composite index.

💥 Update API response format to REST specification

All API endpoints now return data in a standardized envelope format.
Clients must update their response parsing logic.

Best Practices

    Be atomic: One emoji, one purpose, one commit
    Write clear subjects: Keep under 60 characters, imperative mood
    Use the body: Explain "why" not "what" for complex changes
    Reference issues: Include issue numbers when applicable
    Indicate breaking changes: Use 💥 :boom:.

Resources

    Gitmojis list: https://gitmoji.dev/api/gitmojis
    Gitmoji website: https://gitmoji.dev/
    Gitmoji specification: https://gitmoji.dev/specification

## Spec Kit and quality policy

Read `.specify/memory/constitution.md`, `docs/testing-policy.md` and
`.specify/memory/tdd-profile.md` before feature work. Codex and Claude share the same policies,
Python helpers, TDD extension and test-first governance preset. Codex skills live in
`.agents/skills/`; Claude skills live in `.claude/skills/`.

Run `uv sync --locked`, then activate `.venv` before generated `python3` commands (or use
`.venv/bin/python` directly). See `docs/development-tooling.md` for pinned setup commands.
Tests precede production behavior changes. Run complete files without coverage in the inner loop,
complete affected suites at slice completion and full applicable gates before merge. Keep shared
mutable integration fixtures serial until isolated. Never pass a missing/zero-test gate.
Record slow/flaky-test measurements, diagnosis and improvements in `docs/test-learning.md`.

## Graph-first source discovery

For functions, symbols and relationships, query `graphify-out/graph.json` first using
`graphify query`, `graphify explain` or `graphify path`, then use targeted reads/`rg` to verify
current source. If the graph is absent, stale or incomplete, use source search and refresh it.
Graph results cannot prove the absence of code or complete affected-test coverage.

Refresh after source changes with `graphify extract . --code-only --max-workers 2`, then
`graphify cluster-only . --no-label`. The index includes the current worktree, including untracked
source; matching HEAD alone does not prove freshness. Respect `.graphifyignore`. Preserve the
existing user work and use one owning suite per test rather than duplicate evidence.
