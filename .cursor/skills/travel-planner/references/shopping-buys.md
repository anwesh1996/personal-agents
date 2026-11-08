# Things to buy — origin → destination

Add a **Things to buy** section to MASTER-PLAN (and `trip.json`) based on the traveler’s **from** place (home / departure) and **to** place (destination / regions on the trip).

Live-search. Never invent prices, “duty-free deals,” or scam warnings without a source. Do not push shopping if the traveler asked for a no-shopping trip.

## Goal

Recommend purchases that are:

1. **Not available** (or hard to find) at the origin, or
2. **Meaningfully cheaper / better quality** at the destination than at origin, or
3. **Worth bringing home** as a specialty of the destination (with quality caveats)

Also list **skip / don’t buy** items that are tourist traps, scam-prone, or cheaper at home.

## Required context

- **From:** home city/country (default from `TRAVEL_PREFERENCES.md`, e.g. Bengaluru / India)
- **To:** country + key regions on the itinerary (e.g. Sri Lanka · hill country · south coast)
- Party diet / baggage / customs constraints when relevant

## Research rules

1. Prefer current traveler reports + official customs notes (what you may export / import).
2. Separate **food/spice**, **craft**, **clothing**, **electronics/gear**, **pharmacy** when useful.
3. For each buy: what, why (unavailable vs cheaper vs better), where to buy (named market/shop type/city), approx price band if known, baggage/customs note.
4. For each skip: why (scam, overpriced, illegal, better at origin).
5. Prefer **3–8 buys** and **2–5 skips** — not a shopping catalog.
6. Call out airport vs town pricing when it matters.
7. If nothing material: write `Things to buy: none material for this from→to pair`.

## MASTER-PLAN format

```markdown
## Things to buy (From → To)

**From:** Bengaluru / India  
**To:** Sri Lanka (Colombo · hills · south)

### Worth buying

| Item | Why (vs from) | Where | Approx | Notes |
| --- | --- | --- | --- | --- |
| … | Cheaper / better / not available at home | … | … | customs / baggage |

### Skip / don’t bother

| Item | Why |
| --- | --- |
| … | Tourist trap / cheaper at home / scam risk |
```

## trip.json

Use `shopping.from`, `shopping.to`, `shopping.buys[]`, `shopping.skips[]` with provenance `status: estimated|unverified|unavailable`.

## Sources

Cite shopping/customs references in `sources.md`.
