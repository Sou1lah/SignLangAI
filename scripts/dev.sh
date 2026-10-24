#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$root"

pnpm --filter website dev &
web_pid=$!
pnpm --filter mobile web &
mobile_pid=$!
uv run --directory ai uvicorn app.main:app --host 0.0.0.0 --port 8000 &
api_pid=$!

cleanup() {
  kill "$web_pid" "$mobile_pid" "$api_pid" 2>/dev/null || true
  wait "$web_pid" "$mobile_pid" "$api_pid" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

wait -n "$web_pid" "$mobile_pid" "$api_pid"
