# personal-agents

Multi-agent workspace for personal AI agents, skills, rules, and project MCP configs.

**Platform-agnostic first** (skills, preferences, templates under the repo). **Cursor adapters** live under `.cursor/`. **Travel Craft** is the first productized agent with a validated trip schema and web UI.

## Layout

```text
agents/                 # per-agent workspaces + contract-first modules
  travel-planner/       # Markdown planning workspace (BC)
  travel-craft/         # Travel Craft agent manifest
  hello-agent/          # sample second agent (different output contract)
apps/
  travel-craft-web/     # Travel Craft UI (renders trip.json)
packages/
  agent-contracts/
  agent-registry/
  travel-craft-schema/
examples/travel-craft/  # Sri Lanka fixture (MASTER-PLAN → trip.json)
skills/                 # host-agnostic SKILL.md packages
.cursor/                # Cursor MCP, skills copies, commands, path-scoped rules
docs/
tools/
```

## Quick start

```bash
pnpm install
pnpm test
pnpm validate:sri-lanka
pnpm dev:travel-craft
```

## Agents

| Agent | Path | Status |
| --- | --- | --- |
| TravelPlanner (Markdown) | [`agents/travel-planner/`](agents/travel-planner/) | Ready |
| Travel Craft | [`agents/travel-craft/`](agents/travel-craft/) | Schema + fixture + UI MVP |
| Hello Agent | [`agents/hello-agent/`](agents/hello-agent/) | Sample headless agent |

## Cursor rules

Travel rules are **path-scoped** (`.cursor/rules/travel-planner.mdc`, `alwaysApply: false`). Do not put domain travel instructions in a global always-on rule.

## Secrets

- Never commit API keys. Use `.env` (gitignored) or OS environment variables.
- Optional Maps MCP example: `.cursor/mcp.maps.example.json`.
