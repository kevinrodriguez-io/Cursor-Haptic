# Cursor × MX Master 4 Haptics

Feel Cursor agent events on your **Logitech MX Master 4** via [HapticWeb](https://haptics.jmw.nz/) and Cursor [hooks](https://cursor.com/docs/hooks).

No Cursor extension required — just hooks + Options+.

## Prerequisites

1. [MX Master 4](https://www.logitech.com/) (Windows or Mac)
2. [Logi Options+](https://www.logitech.com/software/logi-options-plus.html) installed and running
3. [Haptic Web Plugin](https://marketplace.logi.com/plugin/HapticWeb/en) installed in Options+
4. Cursor IDE with hooks enabled

Verify the bridge:

```bash
curl -sS https://local.jmw.nz:41443/
curl -sS -X POST -d '' https://local.jmw.nz:41443/haptic/completed
```

You should feel a buzz on the second command.

## Install (recommended)

```bash
npx cursor-hook install <your-github-user>/Cursor-Haptic
```

Choose **global** (`~/.cursor`) so it works in every project.

Or install from a local clone:

```bash
npx cursor-hook install /path/to/Cursor-Haptic
```

## Manual install

```bash
mkdir -p ~/.cursor/hooks
cp -R hooks/mx-master-haptic ~/.cursor/hooks/
chmod +x ~/.cursor/hooks/mx-master-haptic/haptic.sh
```

Merge the entries from [`hooks.json.example`](./hooks.json.example) into `~/.cursor/hooks.json` (keep `"version": 1`).

## Default mapping

| Cursor hook | Waveform | Feel |
|-------------|----------|------|
| `stop` | `completed` | Agent turn finished |
| `afterAgentResponse` | `knock` | Reply landed |
| `postToolUseFailure` | `angry_alert` | Tool failed |
| `subagentStop` | `sharp_state_change` | Subagent done |

Edit waveforms in `cursor-hook.config.json` (or your installed `hooks.json`) using any [HapticWeb waveform](https://haptics.jmw.nz/integrate).

## Optional config

```bash
# Custom HapticWeb base URL (default shown)
export HAPTIC_WEB_URL=https://local.jmw.nz:41443
```

## Test

```bash
echo '{}' | ~/.cursor/hooks/mx-master-haptic/haptic.sh completed
```

Then ask Cursor anything — when the agent finishes, the mouse should buzz. Debug in **Customize → Hooks** (execution log) or **View → Output → Hooks**.

## Uninstall

```bash
rm -rf ~/.cursor/hooks/mx-master-haptic
# Remove the haptic entries from ~/.cursor/hooks.json
```

## How it works

```
Agent event (stop / afterAgentResponse / …)
        ↓
Cursor hook runs haptic.sh
        ↓
POST https://local.jmw.nz:41443/haptic/{waveform}
        ↓
HapticWeb (Logi Actions SDK plugin in Options+)
        ↓
MX Master 4 haptic motor
```

## License

MIT
