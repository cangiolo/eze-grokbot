#!/usr/bin/env bash
# install-box.sh: install notify-run and its config on THIS machine (normally the box).
# Usage: WEBHOOK_RELAY_KEY must already be in the environment (from the masked secret request).
#   install-box.sh '<webhook URL>' [--force]
# The key is read from the env var only; it is never printed or passed on a command line.
set -eu
U="${1:-}"; FORCE="${2:-}"
[ -n "$U" ] || { echo "usage: install-box.sh '<webhook URL>' [--force]" >&2; exit 2; }
[ -n "${WEBHOOK_RELAY_KEY:-}" ] || { echo "install-box: WEBHOOK_RELAY_KEY is not set" >&2; exit 2; }
for b in bash curl python3; do command -v "$b" >/dev/null || { echo "install-box: $b not found" >&2; exit 1; }; done
BIN=~/.local/bin/notify-run; CFG=~/.config/webhook-relay/url.env
if [ "$FORCE" != "--force" ] && { [ -e "$BIN" ] || [ -e "$CFG" ]; }; then
  echo "install-box: $BIN or $CFG already exists; check it, and rerun with --force only after the owner agrees" >&2; exit 3; fi
SRC="$(cd "$(dirname "$0")" && pwd)/notify-run"
mkdir -p ~/.local/bin ~/.config/webhook-relay
cp "$SRC" "$BIN" && chmod 700 "$BIN"
(umask 077; printf 'WEBHOOK_RELAY_URL=%s\nWEBHOOK_RELAY_KEY=%s\n' "$U" "$WEBHOOK_RELAY_KEY" > "$CFG")
echo "install-box: installed $BIN and $CFG"
