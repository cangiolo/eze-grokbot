# Wake on Done

Wake on Done wakes a bot when its long-running background task finishes: the task is wrapped with the `notify-run` wrapper, which on completion posts to a webhook relay that triggers the bot's webhook routine, so the bot resumes without polling.

## Skills

- `wake-on-done`: https://raw.githubusercontent.com/eze-is/eze-grokbot/main/wake-on-done/skills/wake-on-done/SKILL.md
- `getting-started-wake-on-done`: https://raw.githubusercontent.com/eze-is/eze-grokbot/main/wake-on-done/skills/getting-started-wake-on-done/SKILL.md
