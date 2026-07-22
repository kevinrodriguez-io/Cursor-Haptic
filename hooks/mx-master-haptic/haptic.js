#!/usr/bin/env node
"use strict";

/**
 * Fire MX Master 4 haptics via HapticWeb (Logi Options+ plugin).
 * Usage: node haptic.js <waveform>
 * Drains stdin so Cursor hooks don't block on unread JSON.
 */

async function drainStdin() {
  if (process.stdin.isTTY) return;
  for await (const _chunk of process.stdin) {
    // discard
  }
}

async function main() {
  await drainStdin();

  const waveform = process.argv[2] || "completed";
  const base = process.env.HAPTIC_WEB_URL || "https://local.jmw.nz:41443";
  const url = `${base.replace(/\/$/, "")}/haptic/${encodeURIComponent(waveform)}`;

  try {
    await fetch(url, {
      method: "POST",
      body: "",
      signal: AbortSignal.timeout(2000),
    });
  } catch {
    // Options+ / HapticWeb may be down; don't fail the agent loop
  }
}

main().finally(() => process.exit(0));
