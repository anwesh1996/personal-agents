# TravelPlanner workflow (STEPS 1–8)

Use this end-to-end flow for a full trip. Narrow commands may run a subset.

## STEP 1 — Understand

- Read `TRAVEL_PREFERENCES.md`.
- Collect missing trip facts (dates, destination or constraints, party, budget, pace, must-dos).
- Write or update `trips/<trip-name>/trip-details.md` from the trip-request template.
- Confirm assumptions with the user before heavy research.

## STEP 2 — Research destination

- Seasonality, visas/entry, neighborhoods, signature experiences, safety, festivals.
- Use **weather** MCP for the date window.
- Use live research for unstable facts; log sources.

## STEP 3 — Transport

- Use **trvl** for flights and relevant ground modes from Bengaluru (or stated origin).
- Compare realistic options (nonstop vs connection, split tickets caveats).
- Record candidate options and price ranges in trip files — do not book.

## STEP 4 — Stay

- Use **trvl** hotel/accommodation search; prefer neighborhoods that match pace and transit.
- Give three positioned options with tradeoffs.
- Do not invent rates; mark discovery vs verified pricing when the tool distinguishes them.

## STEP 5 — Itinerary

- Build day-by-day with anchor + backup, meals, transit times, rest.
- Apply Maps tools only if Maps MCP is configured and authenticated.
- Save to `trips/<trip-name>/itinerary.md`.

## STEP 6 — Budget

- INR breakdown with contingency; exclude unknowns explicitly.
- Save to `trips/<trip-name>/budget.md`.

## STEP 7 — Review

- Check pacing, geography, booking deadlines, weather conflicts, preference fit.
- Push back on remaining risks; revise if needed (`review-itinerary` command).

## STEP 8 — Save

- Finalize checklist and sources.
- Copy shareable artifacts to `outputs/` if useful.
- Leave booking actions for the user; update `bookings.md` only as a tracker.
