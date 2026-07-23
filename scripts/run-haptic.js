#!/usr/bin/env node
"use strict";

/**
 * Plugin entry for Copilot CLI / VS Code agent plugins.
 * Resolves the plugin root across hosts, then buzzes.
 *
 * Usage: node run-haptic.js <waveform>
 */

const path = require("path");

async function drainStdin() {
  if (process.stdin.isTTY) return;
  for await (const _chunk of process.stdin) {
    // discard
  }
}

function pluginRoot() {
  return (
    process.env.PLUGIN_ROOT ||
    process.env.COPILOT_PLUGIN_ROOT ||
    process.env.CLAUDE_PLUGIN_ROOT ||
    path.resolve(__dirname, "..")
  );
}

async function main() {
  await drainStdin();

  const waveform = process.argv[2] || "completed";
  const haptic = require(path.join(
    pluginRoot(),
    "hooks",
    "mx-master-haptic",
    "haptic.js"
  ));

  await haptic.buzz(waveform);
}

main().finally(() => process.exit(0));
