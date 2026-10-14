// wake-on-turn-end: when a MAIN omp session settles, notify the webhook relay
// (via notify-run) so the owning Grok Bot is woken. Subagents never trigger.
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, openSync, readFileSync, writeFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { join } from "node:path";

const HOME = homedir();
const NOTIFY = process.env.OMP_WAKE_NOTIFY || join(HOME, ".local/bin/notify-run");
const OWNERS = join(HOME, ".omp/agent/omp-owners.json");
const TAIL = 300;

function textOf(msg: any): string {
  if (!msg) return "";
  const c = msg.content;
  if (typeof c === "string") return c;
  if (Array.isArray(c)) return c.filter((p: any) => p?.type === "text").map((p: any) => p.text).join("\n");
  return "";
}

// owners file: { "bySession": { "<id>": "botId" }, "byCwd": { "/abs/prefix": "botId" }, "default": "botId" }
// bySession exact > longest byCwd prefix (~ expanded) > default. No match => no notice.
function resolveOwner(sessionId: string, cwd: string): string | undefined {
  if (process.env.GROKBOT_OWNER) return process.env.GROKBOT_OWNER;
  try {
    const m = JSON.parse(readFileSync(OWNERS, "utf8"));
    if (m.bySession?.[sessionId]) return m.bySession[sessionId];
    let best: string | undefined, len = -1;
    for (const [k, v] of Object.entries(m.byCwd ?? {})) {
      const pre = k.replace(/^~(?=\/|$)/, HOME).replace(/\/+$/, "");
      if ((cwd === pre || cwd.startsWith(pre + "/")) && pre.length > len) { best = v as string; len = pre.length; }
    }
    return best ?? m.default ?? undefined;
  } catch { return undefined; }
}

export default function (pi: any) {
  // session_stop: main session only, fires after background jobs are idle
  pi.on("session_stop", (event: any, ctx: any) => {
    try {
      if (ctx.agent && ctx.agent.kind !== "main") return;          // belt and braces
      if (event.stop_hook_active) return;                          // continuation pass
      if (!existsSync(NOTIFY)) return;
      const sessionId: string = event.session_id ?? ctx.sessionManager?.getSessionId?.() ?? "unknown";
      const title: string = ctx.sessionManager?.getSessionName?.() ?? "untitled";
      const cwd: string = ctx.cwd ?? process.cwd();
      const owner = resolveOwner(sessionId, cwd);
      if (!owner) return;

      const last: any = event.last_assistant_message;
      const reason: string = last?.stopReason ?? "stop";            // stop|length|toolUse|error|aborted
      const failed = reason === "error" || reason === "aborted";
      let body = textOf(last);
      if (failed && last?.errorMessage) body += `\n[${reason}] ${last.errorMessage}`;
      body = body.replace(/\s+/g, " ").trim().slice(0, 160);

      const dir = join(tmpdir(), "omp-wake"); mkdirSync(dir, { recursive: true, mode: 0o700 });
      // notify-run does `"$@" >"$LOG"`, so the message must live in a SEPARATE file
      const msgFile = join(dir, `${sessionId}.msg`);
      const log = join(dir, `${sessionId}.log`);
      writeFileSync(msgFile, `cwd=${cwd}\nsession=${sessionId} stop=${reason}\nlast: ${body}\n`, { mode: 0o600 });
      const errFd = openSync(join(dir, `${sessionId}.notify.err`), "w");

      const child = spawn(NOTIFY, ["--owner", owner, "--task", `omp: ${title !== "untitled" ? title : cwd.split("/").pop()}`, "--log", log,
        "--", "sh", "-c", `cat "$1"; exit ${failed ? 1 : 0}`, "sh", msgFile],
        { detached: true, stdio: ["ignore", "ignore", errFd], cwd });
      child.on("error", () => {});
      child.unref();                                              // never block omp
    } catch { /* never break the session */ }
    return undefined;                                             // allow settle, no continuation
  });
}
