# YouTube enrichment for MASTER-PLAN

Add one YouTube link for every **named stop** in the locked master plan. Prefer recent practical guides. Do not invent URLs.

## What counts as a named stop

Include when the plan names a specific place travelers will visit, for example:

- Attractions, temples, viewpoints, bridges, parks, beaches
- Named treks / hikes / boat tours / safaris / experiences
- Forts, museums, markets called out as stops

Skip generic neighborhood labels, hotel-only mentions, and unnamed "veg lunch" placeholders. If a restaurant is also a destination stop with a visit/tour angle, still use restaurant-reviews for food reviews; YouTube is optional for pure dining unless a useful venue walkthrough exists.

## Selection rules

1. Live-search; never invent a link or title.
2. Prefer a **practical guide / walkthrough / how-to** for that exact place over long vlogs or unrelated listicles.
3. **Prefer the latest useful upload**, but do **not** hard-limit to the last 6–12 months. If a newer video exists, pick it; if only older practical footage exists, use it and note the age (`~Mon YYYY` or `~YYYY`).
4. Search without requiring `after:YYYY` / “last year only” filters. Optional year keywords (`2025`, `2026`) help find recent uploads — they must not cause a `not found` when an older match exists.
5. If no usable video exists after a normal place-name search, write `YouTube: not found`.
6. Prefer clear place match in title/thumbnail/description over raw view count.
7. Avoid ads, pure hotel promos, and "top 10 city" listicles that barely show the stop. Skip casino gambling promo vlogs when the plan is entry-only.

## Suggested search patterns

- `"<place name>" "<city or region>" (guide OR walkthrough OR visit OR tips)`
- `"<place name>" (trek OR hike OR temple OR fort)` as relevant
- Optionally add a recent year to surface newer uploads — still accept older hits

## Format in MASTER-PLAN

```text
Place — YouTube: <url> (title · ~Mon YYYY · lang)
```

Or: `YouTube: not found`

## Sources

Log each chosen video in the trip's `sources.md` (URL, place it supports, checked date).
