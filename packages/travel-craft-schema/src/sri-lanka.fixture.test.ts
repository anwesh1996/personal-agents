import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { validateTrip, type Trip } from "./trip.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const tripPath = join(
  root,
  "examples/travel-craft/sri-lanka-jan-2027/trip.json",
);

function loadTrip(): Trip {
  const raw = JSON.parse(readFileSync(tripPath, "utf8"));
  const result = validateTrip(raw);
  assert.equal(result.ok, true, JSON.stringify(result.issues, null, 2));
  assert.ok(result.data);
  return result.data;
}

test("Sri Lanka trip.json validates against travel-craft.trip.v1", () => {
  const trip = loadTrip();
  assert.equal(trip.schemaVersion, "travel-craft.trip.v1");
  assert.equal(trip.id, "sri-lanka-jan-2027");
});

test("preserves eight days and three adult travellers", () => {
  const trip = loadTrip();
  assert.equal(trip.days.length, 8);
  assert.equal(trip.travellers.adults, 3);
  assert.deepEqual(trip.days.map((d) => d.date), [
    "2027-01-09",
    "2027-01-10",
    "2027-01-11",
    "2027-01-12",
    "2027-01-13",
    "2027-01-14",
    "2027-01-15",
    "2027-01-16",
  ]);
});

test("preserves locked decisions and constraints", () => {
  const trip = loadTrip();
  assert.equal(trip.lockedDecisions.length, 7);
  assert.equal(trip.preferences.selfDrive, false);
  assert.equal(trip.preferences.transportMode, "private_ac_car_driver");
  assert.ok(trip.constraints.some((c) => /no scenic train/i.test(c)));
  assert.ok(trip.constraints.some((c) => /No Udawalawe/i.test(c)));
  assert.ok(
    trip.lockedDecisions.some((d) => /flights booked indigo/i.test(d.choice)),
    "expected booked IndiGo lock",
  );
});

test("preserves five accommodation bases and seven restaurants", () => {
  const trip = loadTrip();
  assert.equal(trip.accommodations.length, 5);
  assert.deepEqual(
    trip.accommodations.map((a) => a.base),
    ["Colombo", "Kandy", "Nuwara Eliya", "Ella", "Mirissa"],
  );
  assert.equal(trip.restaurants.length, 7);
  const names = trip.restaurants.map((r) => r.name);
  for (const required of [
    "Green Cabin",
    "Shanmugas",
    "Hotel Saumiya",
    "Devon Restaurant",
    "Matey Hut",
    "Dhana’s Curry Pot",
    "Mum’s Kitchen",
  ]) {
    assert.ok(names.includes(required), `missing restaurant ${required}`);
  }
});

test("preserves supplied YouTube URLs and unavailable placeholders", () => {
  const trip = loadTrip();
  const withUrl = trip.attractions.filter((a) => a.youtube?.url);
  const urls = new Set(withUrl.map((a) => a.youtube?.url));
  for (const url of [
    "https://www.youtube.com/watch?v=zuj4CJrgN9g",
    "https://www.youtube.com/watch?v=WjVciGMg-yo",
    "https://www.youtube.com/watch?v=HyYBoMUagfo",
    "https://www.youtube.com/watch?v=DutVikLvbi8",
    "https://www.youtube.com/watch?v=ca3dpq6XMLs",
    "https://www.youtube.com/watch?v=L7Ls48utPF8",
    "https://www.youtube.com/watch?v=HdwhZLW6mf0",
    "https://www.youtube.com/watch?v=KZl8QFpTYQY",
  ]) {
    assert.ok(urls.has(url), `missing youtube ${url}`);
  }
  // Prefer-latest enrichment should fill almost every named stop; casino stays unavailable.
  assert.ok(withUrl.length >= 28, `expected ≥28 youtube urls, got ${withUrl.length}`);
  const unavailable = trip.attractions.filter(
    (a) => a.youtube?.status === "unavailable",
  );
  assert.ok(unavailable.length >= 1);
  assert.ok(unavailable.every((a) => a.youtube?.url == null));
  assert.ok(
    unavailable.some((a) => a.id === "attr-casino"),
    "casino should remain YouTube unavailable",
  );
});

test("whale trip is on 15 Jan and day 16 has Galle + airport transfer", () => {
  const trip = loadTrip();
  const day15 = trip.days.find((d) => d.date === "2027-01-15");
  assert.ok(day15);
  assert.ok(day15.attractionIds.includes("attr-whales"));
  const day16 = trip.days.find((d) => d.date === "2027-01-16");
  assert.ok(day16);
  assert.ok(day16.attractionIds.includes("attr-galle-fort"));
  assert.ok(
    day16.activities.some((a) => /CMB|airport|Leave Galle/i.test(a.name)),
  );
});

test("budget totals match MASTER-PLAN source figures", () => {
  const trip = loadTrip();
  assert.equal(trip.budget.totalLow, 181000);
  assert.equal(trip.budget.totalHigh, 241000);
  assert.equal(trip.budget.midLow, 200000);
  assert.equal(trip.budget.midHigh, 215000);
  assert.equal(trip.budget.lines.length, 9);
  const flightsLine = trip.budget.lines.find((l) => l.id === "bud-flights");
  assert.ok(flightsLine);
  assert.equal(flightsLine?.amount.low, 85000);
  assert.equal(flightsLine?.amount.high, 85000);
  assert.equal(flightsLine?.amount.status, "verified");
});

test("includes three positioned flight options, confirmed booking, and hotel approx pricing", () => {
  const trip = loadTrip();
  assert.ok(trip.flights);
  assert.equal(trip.flights?.options.length, 3);
  const positions = new Set(trip.flights?.options.map((o) => o.position));
  assert.ok(positions.has("best_fit"));
  assert.ok(positions.has("cheap"));
  assert.ok(positions.has("avoid"));
  assert.ok(trip.flights?.options.some((o) => o.recommended));
  assert.ok(trip.flights?.planningLock);
  assert.ok(trip.flights?.confirmed?.booked);
  assert.equal(trip.flights?.confirmed?.differsFromRecommended, true);
  assert.equal(trip.flights?.confirmed?.matchedOptionId ?? null, null);
  assert.equal(trip.flights?.confirmed?.paidTotal.low, 85000);
  assert.equal(trip.flights?.confirmed?.paidTotal.status, "verified");
  assert.match(trip.flights?.outbound ?? "", /10:45/);
  assert.match(trip.flights?.inbound ?? "", /21:30/);
  for (const stay of trip.accommodations) {
    assert.ok(
      stay.approxPriceInr || stay.priceTargetUsd,
      `${stay.base} missing approx pricing`,
    );
    assert.ok(
      stay.bookingSearchUrl && /agoda\.com/i.test(stay.bookingSearchUrl),
      `${stay.base} stay link must prefer Agoda`,
    );
    assert.ok(
      stay.bookingSearchUrl && !/booking\.com/i.test(stay.bookingSearchUrl),
      `${stay.base} must not default to Booking.com`,
    );
  }
});

test("weather is typical climate, not a forecast; no safari/train introduced", () => {
  const trip = loadTrip();
  assert.ok(trip.days.every((d) => d.weatherKind === "typical_climate"));
  assert.ok(
    trip.constraints.some((c) => /no udawalawe/i.test(c)),
    "expected explicit no-safari constraint",
  );
  assert.ok(
    trip.lockedDecisions.some((d) => /no nanu oya|car only/i.test(d.choice + d.impact)),
    "expected car-only / no scenic train lock",
  );
  assert.ok(trip.transport.every((t) => t.mode === "private_car"));
  assert.ok(!trip.transport.some((t) => /train/i.test(t.mode)));
  assert.ok(!trip.days.some((d) => /safari/i.test(d.title)));
});

test("includes From→To shopping buys and skips", () => {
  const trip = loadTrip();
  assert.ok(trip.shopping);
  assert.match(trip.shopping?.from ?? "", /Bengaluru|India/i);
  assert.match(trip.shopping?.to ?? "", /Sri Lanka/i);
  assert.ok((trip.shopping?.buys.length ?? 0) >= 3);
  assert.ok((trip.shopping?.skips.length ?? 0) >= 2);
  assert.ok(
    trip.shopping?.buys.some((b) => /tea|cinnamon/i.test(b.item)),
    "expected tea or cinnamon buy",
  );
  assert.ok(
    trip.shopping?.skips.some((s) => /gem/i.test(s.item)),
    "expected gem skip",
  );
});
