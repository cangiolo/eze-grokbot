# eze-grokbot

Eze 公开的 Grok Bot 配置。每个顶层文件夹是一个完整的 skill 包（SKILL.md + scripts/ + references/）。

Eze's public Grok Bot configs. Each top-level folder is a complete skill package (SKILL.md + scripts/ + references/).

## Wake on Done

让 Bot 交给后台的长任务（Codex CLI / Claude Code 写代码、跑脚本、构建）一结束，就自动叫醒发起它的 Bot 接着干，不用再盯着或反复检查。
When a bot's long background task (Codex CLI / Claude Code, a script, a build) finishes, the bot that started it is woken and carries on.

**安装 / Install**：对你的主 Grok Bot 说 / tell your main Grok Bot:

> 安装 https://github.com/eze-is/eze-grokbot/tree/main/wake-on-done 这个 skill 并帮我设置好
> Install the skill at https://github.com/eze-is/eze-grokbot/tree/main/wake-on-done and set it up for me

它会自己装好并带你完成设置，你只需要打开一个开关、粘贴一个钥匙（约 5 分钟）。
It installs itself and walks you through setup; you only flip one switch and paste one key (~5 min).

For the bot: download the whole folder into the skill library (tar keeps the scripts executable), then follow `references/setup.md`:

```bash
curl -sL https://codeload.github.com/eze-is/eze-grokbot/tar.gz/main \
  | tar -xz -C <skill-library> --strip-components=1 eze-grokbot-main/wake-on-done
```
