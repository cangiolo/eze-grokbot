---
name: wake-on-turn-end
description: >-
  Use when you drive an interactive CLI coding-agent session (omp / oh-my-pi) that stays open in a
  Tern terminal pane, and you need to be woken each time the agent finishes a turn, without the
  agent exiting, so you can read its answer and send the next turn. Builds on Wake on Done (same
  notify-run, webhook and relay). Also use to install the omp extension, claim a session for a bot,
  or fix missing turn notices. Triggers: interactive agent session, omp turn finished, oh-my-pi,
  Tern pane, tern send, tern capture, wake me after each turn, multi-turn coding agent, claim session.
---
# Wake on Turn End

## Core principle
Wake on Done wakes you when a command **exits**. An interactive agent session never exits: it
finishes a turn and waits. The `wake-on-turn-end` omp extension closes that gap: every time the
**main** omp session settles (subagents never trigger), it calls `notify-run` detached, so the Wake
on Done relay wakes the bot that owns the session. You read the result and send the next turn into
the same session. No polling, no wrapping the agent in notify-run.

Requires Wake on Done to be set up on that computer first (`~/.local/bin/notify-run` with a working
relay webhook). If it is not, set up Wake on Done first.

## Who gets woken: the owners file
`~/.omp/agent/omp-owners.json` (example: `scripts/omp-owners.example.json`):

```json
{ "bySession": { "<session-id>": "<bot id>" },
  "byCwd": { "/abs/or/~/prefix": "<bot id>" },
  "default": "<bot id>" }
```

Resolution: `bySession` exact match > longest `byCwd` prefix (`~` expanded) > `default`.
No match (and no `default`) => no notice. The env var `GROKBOT_OWNER`, if set in the omp process,
overrides the file. Notices go to the bot id, so always put **bot ids**, never names.

**Claim before you send**: if you are driving a session, write yourself into `bySession` (or a
`byCwd` prefix for the project) *before* sending the turn, then remove your entry when you are done.
Edit the JSON in place; keep other bots' entries.

## Turn loop (Tern)
1. Find the pane: `tern` lists panes/sessions; note the pane id of the omp session.
2. Claim it in the owners file (above).
3. Send the turn as two calls, text then Enter:
   `tern send <pane> text "<prompt>"`
   `tern send <pane> keys Enter`
   Never use `tern send paste` (it does not submit reliably). For long or multi-line prompts, write
   the prompt to a file on that computer and send a short line such as
   `Read /path/to/prompt.md and do what it says.`
4. End your turn. When omp settles, the extension runs notify-run, the relay forwards an
   "External task completion notice" to you. The notice carries `cwd`, `session`, `stop=` reason
   (`stop|length|toolUse|error|aborted`) and the first ~160 chars of the last answer.
5. Read the full answer: `tern capture <pane> --surfaces` (add `--scrollback` for long output).
6. Decide: send the next turn (back to step 3) or finish and drop your claim.

A failed turn (`error` / `aborted`) arrives as a failed exit, same as Wake on Done.

## Install the extension
See `references/setup.md`.

## Limits
- omp only. Claude Code / Codex interactive sessions need their own Stop hook with the same logic.
- One notice per settled turn; continuation passes (`stop_hook_active`) are skipped.
- The extension never blocks or breaks the session: all errors are swallowed; notify-run stderr goes
  to `$TMPDIR/omp-wake/<session>.notify.err`.
