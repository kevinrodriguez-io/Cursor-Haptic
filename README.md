<p align="center">
  <img src="assets/cursor.png" alt="Cursor" width="72" height="72" />
  &nbsp;&nbsp;&nbsp;
  <img src="assets/logi-options-plus.png" alt="Logi Options+" width="72" height="72" />
</p>

<h1 align="center">Cursor × MX Master 4 Haptics</h1>

<p align="center">
  Buzzes your <strong>MX Master 4</strong> when the Cursor agent does stuff.
  Uses <a href="https://cursor.com/docs/hooks">hooks</a> +
  <a href="https://haptics.jmw.nz/">HapticWeb</a>. No Cursor extension.
</p>

## You need

1. An [MX Master 4](https://www.logitech.com/)
2. [Logi Options+](https://www.logitech.com/software/logi-options-plus.html) running
3. The [Haptic Web](https://marketplace.logi.com/plugin/HapticWeb/en) plugin installed in Options+
4. Cursor with hooks enabled

Quick check that HapticWeb is up:

```bash
curl -sS https://local.jmw.nz:41443/
curl -sS -X POST -d '' https://local.jmw.nz:41443/haptic/completed
```

Second one should make the mouse buzz.

## Install

```bash
npx cursor-hook install kevinrodriguez-io/Cursor-Haptic
```

Pick **global** (`~/.cursor`) if you want it everywhere.

From a local clone:

```bash
npx cursor-hook install /path/to/Cursor-Haptic
```

### Manual

```bash
mkdir -p ~/.cursor/hooks
cp -R hooks/mx-master-haptic ~/.cursor/hooks/
chmod +x ~/.cursor/hooks/mx-master-haptic/haptic.sh
```

Then copy the bits from [`hooks.json.example`](./hooks.json.example) into `~/.cursor/hooks.json`. Keep `"version": 1`.

## What fires what

| Hook | Waveform | When |
|------|----------|------|
| `stop` | `completed` | Agent turn is done |
| `afterAgentResponse` | `knock` | A reply lands |
| `postToolUseFailure` | `angry_alert` | A tool blows up |
| `subagentStop` | `sharp_state_change` | Subagent finishes |

Swap waveforms in `cursor-hook.config.json` (or your installed `hooks.json`). List is [here](https://haptics.jmw.nz/integrate).

## Optional

```bash
export HAPTIC_WEB_URL=https://local.jmw.nz:41443
```

## Test

```bash
echo '{}' | ~/.cursor/hooks/mx-master-haptic/haptic.sh completed
```

Or just chat in Cursor. When the agent finishes, you should feel it.

Stuck? Check **Customize → Hooks** or **View → Output → Hooks**.

## Uninstall

```bash
rm -rf ~/.cursor/hooks/mx-master-haptic
# also delete the haptic entries from ~/.cursor/hooks.json
```

## How it works

```
agent event (stop, afterAgentResponse, ...)
        ↓
hook runs haptic.sh
        ↓
POST https://local.jmw.nz:41443/haptic/{waveform}
        ↓
HapticWeb (inside Options+)
        ↓
MX Master 4 buzzes
```

## License

MIT
