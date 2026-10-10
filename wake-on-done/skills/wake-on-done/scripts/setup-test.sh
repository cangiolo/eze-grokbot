#!/usr/bin/env bash
# setup-test.sh: send a test notice from THIS machine. Run it on each machine with your own bot id.
# Pass = within ~1 min you are woken with exit_code 3, status failed, output_tail "ok", machine = this hostname.
set -u
[ -n "${1:-}" ] || { echo "usage: setup-test.sh <your bot id>" >&2; exit 2; }
exec ~/.local/bin/notify-run --owner "$1" --task setup-test -- bash -c 'echo ok; exit 3'
