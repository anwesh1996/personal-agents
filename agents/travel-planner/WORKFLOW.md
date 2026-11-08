# TravelPlanner workflow (STEPS 1–9)

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
- Produce **three positioned flight options**: **best/optimal fit**, **cheap**, and **avoid/trap** (see skill ref `flight-hotel-pricing.md`).
- Record party-total and per-person estimates in trip currency (INR default), with `as of` timestamp — do not book.
- Prefer airline INR checkout as truth when aggregators disagree.

## STEP 4 — Stay

- Use **trvl** hotel/accommodation search; prefer neighborhoods that match pace and transit.
- For each overnight base, capture **approx nightly + stay total** and at least one recommended option (three positions when material).
- **Stay link preference:** **Agoda first**, then **MakeMyTrip**, then **Booking.com only as last resort** (Booking often shows invalid/unreliable data for this traveler). See `flight-hotel-pricing.md`.
- Do not invent rates; mark discovery vs verified pricing when the tool distinguishes them.
- Match room rules (e.g. double + extra bed); note when unconfirmed.

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
- Surface open decisions and get the user to **lock** requirements before the master plan.

## STEP 8 — MASTER-PLAN (after lock)

Do **not** write `MASTER-PLAN.md` until the user confirms locked decisions.

When locked:

1. Write `trips/<trip-name>/MASTER-PLAN.md` from `templates/master-plan.md` — this is the **canonical** locked trip plan.
2. Include **Flights** (three positions + planning lock) and **Hotels** (per-base approx pricing) per `flight-hotel-pricing.md`.
3. Include **Things to buy (From → To)** — items not available or costly at origin, plus skips — per `shopping-buys.md`.
4. For every **named stop**, add one YouTube link per `travel-planner` references/`youtube-enrichment.md` (or `YouTube: not found`).
5. For every **named restaurant**, add recent good + caution review takeaways per `restaurant-reviews.md` (or `Reviews: not found`).
6. Update `trip.json` / example pack when using Travel Craft schema (flights, hotels, shopping).
7. Point `trip-details.md` at `MASTER-PLAN.md` as canonical when useful.
8. Log flight, hotel, shopping, video, and review sources in `sources.md`.

YouTube/reviews use live web search (no dedicated MCP). Flights/hotels use **trvl** when available. Maps Grounding is optional if configured.

## STEP 9 — Save

- Finalize checklist and sources.
- Copy shareable artifacts to `outputs/` if useful.
- Leave booking actions for the user; update `bookings.md` only as a tracker.
