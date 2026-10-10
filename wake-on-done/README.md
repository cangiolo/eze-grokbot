# Wake on Done

Wake on Done wakes a bot when its long-running background task finishes: the task is wrapped with the `notify-run` wrapper, which on completion posts to a webhook relay that triggers the bot's webhook routine, so the bot resumes without polling.

## Skills

- `wake-on-done`: https://raw.githubusercontent.com/eze-is/eze-grokbot/main/wake-on-done/skills/wake-on-done/SKILL.md
- `getting-started-wake-on-done`: https://raw.githubusercontent.com/eze-is/eze-grokbot/main/wake-on-done/skills/getting-started-wake-on-done/SKILL.md

## Install a skill

Each skill is a whole folder (SKILL.md plus `scripts/` and `references/`). Download the entire folder into the Grok Bot skill library, not just SKILL.md, and keep the scripts' executable bits. For example, with the GitHub tarball (tar preserves modes):

```bash
mkdir -p <skill-library>
curl -sL https://codeload.github.com/eze-is/eze-grokbot/tar.gz/main \
  | tar -xz -C <skill-library> --strip-components=3 eze-grokbot-main/wake-on-done/skills/wake-on-done
```

Replace the last path with `eze-grokbot-main/wake-on-done/skills/getting-started-wake-on-done` for the other skill.
