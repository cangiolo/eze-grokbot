# eze-grokbot

Eze 公开的 Grok Bot 配置。每个顶层文件夹是一个完整的 skill 包（SKILL.md + scripts/ + references/）。

Eze's public Grok Bot configs. Each top-level folder is a complete skill package (SKILL.md + scripts/ + references/).

## Install: wake-on-done

Tell your main Grok Bot: `install the wake-on-done skill from https://github.com/eze-is/eze-grokbot/tree/main/wake-on-done`

For the bot (download the whole folder into the skill library; tar keeps the scripts' executable bits):

```bash
curl -sL https://codeload.github.com/eze-is/eze-grokbot/tar.gz/main \
  | tar -xz -C <skill-library> --strip-components=1 eze-grokbot-main/wake-on-done
```
