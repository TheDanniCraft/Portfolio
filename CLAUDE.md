# Portfolio agent guidance

Read `AGENTS.md` and `.specify/memory/constitution.md` before working in this repository.
Use `docs/testing-policy.md` and `.specify/memory/tdd-profile.md` for test execution.
Spec Kit and its TDD/governance skills are installed in `.claude/skills/`.
Activate the Python environment with `source .venv/bin/activate` before running generated
Python commands, or invoke `.venv/bin/python` directly. Prepare it with `uv sync --locked`.

For symbol/function and relationship discovery, query `graphify-out/graph.json` first with
`graphify query`, `graphify explain`, or `graphify path`. Then inspect the identified current
files with targeted reads/`rg`. Missing/incomplete/stale graph results require current-source
verification and a refresh, not a claim that a function or caller does not exist.
Run `graphify extract . --code-only --max-workers 2` after source changes, then
`graphify cluster-only . --no-label` to refresh report/HTML. This local AST graph does not index
prose semantics or prove test coverage. Never include credentials or generated dependencies.
