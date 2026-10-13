# Development tooling

## Installed setup

- Spec Kit CLI 1.1.3, Python script engine, Codex default and Claude also installed.
- TDD extension 1.1.2 and test-first-governance preset 1.3.0.
- Both agents have core, governance-composed and four TDD skills registered.
- Python dependencies are pinned in `pyproject.toml`/`uv.lock`. Run `uv sync --locked`,
  then `source .venv/bin/activate` before launching your agent so its generated `python3`
  commands resolve PyYAML. Alternatively run helpers with `.venv/bin/python` directly.
- Graphify 0.9.89 is installed in this workspace. The shared index is local AST/code-only;
  it does not claim semantic extraction of documentation or complete SQL relationships.

## Reproduce through CLI commands

Use package installers, not copied skills or `--dev` packages:

```sh
uv tool install specify-cli==1.1.3
uv sync --locked
source .venv/bin/activate
specify init --here --force --non-interactive --integration codex --script py --ignore-agent-tools
specify integration install claude --script py
specify extension add tdd --from https://github.com/d0whc3r/spec-kit-tdd/releases/download/v1.1.2/tdd-1.1.2.zip
specify preset add --from https://github.com/ka-zo/spec-kit-preset-test-first-governance/archive/refs/tags/1.3.0.zip
specify integration use claude
specify integration use codex
```

These are initial setup commands, not an instruction to overwrite an established constitution or
customized managed files. The extension command prompts for confirmation of the reviewed source.
Spec Kit 1.1.3's community catalog is discovery-only, so upstream URLs are the documented installation
route. The CLI records these URL installs as `source: local` internally; this does not mean files
were hand-installed. Versions/manifests are retained in the generated registries.

Reference setup: TheDanniCraft/Clipify (`.specify/init-options.json`, TDD extension 1.1.2,
test-first-governance 1.3.0, `AGENTS.md`, `scripts/test-execution.cjs`,
`scripts/test-worker-budget.cjs`, `scripts/run-scoped-tests.mjs`, `scripts/merge-test-coverage.mjs`).
Portfolio adapts their policies to Bun; Clipify-specific Jest, MCP and browser CI are not copied.

## Feature workflow

Read the constitution and verified TDD profile. Invoke the agent's Spec Kit skills for
specify -> clarify as needed -> plan -> tasks -> analyze -> implement -> converge.
The before-implement TDD hook is mandatory. Run TDD planning after tasks and verification after
implementation even when offered as optional; the repository requires their evidence for behavior
changes. Do not generate a retroactive feature spec solely to claim the old portal work was TDD.

Codex uses `$speckit-*`; Claude uses `/speckit-*`. Both read the same `.specify/memory/` files.
A feature must have traceability, a defect log and a test summary. Keep one rolling aggregate report
at `reports/test-summary.md` when features exist, referencing feature/CI evidence without duplication.

## Graph discovery and refresh

```sh
graphify query "metadata sitemap case studies"
graphify explain "pageMetadata()"
bash scripts/update-graph.sh
```

Query the graph first to discover symbols/relationships, then inspect current source with targeted
reads or `rg`. The committed index was built from the bootstrap branch only, excluding the separate portal
worktree. Local rebuilds include dirty/untracked source; HEAD alone is not a freshness check.
The graph's ignored metadata/cache files are machine local. Commit graph JSON/report/HTML only with
matching source. The index has files without modeled symbols (such as Python package metadata); verify those
files directly. The separate portal worktree is not indexed or included in this PR.

No global agent settings or git hooks are changed. Refresh is explicit and reproducible.
