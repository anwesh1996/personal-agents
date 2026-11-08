# Current-state audit

**Date:** 2026-11-07  
**Repo:** personal-agents

## 1. Folder structure (pre / early migration)

- `agents/travel-planner/` — Markdown TravelPlanner workspace (preferences, WORKFLOW 1–9, trips)
- `skills/` — host-agnostic travel-agent + travel-planner skills
- `.cursor/` — Cursor adapters (skills mirror, commands, path-scoped rules, MCP)
- `tools/` — trvl installer + weather MCP launcher
- `docs/` — setup notes
- **Added:** `packages/`, `apps/`, `agents/travel-craft/`, `agents/hello-agent/`, `examples/travel-craft/`

## 2. Technology stack

| Layer | Status |
| --- | --- |
| Cursor skills + MCP (trvl, weather) | Working |
| Markdown trip artifacts | Working (Sri Lanka locked) |
| pnpm workspace + TypeScript packages | Introduced |
| React Travel Craft UI | Scaffolded incrementally |
| Backend / DB / auth | Out of scope |

## 3. Existing features

- Full planning workflow with lock → MASTER-PLAN
- YouTube + restaurant review enrichment rules
- Live flights/hotels/weather via MCP
- Path-scoped Cursor rule (not global `.cursorrules`)

## 4. Agent implementation

- TravelPlanner = file-based MVP1
- Travel Craft = contract-first agent module + `trip.json` schema
- Hello Agent = second headless sample

## 5. UI implementation

- No prior UI; Travel Craft web app added as independent Vite app

## 6. Dependencies / MCP

- trvl, weather configured in `.cursor/mcp.json`
- Maps optional example only

## 7. Technical debt

- Dual skill copies (`skills/` ↔ `.cursor/skills/`)
- Working MD files can drift from locked MASTER-PLAN
- `plan-trip` command still referenced STEPS 1–8 historically

## 8. Missing platform pieces (addressed in plan)

- Agent registry / contracts
- Trip Zod schema + fixture tests
- Import/export/static share (later phases)

## 9. Backward-compatibility risks

- Keep `agents/travel-planner/` trips and Cursor commands working
- Do not make travel rules `alwaysApply: true`
- Do not invent URLs/prices when converting MD → JSON

## 10. Migration strategy

1. Document + introduce packages without deleting Markdown agent
2. Encode Sri Lanka as validated `trip.json`
3. Render in Travel Craft UI from JSON only
4. Add share/personalize without backend
