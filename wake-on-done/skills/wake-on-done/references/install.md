# Installing notify-run

Load this when installing or repairing `notify-run` on the box or a user computer. Wake on Done does this itself; never ask the owner to open a terminal.

## Two kinds of machines
Each machine needs its own install and config.
- **The box**: the Grok Bot cloud computer, shared by all the owner's bots. Use Shell without machineId. One install serves every bot.
- **Each registered user computer** that runs long tasks: use machine-targeted Shell/CopyFromBox with its machineId (from ListMachines). The owner approves each command on that computer.

Needs bash, curl, python3 on each machine (macOS: python3 comes with the Xcode Command Line Tools; if missing, tell the owner).

## Key rule
The key (`crsr_...`) is collected once via the masked secret request and lands as env var `WEBHOOK_RELAY_KEY` on the box. Never print it, echo it, put it in a command line, a chat message, memory or a log. Move it only as a file. If `notify-run` or `url.env` already exists on a machine, check it first and overwrite only after the owner agrees.

## Steps
1. **Box**: run `scripts/install-box.sh '<webhook URL>'` (add `--force` only after the owner agreed to overwrite). It copies `scripts/notify-run` to `~/.local/bin/notify-run` (`chmod 700`) and writes `~/.config/webhook-relay/url.env` (mode 600) with the URL and the key taken from the env var, so the key never appears in the command. The URL isn't secret.
2. **Each user computer**: get its home dir (`echo $HOME` via machine Shell), run `mkdir -p ~/.local/bin ~/.config/webhook-relay` there, then CopyFromBox the box's `~/.local/bin/notify-run` and `~/.config/webhook-relay/url.env` to the same absolute paths on that computer, then `chmod 700 ~/.local/bin/notify-run && chmod 600 ~/.config/webhook-relay/url.env` there. CopyFromBox moves the bytes without showing them.
3. **Test each machine** (box, then every user computer): run `scripts/setup-test.sh <your bot id>` there (on a user computer, copy it over or run its one line: `~/.local/bin/notify-run --owner <your bot id> --task setup-test -- bash -c 'echo ok; exit 3'`).
   Pass = within ~1 min you are woken with `exit_code: 3`, `status: failed`, tail `ok`, and `machine` = that machine's hostname.

## Troubleshooting
| Symptom | Cause |
|---|---|
| "missing URL or key" | url.env missing or unreadable on that machine |
| HTTP 401 | wrong key (whole header pasted, or routine re-created): re-request the key, rewrite url.env everywhere |
| 2xx but no wake | `owner` isn't a teammate id of Wake on Done; look for "owner not matched" at the fallback bot |
| `python3: command not found` | install python3 on that computer (macOS: Xcode Command Line Tools) |
