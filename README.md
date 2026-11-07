# personal-agents

Multi-agent workspace for personal AI agents, skills, rules, and project MCP configs.

**Platform-agnostic first** (skills, preferences, templates under the repo). **Cursor adapters** live under `.cursor/` so Claude Code or other hosts can adopt the same `skills/` and `agents/` trees later.

No web app, backend, or database lives here.

## Layout

```text
agents/                 # per-agent preferences, rules, templates, trips, outputs
  travel-planner/
skills/                 # host-agnostic SKILL.md packages
.cursor/                # Cursor MCP, skills copies, commands, rules
  mcp.json
  skills/
  commands/
  rules/
docs/                   # setup notes
tools/                  # install helpers (not large binaries)
```

## Agents

| Agent | Path | Status |
| --- | --- | --- |
| TravelPlanner | [`agents/travel-planner/`](agents/travel-planner/) | Ready — see [`docs/travel-planner-setup.md`](docs/travel-planner-setup.md) |

## Adding another agent

1. Create `agents/<name>/` with preferences, rules, templates, and `trips/` + `outputs/`.
2. Add reusable skills under `skills/<skill-name>/` (must include `SKILL.md`).
3. Mirror Cursor-facing pieces under `.cursor/skills`, `.cursor/commands`, `.cursor/rules` as needed.
4. Extend `.cursor/mcp.json` carefully (no duplicate server names; never commit secrets).
5. Document setup under `docs/`.

## Secrets

- Never commit API keys. Use `.env` (gitignored) or OS user environment variables.
- Optional Maps MCP example: `.cursor/mcp.maps.example.json`.
