import { z } from "zod";

export const VerificationStatusSchema = z.enum([
  "verified",
  "estimated",
  "unverified",
  "unavailable",
  "not_applicable",
]);
export type VerificationStatus = z.infer<typeof VerificationStatusSchema>;

export const ProvenanceSchema = z.object({
  status: VerificationStatusSchema,
  sourceUrl: z.string().url().nullable().optional(),
  sourceLabel: z.string().nullable().optional(),
  verifiedAt: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});
export type Provenance = z.infer<typeof ProvenanceSchema>;

export const AgentUiBindingSchema = z
  .object({
    application: z.string().optional(),
    renderer: z.string().optional(),
    route: z.string().optional(),
  })
  .optional();

export const AgentManifestSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  version: z.string().min(1),
  description: z.string().min(1),
  capabilities: z.array(z.string()),
  inputSchema: z.string().min(1),
  outputSchema: z.string().min(1),
  outputType: z.string().min(1),
  ui: AgentUiBindingSchema,
  supportedPlatforms: z.array(z.string()).min(1),
  requiredTools: z.array(z.string()).optional(),
});
export type AgentManifest = z.infer<typeof AgentManifestSchema>;

export const ValidationIssueSchema = z.object({
  path: z.string(),
  message: z.string(),
});
export type ValidationIssue = z.infer<typeof ValidationIssueSchema>;

export const ValidationResultSchema = z.object({
  ok: z.boolean(),
  issues: z.array(ValidationIssueSchema),
});
export type ValidationResult = z.infer<typeof ValidationResultSchema>;

export function validateManifest(input: unknown): ValidationResult {
  const parsed = AgentManifestSchema.safeParse(input);
  if (parsed.success) {
    return { ok: true, issues: [] };
  }
  return {
    ok: false,
    issues: parsed.error.issues.map((issue) => ({
      path: issue.path.join(".") || "(root)",
      message: issue.message,
    })),
  };
}
