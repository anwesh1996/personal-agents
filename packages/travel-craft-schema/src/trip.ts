import { z } from "zod";
import { ProvenanceSchema, VerificationStatusSchema } from "@personal-agents/agent-contracts";

export const MoneyRangeSchema = z.object({
  currency: z.string().min(1),
  low: z.number().nonnegative(),
  high: z.number().nonnegative(),
  status: VerificationStatusSchema,
  notes: z.string().nullable().optional(),
});

export const MediaRefSchema = z.object({
  id: z.string(),
  kind: z.enum(["youtube", "website", "booking", "image", "other"]),
  url: z.string().url().nullable(),
  title: z.string().nullable().optional(),
  language: z.string().nullable().optional(),
  publishedApprox: z.string().nullable().optional(),
  status: VerificationStatusSchema,
  notes: z.string().nullable().optional(),
});

export const SourceRefSchema = z.object({
  id: z.string(),
  label: z.string(),
  url: z.string().url().nullable(),
  kind: z.enum([
    "youtube",
    "review",
    "official",
    "booking",
    "research",
    "other",
  ]),
  supports: z.array(z.string()).default([]),
  checkedAt: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

export const LockedDecisionSchema = z.object({
  id: z.string(),
  choice: z.string(),
  impact: z.string(),
});

export const TravellerSchema = z.object({
  adults: z.number().int().positive(),
  children: z.number().int().nonnegative().default(0),
  diet: z.array(z.string()).default([]),
  pace: z.string().nullable().optional(),
  dailyRhythm: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

export const PreferencesSchema = z.object({
  selfDrive: z.boolean(),
  transportMode: z.string(),
  stayStyle: z.string().nullable().optional(),
  roomRequirements: z.string().nullable().optional(),
  nightBudgetUsd: MoneyRangeSchema.nullable().optional(),
  interests: z.array(z.string()).default([]),
  currency: z.string().default("INR"),
});

export const AttractionSchema = z.object({
  id: z.string(),
  name: z.string(),
  optional: z.boolean().default(false),
  youtube: MediaRefSchema.nullable().optional(),
  website: MediaRefSchema.nullable().optional(),
  notes: z.string().nullable().optional(),
  coordinates: z
    .object({ lat: z.number(), lng: z.number() })
    .nullable()
    .optional(),
});

export const RestaurantSchema = z.object({
  id: z.string(),
  name: z.string(),
  city: z.string(),
  mealContext: z.string().nullable().optional(),
  vegetarianSuitability: z.string().nullable().optional(),
  preferred: z.boolean().default(false),
  good: z.array(z.string()).default([]),
  caution: z.array(z.string()).default([]),
  sourceIds: z.array(z.string()).default([]),
  reviewStatus: VerificationStatusSchema.default("estimated"),
});

export const HotelCandidateSchema = z.object({
  id: z.string(),
  position: z.enum(["best_fit", "cheap", "splurge", "alt"]),
  name: z.string().nullable(),
  approxPerNight: MoneyRangeSchema.nullable().optional(),
  approxStayTotal: MoneyRangeSchema.nullable().optional(),
  bookingSearchUrl: z.string().url().nullable().optional(),
  why: z.string().nullable().optional(),
  tradeoff: z.string().nullable().optional(),
  status: VerificationStatusSchema.default("estimated"),
});

export const AccommodationSchema = z.object({
  id: z.string(),
  base: z.string(),
  name: z.string().nullable().optional(),
  neighborhood: z.string().nullable().optional(),
  checkIn: z.string(),
  checkOut: z.string(),
  nights: z.number().int().positive(),
  priceTargetUsd: MoneyRangeSchema.nullable().optional(),
  approxPriceInr: MoneyRangeSchema.nullable().optional(),
  roomRequirements: z.string().nullable().optional(),
  bookingSearchUrl: z.string().url().nullable().optional(),
  bookingStatus: VerificationStatusSchema.default("unverified"),
  recommended: z.boolean().default(true),
  candidates: z.array(HotelCandidateSchema).default([]),
  notes: z.string().nullable().optional(),
});

export const FlightOptionSchema = z.object({
  id: z.string(),
  position: z.enum(["best_fit", "cheap", "avoid", "alt"]),
  label: z.string(),
  recommended: z.boolean().default(false),
  outbound: z.string(),
  inbound: z.string().nullable().optional(),
  stops: z.number().int().nonnegative().nullable().optional(),
  airlines: z.array(z.string()).default([]),
  pricePerPerson: MoneyRangeSchema.nullable().optional(),
  priceParty: MoneyRangeSchema.nullable().optional(),
  why: z.string().nullable().optional(),
  tradeoff: z.string().nullable().optional(),
  bookingUrl: z.string().url().nullable().optional(),
  status: VerificationStatusSchema.default("estimated"),
  searchedAt: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

/**
 * User-booked flights. May match a positioned option or be a custom itinerary
 * that differs from every recommended/cheap/avoid row — keep options[] as history.
 */
export const ConfirmedFlightSchema = z.object({
  booked: z.literal(true),
  differsFromRecommended: z.boolean(),
  matchedOptionId: z.string().nullable().optional(),
  airline: z.string().nullable().optional(),
  outbound: z.string(),
  inbound: z.string().nullable().optional(),
  outboundDepartLocal: z.string().nullable().optional(),
  outboundArriveLocal: z.string().nullable().optional(),
  inboundDepartLocal: z.string().nullable().optional(),
  inboundArriveLocal: z.string().nullable().optional(),
  stops: z.number().int().nonnegative().nullable().optional(),
  partyCount: z.number().int().positive().nullable().optional(),
  paidTotal: MoneyRangeSchema,
  bookedAt: z.string().nullable().optional(),
  confirmationRef: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

export const FlightsBlockSchema = z.object({
  need: z.string().nullable().optional(),
  outbound: z.string().nullable().optional(),
  inbound: z.string().nullable().optional(),
  /** Advisor recommendation while researching — may differ from `confirmed`. */
  recommendedOptionId: z.string().nullable().optional(),
  /** When set, this is the source of truth for itinerary/budget (overrides options). */
  confirmed: ConfirmedFlightSchema.nullable().optional(),
  planningLock: MoneyRangeSchema.nullable().optional(),
  costInr: MoneyRangeSchema.nullable().optional(),
  options: z.array(FlightOptionSchema).default([]),
  searchUrls: z.array(z.string().url()).default([]),
  searchedAt: z.string().nullable().optional(),
  notes: z.array(z.string()).default([]),
});

export const TransportSegmentSchema = z.object({
  id: z.string(),
  origin: z.string(),
  destination: z.string(),
  mode: z.string(),
  durationHours: MoneyRangeSchema.nullable().optional(),
  scenic: z.string().nullable().optional(),
  driverRequired: z.boolean().default(false),
  notes: z.string().nullable().optional(),
  status: VerificationStatusSchema.default("estimated"),
});

export const ActivitySchema = z.object({
  id: z.string(),
  type: z.enum([
    "attraction",
    "meal",
    "transport",
    "stay",
    "free_time",
    "other",
  ]),
  name: z.string(),
  startTime: z.string().nullable().optional(),
  endTime: z.string().nullable().optional(),
  optional: z.boolean().default(false),
  attractionId: z.string().nullable().optional(),
  restaurantId: z.string().nullable().optional(),
  transportId: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

export const DayPlanSchema = z.object({
  id: z.string(),
  date: z.string(),
  title: z.string(),
  base: z.string().nullable().optional(),
  weatherNote: z.string().nullable().optional(),
  weatherKind: z.enum(["typical_climate", "forecast", "unknown"]).default("typical_climate"),
  timeline: z.string().nullable().optional(),
  dayCostInr: MoneyRangeSchema.nullable().optional(),
  activities: z.array(ActivitySchema).default([]),
  attractionIds: z.array(z.string()).default([]),
  restaurantIds: z.array(z.string()).default([]),
  fallback: z.string().nullable().optional(),
  tips: z.array(z.string()).default([]),
});

export const BudgetLineSchema = z.object({
  id: z.string(),
  label: z.string(),
  amount: MoneyRangeSchema,
});

export const BudgetSchema = z.object({
  currency: z.string().default("INR"),
  partySize: z.number().int().positive(),
  lines: z.array(BudgetLineSchema),
  totalLow: z.number().nonnegative(),
  totalHigh: z.number().nonnegative(),
  midLow: z.number().nonnegative().nullable().optional(),
  midHigh: z.number().nonnegative().nullable().optional(),
  notes: z.string().nullable().optional(),
  status: VerificationStatusSchema.default("estimated"),
});

export const ShoppingBuySchema = z.object({
  id: z.string(),
  item: z.string(),
  category: z
    .enum(["food_spice", "craft", "clothing", "pharmacy", "electronics", "other"])
    .default("other"),
  reason: z.enum(["not_available_at_origin", "cheaper", "better_quality", "specialty"]),
  why: z.string(),
  where: z.string().nullable().optional(),
  approxPrice: MoneyRangeSchema.nullable().optional(),
  notes: z.string().nullable().optional(),
  status: VerificationStatusSchema.default("estimated"),
});

export const ShoppingSkipSchema = z.object({
  id: z.string(),
  item: z.string(),
  why: z.string(),
  status: VerificationStatusSchema.default("estimated"),
});

export const ShoppingSchema = z.object({
  from: z.string(),
  to: z.string(),
  buys: z.array(ShoppingBuySchema).default([]),
  skips: z.array(ShoppingSkipSchema).default([]),
  notes: z.string().nullable().optional(),
});

export const TripSchema = z.object({
  schemaVersion: z.literal("travel-craft.trip.v1"),
  id: z.string(),
  title: z.string(),
  destination: z.string(),
  status: z.enum(["draft", "locked", "suggestion_only"]).default("suggestion_only"),
  updatedAt: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  homeAirport: z.string().nullable().optional(),
  travellers: TravellerSchema,
  preferences: PreferencesSchema,
  lockedDecisions: z.array(LockedDecisionSchema).default([]),
  constraints: z.array(z.string()).default([]),
  summary: z.string().nullable().optional(),
  flights: FlightsBlockSchema.optional(),
  days: z.array(DayPlanSchema).min(1),
  attractions: z.array(AttractionSchema).default([]),
  restaurants: z.array(RestaurantSchema).default([]),
  accommodations: z.array(AccommodationSchema).default([]),
  transport: z.array(TransportSegmentSchema).default([]),
  shopping: ShoppingSchema.optional(),
  budget: BudgetSchema,
  sources: z.array(SourceRefSchema).default([]),
  prepChecklist: z.array(z.string()).default([]),
  provenance: ProvenanceSchema.optional(),
  userModifications: z
    .object({
      copiedFrom: z.string().nullable().optional(),
      notes: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
});

export type Trip = z.infer<typeof TripSchema>;

export function validateTrip(input: unknown) {
  const parsed = TripSchema.safeParse(input);
  if (parsed.success) {
    return { ok: true as const, data: parsed.data, issues: [] as { path: string; message: string }[] };
  }
  return {
    ok: false as const,
    data: null,
    issues: parsed.error.issues.map((issue) => ({
      path: issue.path.join(".") || "(root)",
      message: issue.message,
    })),
  };
}
