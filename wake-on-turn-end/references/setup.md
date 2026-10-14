# Wake on Turn End: setup

Run on the computer where omp runs (via machine Shell). Wake on Done must already work there:
`~/.local/bin/notify-run` exists and a test notice reaches the relay.

1. Install the extension:
   ```bash
   mkdir -p ~/.omp/agent/extensions
   cp <skill-dir>/scripts/wake-on-turn-end.ts ~/.omp/agent/extensions/
   ```
   If notify-run lives elsewhere, set `OMP_WAKE_NOTIFY=/path/to/notify-run` in the omp environment.
2. Create the owners file from the example, filling in real bot ids (at minimum `default`):
   ```bash
   cp <skill-dir>/scripts/omp-owners.example.json ~/.omp/agent/omp-owners.json
   ```
   Do not commit or share this file; it contains bot ids.
3. Restart omp sessions (extensions load at start).
4. Test: in a Tern pane running omp, claim the session (or a `byCwd` prefix for a scratch dir),
   send a trivial turn (`tern send <pane> text "say hi"`, then `tern send <pane> keys Enter`), and
   confirm the owning bot receives an "External task completion notice" with `stop=stop`. Then
   `tern capture <pane> --surfaces` should show the answer. Run a second turn to confirm the loop.
5. Clean up test entries from the owners file.

Troubleshooting: no notice => check `$TMPDIR/omp-wake/<session>.notify.err`, that the owners file
is valid JSON and resolves to a bot id, and that notify-run alone can reach the relay.
