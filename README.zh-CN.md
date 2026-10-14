# eze-grokbot

[English](README.md) | 简体中文

这里放的是可以直接装进 Grok Bot 的 skill。每个文件夹是一个完整的 skill。

## Wake on Done

你的 Bot 把耗时很长的任务交出去后（比如让 Codex CLI 或 Claude Code 写代码、跑脚本、做构建），任务一结束，派任务的 Bot 就会被叫醒、接着往下做，不用反复去查，也不会错过。

**安装**：把下面这句话发给你的主 Grok Bot。

> 安装 https://github.com/eze-is/eze-grokbot/tree/main/wake-on-done 这个 skill，并帮我设置好

它会装好 skill，并创建一个助手 Bot「Wake on Done relay」，由它在自己的聊天里一步步带你完成设置（约 5 分钟）。你只需要批准一张卡片、粘贴一个地址和一把钥匙。

<details>
<summary>给 Bot 看：安装命令</summary>

先读 https://raw.githubusercontent.com/eze-is/eze-grokbot/main/wake-on-done/references/setup.md 的「Main bot part」并照做：发一条简短说明，安装整个文件夹（命令如下，tar 会保留脚本的可执行权限），创建 Wake on Done relay、让它开始，再把用户引到它的聊天。

```bash
curl -sL https://codeload.github.com/eze-is/eze-grokbot/tar.gz/main \
  | tar -xz -C <skill-library> --strip-components=1 eze-grokbot-main/wake-on-done
```

</details>

## Wake on Turn End

适用于一直开着的交互式编程 agent 会话（在 Tern 终端标签页里跑的 omp / oh-my-pi）：agent 每跑完一轮，不用退出，你的 Bot 就会被叫醒，用 `tern capture` 读结果，再用 `tern send` 发下一轮。它基于 Wake on Done（同一个 notify-run 和 relay），需要先装好 Wake on Done。

**安装**：把下面这句话发给你的主 Grok Bot。

> 安装 https://github.com/eze-is/eze-grokbot/tree/main/wake-on-turn-end 这个 skill，并在我的电脑上设置好

<details>
<summary>给 Bot 看：安装命令</summary>

安装整个文件夹，然后在跑 omp 的那台电脑上按 `wake-on-turn-end/references/setup.md` 操作。

```bash
curl -sL https://codeload.github.com/eze-is/eze-grokbot/tar.gz/main \
  | tar -xz -C <skill-library> --strip-components=1 eze-grokbot-main/wake-on-turn-end
```

</details>
