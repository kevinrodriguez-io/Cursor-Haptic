#!/usr/bin/env bash
# Fire MX Master 4 haptics via HapticWeb (Logi Options+ plugin).
# Usage: haptic.sh <waveform>
# Drain stdin so Cursor hooks don't block on unread JSON.

set -euo pipefail

cat >/dev/null || true

WAVEFORM="${1:-completed}"
BASE_URL="${HAPTIC_WEB_URL:-https://local.jmw.nz:41443}"

# Fire-and-forget so the agent loop isn't waiting on the mouse.
curl -sS -X POST -d '' \
  --connect-timeout 1 \
  --max-time 2 \
  "${BASE_URL}/haptic/${WAVEFORM}" \
  >/dev/null 2>&1 &

exit 0
