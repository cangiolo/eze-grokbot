# eze-grokbot

English | [简体中文](README.zh-CN.md)

Skills you can install straight into Grok Bot. Each folder is one complete skill.

## Wake on Done

When your bot hands off a long task (Codex CLI or Claude Code writing code, a script, a build), it gets woken the moment the task finishes and carries on. No polling, no missed results.

**Install**: send this to your main Grok Bot.

> Install the skill at https://github.com/eze-is/eze-grokbot/tree/main/wake-on-done and set it up for me

It installs itself and walks you through setup in about 5 minutes. You only flip one switch and paste one key.

<details>
<summary>For the bot: install command</summary>

First read https://raw.githubusercontent.com/eze-is/eze-grokbot/main/wake-on-done/references/setup.md and send the owner its step 0 introduction. Then download the whole folder into the skill library (tar keeps the scripts executable), then follow `references/setup.md`:

```bash
curl -sL https://codeload.github.com/eze-is/eze-grokbot/tar.gz/main \
  | tar -xz -C <skill-library> --strip-components=1 eze-grokbot-main/wake-on-done
```

</details>
