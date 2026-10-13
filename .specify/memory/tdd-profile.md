---
detected_at: 8bd1caf
ecosystems: [typescript]
default: typescript
stacks:
  typescript:
    cwd: .
    runner: null
    single: null
    file: null
    suite: null
    watch: null
    coverage: null
    mutation: null
    acceptance: null
    property: null
    approval: null
    contract: null
    test_glob: null
    exemplar:
      unit: null
      integration: null
      acceptance: null
    helpers: []
verified: []
suite_baseline: unavailable
suite_seconds: null
---
# TDD stack profile

Detected 2026-10-13 on master `8bd1caf` plus this tooling-only bootstrap. Python powers Spec Kit;
it is not an application test ecosystem. Current master has no product test runner, application
test scripts, test files, coverage configuration or browser acceptance runner.

Do not start a production behavior TDD loop using guessed commands. Add a runner and isolated
fixtures as a separate feature, then run `$speckit-tdd-setup refresh` (Claude: `/speckit-tdd-setup`)
to verify full files, a known single test, a nonexistent-name selection, failure output and coverage.
Only verified commands belong in this profile. An unavailable baseline is not green.

Existing quality commands are `bun run lint`, `bun run typecheck` and `bun run build`; their results
are reported in the PR. Browser/Gherkin, mutation, property and contract capabilities are absent.
Plan their applicability explicitly before customer-facing production changes. No tests, fixtures
or test results from the separate donation/portal worktree are part of this branch.

The adopted constitution requires test-first delivery. Characterization tests are needed before
changes to currently untested application behavior. See `docs/testing-policy.md` for suite
ownership, isolation, complete merge gates and measured parallelization rules.
