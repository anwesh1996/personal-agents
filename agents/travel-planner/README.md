# TravelPlanner agent

Personal travel planning workspace. Platform-agnostic content lives here; Cursor loads skills/rules/MCP from `.cursor/`.

## Quick start

1. Ensure MCP servers start (see repo `docs/travel-planner-setup.md`): **trvl**, **weather**.
2. Edit `TRAVEL_PREFERENCES.md` with anything durable you know.
3. In Cursor, ask something like:

> Plan a 5-day trip from Bengaluru to [destination] in [month]. Read my TravelPlanner preferences and rules first, use trvl + weather, and save drafts under `agents/travel-planner/trips/<slug>/`.

## Layout

| Path | Role |
| --- | --- |
| `TRAVEL_PREFERENCES.md` | Durable traveler profile (read first) |
| `TRAVEL_PLANNING_RULES.md` | Binding planning rules |
| `WORKFLOW.md` | Steps 1–9 (MASTER-PLAN after lock) |
| `templates/` | trip-request, itinerary, checklist, master-plan |
| `trips/` | Per-trip working files (`MASTER-PLAN.md` = canonical after lock) |
| `outputs/` | Shareable exports |
| `rules/` | Agent rule text (also mirrored for Cursor) |

## Skills

- Primary: `skills/travel-agent` (CC BY-NC 4.0)
- Secondary: `skills/travel-planner` (MIT)

## Commands (Cursor)

`.cursor/commands/`: `plan-trip`, `research-destination`, `compare-hotels`, `optimize-itinerary`, `calculate-trip-budget`, `review-itinerary`, `prepare-travel-checklist`.
