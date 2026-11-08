import assert from "node:assert/strict";
import { test } from "node:test";
import { validateTrip } from "@personal-agents/travel-craft-schema";
import tripFixture from "./fixtures/sri-lanka-jan-2027.trip.json";

test("UI fixture validates before render", () => {
  const result = validateTrip(tripFixture);
  assert.equal(result.ok, true, JSON.stringify(result.issues, null, 2));
  assert.equal(result.data?.days.length, 8);
});
