# Travel Planner Skill

Travel Planner Skill is an agent skill for trip planning, destination research, and itinerary building. It is designed to work with any AI agent that can follow local skill instructions, perform live web research, and optionally execute Wanderlog MCP actions after the plan is approved.

## Works Well With

This skill is most useful when paired with [wanderlog_mcp](https://github.com/ZawYePhyo/wanderlog_mcp).

- `Travel Planner Skill` is the planning layer: it helps an agent ask better questions, research current travel facts, shape realistic itineraries, and review them before execution
- `wanderlog_mcp` is the execution layer: it lets the agent create and update trips, places, notes, hotels, checklists, and expenses directly in Wanderlog

If you want an agent to both plan a trip intelligently and write the approved version into Wanderlog, the two repos are designed to work together.

## What it does

- gathers only the missing planning criteria that materially affect the trip
- optimizes itineraries around pace, daily rhythm, budget, season, food, and logistics
- researches unstable travel facts like ticket prices, transport costs, hours, and reservation pressure
- distinguishes free stops, paid core stops, and optional paid upgrades
- plans in chat first, then translates the result into Wanderlog-friendly actions when requested

## Skill contents

- `SKILL.md`: main workflow and planning rules
- `references/planning-criteria.md`: intake criteria that materially change the itinerary
- `references/travel-guidelines.md`: live research checklist and budget / transport heuristics
- `references/itinerary-style.md`: day-shape, meal, fallback, and note-writing guidance
- `references/wanderlog-workflow.md`: practical guidance for converting an approved plan into Wanderlog updates
- `references/output-template.md`: reusable response template for presenting a complete trip

## Workflow

1. Ask only for missing high-impact planning criteria.
2. Research current destination facts that could change over time.
3. Build a realistic itinerary with budget, transport, food, and fallback logic.
4. Present the full plan in chat first.
5. Write into Wanderlog only after approval.

## Install and use

### Claude Code

Copy this skill folder to:

- `~/.claude/skills/travel-planner/`

Make sure the folder contains `SKILL.md` at the top level. If Claude Code is already running, restart it so the updated skill is picked up.

### Codex

Copy this skill folder to:

- `~/.codex/skills/travel-planner/`

Keep `SKILL.md` at the top level of that folder. If your Codex client is already open, restart or reload it before testing.

### Other agent platforms

For any agent platform that supports file-based skills:

1. Create a skill directory named `travel-planner`
2. Put `SKILL.md` at the top level
3. Keep the `references/` directory next to it
4. Restart or reload the agent if it does not hot-reload skills

Typical usage pattern:

1. Ask the agent to use the travel planning skill
2. Let it collect only the missing planning criteria
3. Review the plan in chat first
4. Only then let it create or update the Wanderlog trip

## Wanderlog note

The skill can be used without Wanderlog, but it includes explicit guidance for Wanderlog MCP workflows. On broad country-wide or multi-city trips, hotel resolution may be stricter than place search, so hotel insertion should be confirmed before it is promised.

## Repository use

This repository is intended to hold the portable skill files themselves. You can install or copy the `travel-planner` folder into your agent's local skills directory, or adapt the instructions for another skill system.


