# Skill attribution & evaluation

Evaluated 2026-11-07 for the TravelPlanner agent in `personal-agents`.

## Installed

### Primary — `skills/travel-agent`

| Field | Detail |
| --- | --- |
| Source | https://github.com/apljacob/travel-agent |
| License | CC BY-NC 4.0 (personal / non-commercial OK; attribution required) |
| Why primary | English elite 7-phase workflow, strong discovery/pushback, host-portable `SKILL.md` + references, no paid deps |
| Files kept | `SKILL.md`, `references/*`, `LICENSE` |

### Secondary — `skills/travel-planner`

| Field | Detail |
| --- | --- |
| Source | https://github.com/ZawYePhyo/travel-planner-skill |
| License | MIT |
| Why secondary | Clean criteria/guidelines/itinerary-style templates; complements primary without overlapping the 7-phase voice |
| Note | Wanderlog MCP is **optional** and not installed here. Prefer file-based trips under `agents/travel-planner/trips/`. |
| Files kept | `SKILL.md`, `references/*`, `LICENSE`, `README.md` (no Comet zip asset) |

## Evaluated, not installed

### `jianhao-travel-planner` — https://github.com/awangwang123/jianhao-travel-planner

| Field | Detail |
| --- | --- |
| License | MIT |
| Why skipped | China-centric sources and HTML roadbook pipeline; large Chinese-language workflow; heavy Python tooling. Valuable for HTML roadbooks if you later need that format, but overlaps primary planning and is a poor default for Bengaluru/INR personal trips. |

## Cursor adapter

Host-agnostic copies live under `skills/`. Cursor discovers copies under `.cursor/skills/`. After updating a skill in `skills/`, re-copy or re-sync into `.cursor/skills/`.
