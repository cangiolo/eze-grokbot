# eze-grokbot

[English](README.md) | 简体中文

这里放的是可以直接装进 Grok Bot 的 skill。每个文件夹是一个完整的 skill。

## Wake on Done

你的 Bot 把耗时很长的任务交出去后（比如让 Codex CLI 或 Claude Code 写代码、跑脚本、做构建），任务一结束，派任务的 Bot 就会被叫醒、接着往下做，不用反复去查，也不会错过。

**安装**：把下面这句话发给你的主 Grok Bot。

> 安装 https://github.com/eze-is/eze-grokbot/tree/main/wake-on-done 这个 skill，并帮我设置好

它会自己装好，然后一步步带你完成设置，大约 5 分钟。你只需要打开一个开关、粘贴一把钥匙。

<details>
<summary>给 Bot 看：安装命令</summary>

把整个文件夹下载到 skill 库（tar 会保留脚本的可执行权限），然后按 `references/setup.md` 设置：

```bash
curl -sL https://codeload.github.com/eze-is/eze-grokbot/tar.gz/main \
  | tar -xz -C <skill-library> --strip-components=1 eze-grokbot-main/wake-on-done
```

</details>
