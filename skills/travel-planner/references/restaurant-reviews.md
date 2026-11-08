# Restaurant review enrichment for MASTER-PLAN

For every **named restaurant** in the locked master plan, add short recent **good** and **caution** takeaways. No dedicated MCP is required — use live web search. Do not invent quotes, ratings, or review URLs.

## What counts as a named restaurant

Include when the plan names a specific food venue (restaurant, café, curry house, bakery, known food stall with a proper name).

Skip:

- Generic "veg lunch near X" with no venue name
- Hotel breakfast-only mentions unless a named restaurant is recommended
- Cuisine categories without a venue

## Selection rules

1. Live-search Google/Maps snippets, TripAdvisor, OpenRice, Zomato, Reddit, or local review sites as available for that city.
2. Prefer reviews from the **last 6–12 months**. If only older reviews exist, use them and mark age.
3. Capture **1–2 positive** takeaways (what travelers liked) and **1–2 caution / negative** takeaways (service, wait, spice, hygiene, tourist pricing, closed days, etc.).
4. Keep snippets short and traveler-useful — paraphrase honestly; do not invent praise or complaints.
5. Do not cherry-pick only praise. If no negatives appear in recent sources, say so (`Caution: no strong recent complaints found`) rather than fabricating one.
6. If nothing usable is found, write `Reviews: not found`.
7. Note source type and approx date when known (`Google · ~Mar 2026`).
8. Maps Grounding MCP is optional if configured; never block on it.

## Suggested search patterns

- `"<restaurant name>" "<city>" review`
- `"<restaurant name>" vegetarian` (or diet-relevant terms) when the trip has dietary constraints
- Recent-year filters when the search UI allows

## Format in MASTER-PLAN

```text
Restaurant — Good: <takeaway>; <takeaway> | Caution: <takeaway>; <takeaway> (Google / TA · ~Mon YYYY)
```

Or: `Reviews: not found`

Table form is preferred when several venues appear on one day (see `templates/master-plan.md`).

## Sources

Log review pages or search used in the trip's `sources.md` (URL or site + venue + checked date).
