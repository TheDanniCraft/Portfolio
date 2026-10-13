# Test execution learning

Record date, revision/dirty state, command, inventory, duration and resource limits, bottleneck or
flake, diagnosis, action and remeasurement. Keep raw CI evidence as artifacts. Never treat timings
from different machines as comparable without controls.

## 2026-10-13 — Bootstrap branch baseline

This PR starts from master `8bd1caf` and includes only Spec Kit/Graphify tooling and policy.
Master has no product test scripts, coverage or browser runner. Do not claim a green product-test
baseline. Before changing production behavior, establish and execute the affected test stack.

The separate donation/portal worktree produced 5 passing unit tests, 7 passing PostgreSQL integration
tests, passing lint and passing typecheck after HeroUI Pro login/install. Those files and results
are not part of this branch and do not establish coverage here. No test durations or lane counts
are adopted from that separate worktree. Tooling checks for this PR are recorded in its description.

## Entry template

Date/revision and dirty state; exact command; executed files/scenarios; pass/fail/skip counts;
wall time and worker/CPU/memory/database limits; suspected bottleneck or flaky behavior; evidence;
diagnosis and change; remeasurement; follow-up owner/status. Record changes to ownership or lane
assignment with their reason, without duplicating test evidence.
