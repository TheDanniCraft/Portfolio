#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
graphify extract . --code-only --max-workers 2
graphify cluster-only . --no-label
graphify diagnose multigraph --json > graphify-out/health.json
