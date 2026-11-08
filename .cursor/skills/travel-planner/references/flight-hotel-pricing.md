# Flight and hotel pricing for MASTER-PLAN + trip.json

Use **trvl** MCP when available. Never invent fares or hotel rates. Never book. Label every price `estimated` unless the tool returns a verified live quote you cite with timestamp.

## Flights — three positioned options (required in MASTER-PLAN)

After origin, destination, and dates are known, search live and present **exactly three** positioned options for the party:

| Position | Meaning |
| --- | --- |
| **1 · Best / optimal fit** | Matches locked constraints (arrival window, nonstop preference, baggage needs, schedule). May cost more than cheapest. **Recommend this when it fits.** |
| **2 · Cheap** | Lowest realistic fare that still roughly meets the trip (may add stops, red-eyes, or awkward timings). Call out tradeoffs. |
| **3 · Avoid / trap** | Often the headline cheap nonstop that **fails** a locked need (wrong arrival window, kills a city day, etc.) — include so the user does not pick it by mistake. |

For each option record:

- Airlines / flight numbers when known
- Outbound and return local times
- Stops
- Est. price **per person** and **for the full party**, in trip currency (INR default)
- Why / tradeoff
- `as of <datetime>` + provider (trvl / airline site / aggregator)
- Booking or search URL when available

Also set a **planning lock band** used in the budget (party total RT). Prefer airline-site INR checkout as truth over foreign-currency aggregator quotes.

If trvl is unavailable or rate-limited: say so, use web search ranges, mark `estimated` / `unavailable` as appropriate, and still produce three positions from whatever was found.

### trvl hints

- `intent: search_flights` with `origin`, `destination`, `departure_date`, `return_date`, `currency: INR`, `sort_by: cheapest`
- Re-run or filter for arrival windows that match locked decisions (e.g. early-morning land)
- Do not present a single “best price” without the three-position table

## Hotels — per base with approx pricing (required in MASTER-PLAN)

For each overnight **base** in the itinerary:

1. Search with **trvl** `search_accommodations` / `search_hotels` when available (`location`, `check_in`, `check_out`, `adults` / `guests`, `currency: INR`, `rooms: 1` as needed).
2. Give **three positioned** sleep options when material (budget / mid / better location), or at least one **recommended** property/band plus a cheaper alt.
3. Include **approx nightly** and **approx stay total** for the party in trip currency (and USD target if the traveler set one).
4. Match room rules (e.g. double + extra bed). Note when a listing cannot confirm the extra bed.
5. Attach stay/search deep links using the **provider preference order below**. Search URL ≠ booking confirmation.
6. Mark discovery vs verified room rates when the tool distinguishes them.

### Stay search provider preference (mandatory for this traveler)

Prefer links and rate checks in this order:

1. **Agoda** (first choice)
2. **MakeMyTrip** (second choice)
3. **Booking.com** — **last resort only** when Agoda and MakeMyTrip both lack usable/valid listings, extra-bed clarity, or deep links for that base

Do **not** default MASTER-PLAN “Stay link” columns to Booking.com. Prefer Agoda, then MakeMyTrip. If a trvl result is Booking-only, still try to open/verify the same property on Agoda or MakeMyTrip before citing Booking. When Booking must be used, label it explicitly: `Booking.com (fallback — Agoda/MMT unavailable)`.

Reason: Booking.com often shows unreliable/invalid data for this traveler’s use; Agoda and MakeMyTrip are preferred for India-origin trips and INR checkout.

Suggested link patterns (fill city + dates + adults/rooms):

- Agoda: `https://www.agoda.com/search?city=<City>&checkIn=YYYY-MM-DD&checkOut=YYYY-MM-DD&rooms=1&adults=3&currencyCode=INR`
- MakeMyTrip hotels: city/date search on `https://www.makemytrip.com/hotels/` (international results for overseas cities)
- Booking.com: only if the two above fail

If live hotel search fails: keep the base, price **band** from traveler target (e.g. $25–45), and write `Hotels: live rates unavailable — using target band`. Still prefer Agoda/MMT search URLs over Booking for the band links.

## MASTER-PLAN sections

Add dedicated sections (see `templates/master-plan.md`):

- `## Flights` — need statement, three-position table, planning lock band, search links
- `## Hotels` — table per base with approx nightly / stay total / link / notes

Day-by-day stays may still reference the recommended hotel briefly.

## trip.json mapping

- `flights.options[]` — each positioned option (`best_fit` | `cheap` | `avoid` | `alt`) during research
- `flights.recommendedOptionId`, `flights.planningLock`, `flights.searchedAt`
- **`flights.confirmed`** — when the user has **booked** (may differ from every option):
  - Set `booked: true`, `differsFromRecommended: true|false`
  - `matchedOptionId`: option id if they bought one of the three rows, else `null` for a custom itinerary
  - Exact times, airline, `paidTotal` with `status: "verified"` and `low === high` when the paid total is known
  - Keep `options[]` as research history; do **not** delete them
  - Promote top-level `outbound` / `inbound` / `planningLock` / `costInr` / budget flight line to the confirmed values
  - Re-pace Day 1 / return day when arrival or departure times change
- `accommodations[]` — bases with `name` (nullable), `approxPriceInr` / `priceTargetUsd`, `candidates[]` optional positioned hotels; use `bookingStatus: "verified"` when a stay is booked
- Never mark invented prices `verified`; user-confirmed paid totals **are** `verified`

## Sources

Log trvl/search URLs and check timestamps in `sources.md`.
