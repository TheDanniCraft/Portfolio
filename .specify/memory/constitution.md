# Portfolio Constitution

## Core Principles

### I. Test-First Delivery

Every production behavior change MUST begin with an executable test observed failing for
its intended reason, then the smallest passing implementation and refactoring while green.
Record Red -> Green -> Refactor evidence. Never weaken, skip or delete tests to obtain Green.
Existing work predating adoption is not retroactively claimed as test-first evidence.
Documentation and generated-tooling changes require appropriate validation rather than artificial
product tests. Specifications determine intended behavior when tests and implementation disagree.

### II. Customer Boundaries Are Explicit

Authentication and authorization MUST be enforced at server entry points. Customer-owned resources
MUST be scoped to the authenticated owner; client visibility is not authorization. Changes touching
sessions, account access, payments, consent, or personal data require negative and boundary tests,
including unauthorized access, another customer's data, replay/idempotency and failure recovery
where applicable. Public API contracts and errors MUST be intentional and traceable.

### III. Tests Are Isolated and Deterministic

Tests MUST use disposable loopback databases and controlled provider, clock, filesystem and network
boundaries. Never inject production credentials or use shared development data. Each concurrent
worker MUST own its database/state and clean up its resources. Shared mutable fixtures are serial
until isolated. Migration setup is permitted only against a disposable test database.

### IV. Evidence Has One Owner

Every executable artifact MUST have one owning suite while TDD, BDD and ATDD remain complementary
evidence roles. Do not duplicate equivalent tests to satisfy labels. Exercise the highest verified
real entry point for acceptance evidence. Missing browser, coverage or mutation capabilities MUST
be reported as gaps; a unit pass cannot stand in for unexecuted customer journeys.

### V. Optimize With Measurements

Use whole-file tests without coverage during Red/Green development, complete affected suites at
slice completion, and full applicable validation before merge. Avoid rerunning unchanged successful
checks without a reason. Split tests by behavior and resource needs; balance parallel lanes from
measured durations and cap workers by CPU, memory and database capacity. Timing-sensitive tests run
in a quiet lane. Optimization MUST preserve test inventory, assertions and coverage thresholds.

## Engineering Constraints

- Bun remains the application package manager and test command runner; Python powers Spec Kit.
- Reuse established fixtures when present; verify new fixture isolation before reuse. Preserve
  server/client module boundaries.
- Query Graphify for symbols and relationships first, then verify current source with targeted reads
  or `rg`. The graph is a navigation aid, never proof of present behavior or complete test coverage.
- Use `.graphifyignore` to exclude credentials, dependencies and generated tooling. Refresh the
  index after code changes and never infer freshness solely from HEAD when the worktree is dirty.
- Keep changes small and reviewable. Preserve repository Gitmoji commit conventions.

## Development Workflow

1. Resolve feature specification and plan; identify customer/security boundaries.
2. Declare TDD, BDD and ATDD applicability, complete scenarios and traceability before implementation.
3. Put test tasks before implementation tasks and run the TDD loop per behavior.
4. Record commands, results, failures and accepted gaps in feature evidence.
5. Run complete affected suites and applicable gates before completing a slice.
6. Require all applicable full gates before merge, including master validation. Scoped draft feedback
   is not a merge gate. Reuse evidence only when source and execution inputs are identical.
7. Record slow/flaky tests with measurements, cause, action and remeasurement in `docs/test-learning.md`.
   Fix isolation before adding retries or parallelism; unknown affected scope requires full tests.

## Governance

This constitution and the composed test-first preset govern future feature delivery. Review changes
for compliance; document scoped exceptions, rationale, owner, compensating evidence and follow-up.
Amendments require a proposal and user approval. Version amendments semantically: MAJOR for
incompatible principle changes, MINOR for new obligations, PATCH for clarification. See
`docs/testing-policy.md` for execution rules and `.specify/memory/tdd-profile.md` for capabilities.

**Version**: 1.0.0 | **Ratified**: 2026-10-13 | **Last Amended**: 2026-10-13

---

## Test-First Governance Principles *(mandatory)*

### Principle TF-1: Tests Are Executable Requirements
All implementation work MUST be preceded by executable tests. TDD, BDD, and ATDD are complementary development practices, not mutually exclusive test types. Every executable product-test artifact MUST have exactly one owning suite (`TDD`, `BDD`, or `ATDD`) for directory, task, command, and report routing. An artifact MAY provide evidence for multiple practices, requirements, or acceptance criteria, and the traceability artifact MUST record those relationships. A `Required` practice creates an evidence obligation, not a requirement for a separately owned artifact. Equivalent tests MUST NOT be duplicated across suites merely to satisfy labels.

### Principle TF-2: ATDD Acceptance Before Implementation
Every stakeholder-facing acceptance criterion, release boundary, and externally observable success criterion MUST map to Gherkin scenario evidence with the `ATDD` evidence role before implementation starts. Each user story MUST mark ATDD as `Required` or `N/A`. `N/A` is allowed only for technical-only work with no stakeholder-facing acceptance boundary and MUST include a concrete rationale plus alternative TDD or quality-gate evidence.

### Principle TF-3: BDD Behavior Before Implementation
Every user-visible behavior, business rule, alternate flow, and observable error flow MUST map to Gherkin scenario evidence with the `BDD` evidence role before implementation starts. Each user story MUST mark BDD as `Required` or `N/A`. `N/A` is allowed only for technical-only work with no observable behavior or business rule and MUST include a concrete rationale plus alternative TDD or quality-gate evidence. Scenarios providing BDD evidence MUST be mirrored by executable step definitions or equivalent test bindings.

One scenario MAY carry both `BDD` and `ATDD` evidence roles when it fully covers both intents. It MUST retain one owning suite, and traceability MUST record both roles plus an explicit rationale explaining why the behavior example and stakeholder acceptance boundary are equivalent. Separate scenarios are required when behavior examples, acceptance evidence, interfaces, outcomes, or error messages differ materially.

### Principle TF-4: TDD Red-Green-Refactor Discipline
Unit, component, integration, contract, property-based, and negative-path tests MUST be created before the corresponding production code. Each implementation task MUST follow Red → Green → Refactor: write failing tests, implement the smallest change that passes, then refactor while keeping the full suite green.

### Principle TF-5: Gherkin-to-Test Mirroring
Identifiers defined by core Spec Kit MUST be reused: `User Story 1` / `US1` / `[US1]`, `FR-001`, `SC-001`, and `T###`. This preset adds `EC-001` because core Edge Cases have no stable identifier, and adds suite-owned executable IDs such as `TDD-US1-001`, `BDD-US1-001`, and `ATDD-US1-001`. Identifiers are stable and MUST NOT be renumbered or reused after publication.

Every BDD and ATDD Gherkin scenario MUST have a stable scenario ID tag and an implemented executable test or step binding using the same ID. Each scenario-specific ID tag MUST appear immediately above exactly one `Scenario` or `Scenario Outline`; it MUST NOT be placed at feature level, where it would be inherited by every scenario. The suite tag (`@BDD` or `@ATDD`) identifies the scenario's owning suite; it does not prohibit the scenario from supporting additional evidence roles. Suite, core user-story (`@US1`), and relevant requirement or success-criterion tags (`@FR-001`, `@SC-001`, or `@EC-001`) MAY be placed at feature level and inherited by its scenarios.

BDD and ATDD scenario sets MUST be coverage-complete before implementation starts. Scenario outlines MUST enumerate required examples or record an approved sampling strategy such as pairwise coverage, boundary-value coverage, or risk-based representative coverage. Broad umbrella scenarios MUST NOT be the only evidence for unrelated functional requirements, success criteria, or edge/error conditions.

### Principle TF-6: Quality Gates Are Mandatory
The plan MUST declare applicability, commands, thresholds, blocking behavior, and evidence retention for coverage, linting, formatting, static analysis/type checking, security validation, and runtime smoke checks. Coverage is mandatory for changed production code. Other gates are mandatory when applicable to the selected stack or risk surface; `N/A` requires a concrete technical rationale. Threshold exceptions MUST be scoped, approved, and backed by compensating evidence.

Quality gates are guards around TDD and every required BDD/ATDD suite, not substitutes for product tests. Reproducible command output and CI artifacts are preferred over committed per-story reports unless audit or regulatory requirements demand versioned evidence.

### Principle TF-7: Traceability Is Non-Negotiable
Every feature MUST maintain `specs/<feature>/test-traceability.md` as its canonical requirement-to-test traceability artifact. It MUST separate the evidence artifact registry, source-to-artifact coverage map, scenario coverage matrix, BDD/ATDD applicability decisions, and quality-gate results. Commands, execution statuses, and evidence paths MUST be stored once in the owning artifact or gate entry rather than copied into source mappings. Every Functional Requirement, Success Criterion requiring buildable work, User Story, Edge Case, and externally visible error condition MUST map to planned evidence before implementation and to execution evidence before completion. Planning creates the artifact from the resolved `test-traceability-template`; task generation and implementation keep it current. Missing, stale, duplicated, under-covered, or dangling traceability data is a blocking issue.

### Principle TF-8: Professional Test Reports Are Complete
Every feature MUST maintain the minimum professional test report set without creating unnecessary duplicate documents. The implementation plan acts as the Test Plan. `specs/<feature>/test-traceability.md` acts as the combined Test Inventory, Requirements Traceability Matrix, Test Execution evidence index, Scenario Coverage Matrix, and Quality Gate Results report. `specs/<feature>/defect-log.md` acts as the Defect Report, including severity/priority policy, triage, release impact, accepted risks, and verification closure. `specs/<feature>/test-summary.md` acts as the Test Summary Report, including execution totals, coverage and traceability status, defect summary, risks/exceptions, evidence links, approvals when applicable, and Go/No-Go recommendation. At project or release level, only one aggregate Test Summary Report is created by default. The destination MUST be explicit: `rolling` mode writes `reports/test-summary.md`, while `release` mode with a release ID writes `reports/releases/<release-id>/test-summary.md`. The aggregate summary references feature reports and CI artifacts rather than duplicating overall test-plan, inventory, traceability, execution, or defect reports. CI artifacts and tool-generated reports are raw evidence referenced by these reports unless audit, regulatory, customer, or tool-integration needs require additional standalone reports.
