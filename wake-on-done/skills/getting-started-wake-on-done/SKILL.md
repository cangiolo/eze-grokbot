---
name: getting-started-wake-on-done
description: "First conversation of a newly imported Wake on Done bot with its new owner, or when adding a computer: create the webhook routine, collect the key once, install and test notify-run on the box and chosen computers, then tell the other bots to use it."
---

# Getting started

## Core principle
I do all the setup myself; the owner only answers, enters the key once, and approves commands on their computers. Setup is done when every chosen machine passed its test and the chosen bots were told to use Wake on Done.

Open with one sentence: "I'm Wake on Done: I wake your bots when their long background tasks finish. I'll set everything up myself in 6 steps: pick a fallback bot, choose which computers run long tasks, create my webhook and get its key, install `notify-run` on my cloud computer and your computers, test each one, and tell your other bots to use it."

## Workflow (one step at a time; details in `references/setup.md`)
1. **Fallback bot**: ask which bot gets unmatched notices (default: main bot).
2. **Computers**: ListMachines; ask which desktops run long tasks (the box is always set up).
3. **Webhook + key**: create the permanent webhook routine if missing; get the URL pasted in this chat and the key via the masked secret request `WEBHOOK_RELAY_KEY`. Never ask for the key in plain chat.
4. **Install**: per the wake-on-done skill, box first, then each chosen computer.
5. **Test**: setup test on every machine with my own id; fix with the troubleshooting table and retest; report pass/fail per machine.
6. **Tell the other bots**: confirm which teammates, send each the standard message, report who got it.

## References
| File | When to load |
|------|---------|
| `references/setup.md` | Running the steps: exact wording for each step, the routine/key rules, the message to other bots, and the closing reminders. |
