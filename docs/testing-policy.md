# Testing and execution policy

The constitution is authoritative. This policy adapts Clipify's test-execution practices to
Portfolio's Bun stack; it does not claim Clipify's Jest/Playwright infrastructure exists here.

## Development and merge gates

Run whole test files without coverage during Red -> Green -> Refactor. At a completed slice, run
all affected files and integration suites. New PRs start as drafts. Scoped draft checks provide
feedback only; ready-for-review and master must run complete applicable validation. Never mark a
missing runner, missing database, zero-test selection or skipped suite as a successful gate.

Current master has no application test scripts, test files, coverage runner or browser acceptance
runner. Existing executable gates are `bun run lint`, `bun run typecheck` and `bun run build`.
The separate donation/portal worktree has unit and integration tests, but those files and scripts
are not included in this bootstrap PR. They are not a baseline capability on this branch.

Before production behavior changes, add and verify the applicable unit/integration runners and
isolated fixtures. Database integration must use disposable loopback databases and controlled
providers, with no shared development state or production credentials. Unit and integration
processes must be separate when integration mocks globals.

Coverage is required for changed production code. Each feature plan must declare covered source
scope, measured baseline, numeric thresholds, enforcement command, evidence retention and blocking
behavior before implementation. This tooling bootstrap changes no production behavior, so product
coverage is not applicable. Add coverage enforcement and browser evidence before releasing customer
journeys; policy documentation is not executable CI enforcement.

## Suite ownership and splitting

Keep unit, integration/contract, browser journey and timing-sensitive evidence distinct by actual
resource needs. Split large test files around coherent behavior with complete setup/cleanup.
Equivalent scenarios have one execution owner even when they satisfy both BDD and ATDD.
Gherkin scenario IDs must map to executable bindings; until a browser/Gherkin runner is installed,
applicable journey gates are missing, not implicitly satisfied by API/unit tests.

Integration files sharing databases, provider maps or counters MUST remain serial. Before
parallelizing them, provide isolated worker/case databases and independent mocks.
Schema-template cloning may accelerate setup, but every worker retains its own disposable database
and job-owned templates are removed even on failure. No production or shared development state.

## Measured parallel execution

Record whole-file durations and resource class in `docs/test-learning.md`. Start with separate unit
and integration processes. Add lanes only when measurements justify their overhead. Balance file
assignments by measured duration, longest first. Cap workers using effective CPU/cgroup limits,
available memory after a reserve, and the number of isolated databases. An override may lower the
safe cap, never bypass it. Unknown resource consumption defaults to one worker.

Deadline, cancellation, race and performance assertions belong in a quiet serial lane. Browser
shards require separate servers/databases; share an exact browser build only when its execution
inputs match. Never copy Clipify's lane counts or memory budgets without measuring this app.

## Coverage evidence and affected selection

Every future lane publishes executed inventory, source-tree identity, runtime/dependency/config
identity and coverage. The merge gate rejects missing/duplicate lanes, wrong source/input identity,
incorrect inventory and absent reports, then merges compatible coverage and enforces the original
thresholds. Do not average lane percentages. Add tests for the partition/merge automation itself.

Affected-test selection is an optimization, not proof of complete scope. Include untracked files,
deletions and changes to fixtures/configuration. If source has no mapped tests, mappings are stale,
or setup/test infrastructure changes, fall back to complete validation. Graphify may suggest impact
but must never be the only basis for omitting tests. A prior successful head SHA alone is insufficient
for reusing validation of a different merge tree or execution environment.

## Learning and test strength

Record command, result, duration, resources, bottleneck/flake, diagnosis, fix and remeasurement.
Refresh measured baselines after meaningful suite/runtime changes. Keep failures visible; retries
must not disguise product defects. Mutation tooling is absent: use documented deliberate-mutant
spot checks for high-risk behavior until a compatible runner is verified. Add property tests only
for real invariants. Never add implementation-mirroring tests simply to increase counts.

## Portal release readiness

Before customer-facing release, require executed acceptance evidence for login/session lifecycle,
customer ownership/authorization, destructive account operations, payment replay/failure recovery
and personal-data boundaries as applicable. Establish browser/Gherkin execution, complete changed-code
coverage and blocking CI gates. Do not label this initial bootstrap as proof the portal is ready.
