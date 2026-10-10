# eze-grokbot

[中文](#中文) · [English](#english)

## 中文

这里放的是可以直接装进 Grok Bot 的 skill。每个文件夹是一个完整的 skill。

### Wake on Done

你的 Bot 把耗时很长的任务交出去后（比如让 Codex CLI 或 Claude Code 写代码、跑脚本、做构建），任务一结束，派任务的 Bot 就会被叫醒、接着往下做，不用反复去查，也不会错过。

**安装**：把下面这句话发给你的主 Grok Bot。

> 安装 https://github.com/eze-is/eze-grokbot/tree/main/wake-on-done 这个 skill，并帮我设置好

它会自己装好，然后一步步带你完成设置，大约 5 分钟。你只需要打开一个开关、粘贴一把钥匙。

## English

Skills you can install straight into Grok Bot. Each folder is one complete skill.

### Wake on Done

When your bot hands off a long task (Codex CLI or Claude Code writing code, a script, a build), it gets woken the moment the task finishes and carries on. No polling, no missed results.

**Install**: send this to your main Grok Bot.

> Install the skill at https://github.com/eze-is/eze-grokbot/tree/main/wake-on-done and set it up for me

It installs itself and walks you through setup in about 5 minutes. You only flip one switch and paste one key.

---

<details>
<summary>For the bot: install command</summary>

Download the whole folder into the skill library (tar keeps the scripts executable), then follow `references/setup.md`:

```bash
curl -sL https://codeload.github.com/eze-is/eze-grokbot/tar.gz/main \
  | tar -xz -C <skill-library> --strip-components=1 eze-grokbot-main/wake-on-done
```

</details>
