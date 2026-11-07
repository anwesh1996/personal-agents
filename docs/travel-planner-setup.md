# TravelPlanner setup

Personal travel-planning agent in `personal-agents`: skills + rules + templates + project MCP. No web app, backend, or database.

## What was installed

### Skills

| Role | Path | Source | License |
| --- | --- | --- | --- |
| Primary | `skills/travel-agent/` (+ `.cursor/skills/travel-agent/`) | [apljacob/travel-agent](https://github.com/apljacob/travel-agent) | CC BY-NC 4.0 |
| Secondary | `skills/travel-planner/` (+ `.cursor/skills/travel-planner/`) | [ZawYePhyo/travel-planner-skill](https://github.com/ZawYePhyo/travel-planner-skill) | MIT |

`jianhao-travel-planner` was evaluated (MIT, strong HTML roadbooks) but **not** installed — China-centric sources and a heavy Chinese HTML pipeline; poor default for Bengaluru/INR personal use. Details: `skills/ATTRIBUTION.md`.

### MCP (project `.cursor/mcp.json`)

| Server | Status | Notes |
| --- | --- | --- |
| **trvl** | Connected (verified on Windows) | Binary at `%LOCALAPPDATA%\trvl\trvl.exe` (v1.27.0). Tool: `travel`. Telemetry off via `TRVL_NO_TELEMETRY=1`. |
| **weather** | Connected (verified on Windows) | `npx -y @dangahagan/weather-mcp@latest` (v1.35.7). Tools: `get_weather_summary`, `get_forecast`, `get_current_conditions`, `get_alerts`, `search_location`, `check_service_status`. Metric units. Analytics off by default. |
| **Google Maps Grounding Lite** | Not enabled | Needs API key. Example only: `.cursor/mcp.maps.example.json`. |

Verified sample: weather summary for **Bengaluru** returned live Open-Meteo conditions via the weather MCP.

### Agent content

- Preferences / rules / workflow: `agents/travel-planner/`
- Templates: trip-request, itinerary, travel-checklist
- `trips/` and `outputs/` with READMEs
- Cursor commands: plan-trip, research-destination, compare-hotels, optimize-itinerary, calculate-trip-budget, review-itinerary, prepare-travel-checklist

## Pending manual steps

1. **Reload Cursor MCP** after opening this repo so project `.cursor/mcp.json` is picked up. Confirm `trvl` and `weather` show as connected.
2. Edit `agents/travel-planner/TRAVEL_PREFERENCES.md` (party size, diet, passions, budget placeholders).
3. Optional: set `GOOGLE_MAPS_API_KEY` in your **user** environment (never commit it), then merge the block from `.cursor/mcp.maps.example.json` into `.cursor/mcp.json`.
4. On a new Windows machine: run `powershell -ExecutionPolicy Bypass -File tools\install-trvl.ps1` and ensure `.cursor/mcp.json` points at `%LOCALAPPDATA%\trvl\trvl.exe`.
5. User MCP already had `headroom` — left untouched (backed up under `~\.cursor\mcp.json.bak-travelplanner-*`).

## How to start

Sample prompt:

> Plan a 4-night trip from Bengaluru to Goa next month for two, mid budget, balanced pace, food-forward. Read `agents/travel-planner/TRAVEL_PREFERENCES.md` and rules first. Use trvl + weather. Save under `agents/travel-planner/trips/goa-YYYY-MM/`. Do not book anything.

Or run Cursor command **plan-trip**.

## License / usage limits

| Component | License / limits |
| --- | --- |
| travel-agent skill | CC BY-NC 4.0 — personal OK; attribution required; no commercial reuse |
| travel-planner skill | MIT |
| trvl | PolyForm Noncommercial — free noncommercial; no API key for default search; optional paid provider keys unused |
| weather-mcp | MIT — free public APIs (NOAA / Open-Meteo); fair-use rate limits |
| Maps Grounding Lite | Google Maps Platform terms; API key / demo key required if enabled |

## Key paths

```text
agents/travel-planner/TRAVEL_PREFERENCES.md
agents/travel-planner/TRAVEL_PLANNING_RULES.md
agents/travel-planner/WORKFLOW.md
agents/travel-planner/templates/
skills/travel-agent/SKILL.md
skills/travel-planner/SKILL.md
skills/ATTRIBUTION.md
.cursor/mcp.json
.cursor/mcp.maps.example.json
.cursor/commands/
.cursor/rules/travel-planner.mdc
tools/install-trvl.ps1
docs/travel-planner-setup.md
```
