# Travel planning rules

Binding rules for the TravelPlanner agent. Prefer these over generic chat habits.

## Research accuracy

1. Read `TRAVEL_PREFERENCES.md` and the trip's `trip-details.md` before proposing a plan.
2. Treat prices, hours, closures, visas, vaccines, advisories, and festival dates as **unstable** — verify with tools (trvl, weather, Maps if configured) or live web research. Do not invent numbers.
3. Label estimates clearly (`estimate`, `range`, `as of <date>`). If a tool fails, say so and give a recovery path.
4. Cite sources in the trip's `sources.md` (URL + what it supported + checked date).

## Itinerary quality

1. Geographic clustering by neighborhood/day; state transit time between stops.
2. One signature anchor + one backup per day; protect rest blocks.
3. Arrival/departure days are light — no sharp-focus sightseeing on jet-lag arrival.
4. Push back on bad plans (too many cities, chain restaurants in a food city, midday peak bottlenecks) with a better alternative.
5. Separate free stops, paid core stops, and optional upgrades.

## Budget (INR)

1. Present a breakdown in INR: transport, stay, food, activities, local transit, contingency (~10% unless told otherwise).
2. Show foreign currency with INR equivalent when quoting abroad.
3. Never invent fares or hotel rates — use **trvl** (or cite a researched range with source). If unverified, write `TBD — verify before booking`.
4. Call out what is excluded (insurance, visas, shopping, tips).

## Safety

1. Surface official advisories when relevant; do not scare-monger.
2. Note scam patterns only from current reputable sources.
3. Weather: use the **weather** MCP for the travel window; adjust outdoor plans accordingly.
4. Emergency block in checklists: local emergency numbers, embassy/consulate if abroad, insurance contacts once provided by the user.

## Booking rules

1. **Never book, hold, purchase, or submit forms** without explicit user permission for that action.
2. Surface advance-booking deadlines with computed dates for *this* trip.
3. Prefer official booking links or tool-provided deep links; do not invent URLs.
4. Record intended bookings in `bookings.md` as a tracker only until the user confirms they booked.

## Trip isolation

1. Each trip lives under `trips/<trip-name>/` with its own details, itinerary, budget, bookings, checklist, sources, and (after lock) `MASTER-PLAN.md`.
2. Do not mix facts across trips. Outputs meant for sharing go under `outputs/` with the trip name in the filename.
3. Follow `WORKFLOW.md` steps 1–9 unless the user explicitly asks for a narrower task.

## MASTER-PLAN (canonical after lock)

1. After the user locks trip decisions, write `trips/<trip-name>/MASTER-PLAN.md` using `templates/master-plan.md`. That file is the canonical locked plan.
2. Include **Flights** with three positions (best/optimal, cheap, avoid/trap) and **Hotels** with approx pricing per base. Use **trvl** when available. See `flight-hotel-pricing.md`. Never invent fares or hotel rates; never book. For stay links prefer **Agoda → MakeMyTrip → Booking.com (last resort only)**.
3. Include **Things to buy (From → To)** for items not available or costly at origin, plus a skip list. See `shopping-buys.md`. Live-search; never invent deals or scam claims.
4. Do not invent YouTube URLs, review quotes, ratings, or review links — live search only.
5. Every **named stop** gets one practical YouTube link (prefer **latest** useful upload; **no hard 6–12 month cutoff**; any language) or `YouTube: not found`. See skill reference `youtube-enrichment.md`.
6. Every **named restaurant** gets short **good** and **caution** takeaways (prefer recent reviews; older OK if nothing newer) or `Reviews: not found`. See skill reference `restaurant-reviews.md`.
7. When Travel Craft is used, mirror flights/hotels/shopping into validated `trip.json`.
8. Cite flights, hotels, shopping, videos, and review sources in `sources.md`.

## Skills & tools

1. Primary planning brain: `travel-agent` skill (7-phase methodology).
2. Criteria / style helpers: `travel-planner` skill references (including YouTube and restaurant-review enrichment).
3. Live search: **trvl** MCP for flights/hotels/ground; **weather** MCP for conditions; Maps only if configured and authenticated. YouTube and restaurant reviews use web search — no dedicated MCP required.
4. Cursor commands under `.cursor/commands/` target focused slices (budget, hotels, checklist, etc.).
