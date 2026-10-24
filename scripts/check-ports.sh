#!/usr/bin/env bash
set -euo pipefail

for port in 3000 8000 8081 {4000..4008}; do
  if ss -H -ltn "sport = :$port" | grep -q .; then
    printf 'in use: %s\n' "$port"
  else
    printf 'free: %s\n' "$port"
  fi
done
