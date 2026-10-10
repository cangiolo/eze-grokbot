# eze-grokbot

English | [简体中文](README.zh-CN.md)

Skills you can install straight into Grok Bot. Each folder is one complete skill.

## Wake on Done

When your bot hands off a long task (Codex CLI or Claude Code writing code, a script, a build), it gets woken the moment the task finishes and carries on. No polling, no missed results.

**Install**: send this to your main Grok Bot.

> Install the skill at https://github.com/eze-is/eze-grokbot/tree/main/wake-on-done and set it up for me

It installs the skill and creates a helper bot, Wake on Done relay, which walks you through setup in its own chat (about 5 minutes). You only approve one card and paste an address and a key.

<details>
<summary>For the bot: install command</summary>

First read the "Main bot part" of https://raw.githubusercontent.com/eze-is/eze-grokbot/main/wake-on-done/references/setup.md and follow it: one short message, install the folder (command below; tar keeps the scripts executable), create Wake on Done relay, start it, and send the owner to its chat.

```bash
curl -sL https://codeload.github.com/eze-is/eze-grokbot/tar.gz/main \
  | tar -xz -C <skill-library> --strip-components=1 eze-grokbot-main/wake-on-done
```

</details>
