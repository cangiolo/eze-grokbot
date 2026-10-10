# Direct POST (CI, external services)

Load this when something other than a local command (CI, an external service) must wake a bot. Anything that can send HTTP can do it without `notify-run`:

```bash
curl -X POST "$WEBHOOK_RELAY_URL" -H "Authorization: Bearer $WEBHOOK_RELAY_KEY" \
  -H "Content-Type: application/json" \
  -d '{"owner":"<bot id>","task":"nightly-build","status":"failed","summary":"3 tests failed"}'
```

Required: `owner`, `task`. Recommended: `status` or `exit_code`, and a short `summary` or `log_path`. Keep the key in the service's secret settings, never in code. A `{"success":true,...}` reply only means the routine fired.
