#!/usr/bin/env bash
# Installs and starts all eight repos (see docs/architecture.md § Local development).
set -euo pipefail
cd "$(dirname "$0")"

repos=(shell programme film seating booking loyalty notifications account)

for repo in "${repos[@]}"; do
  [[ -d $repo ]] || { echo "start-all: missing repo folder '$repo'" >&2; exit 1; }
done

# One after another: parallel installs fight over the npm cache.
for repo in "${repos[@]}"; do
  echo "[$repo] npm install"
  npm --prefix "$repo" install
done

# Ctrl-C (or any exit) stops every dev server.
trap 'kill 0' EXIT
for repo in "${repos[@]}"; do
  npm --prefix "$repo" start 2>&1 | sed "s/^/[$repo] /" &
done
wait
