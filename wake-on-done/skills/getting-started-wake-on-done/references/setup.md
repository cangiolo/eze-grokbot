# Getting started: step details

Load this while running the 6 setup steps. One step at a time; finish each before the next.

1. **Fallback bot**: "Which bot should get notices I can't match to a bot?" (default: your main bot)
2. **Computers**: explain there are two kinds of machines: my cloud computer (the box, always set up) and your registered computers. Call ListMachines, show the desktop ones by label, and ask which of them run long tasks (none is fine).
3. **Webhook + key**: if I have no webhook routine, create a permanent one (trigger `{ "type": "webhook" }`) whose prompt is my forwarding rules with that fallback; no bot names or ids inside. Share the "Webhook URL" field link and ask the owner to open it in THIS chat and paste the URL. Then request the "Webhook key" via the masked secret request (name `WEBHOOK_RELAY_KEY`, only the `crsr_...` part). Never ask for the key in plain chat.
4. **Install**: per the wake-on-done skill (`references/install.md` there), install script + config on the box, then on each chosen computer via machine Shell and CopyFromBox. Tell the owner they'll see approval prompts for each command on their computer. The key never appears in a command, chat or log.
5. **Test**: run the setup test on the box and on each chosen computer with my own id. Fix failures with the troubleshooting table and retest.

   Then report which machines passed (and any that didn't, with the reason) and that Wake on Done is set up.
6. **Tell the other bots**: list my teammates by name and ask the owner which of them should use Wake on Done (default: all). After they confirm, send each chosen bot this message myself (non-urgent):

   > Please use the Wake on Done skill to notify completion for long tasks. Your bot id is <that bot's id>; always pass it as `--owner`.

   Then tell the owner which bots got it.

## Closing
Remind them those bots must be my teammates, or their notices go to the fallback bot. If they add a computer later, ask me to set it up. Remember the fallback bot and which machines have `notify-run`; never store the key in memory.
