import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { validateManifest } from "@personal-agents/agent-contracts";
import { AgentRegistry } from "@personal-agents/agent-registry";

const here = dirname(fileURLToPath(import.meta.url));

test("travel-craft manifest validates and registers", () => {
  const manifest = JSON.parse(
    readFileSync(join(here, "../agent/manifest.json"), "utf8"),
  );
  const result = validateManifest(manifest);
  assert.equal(result.ok, true, JSON.stringify(result.issues));
  const registry = new AgentRegistry();
  assert.equal(registry.register(manifest).ok, true);
  assert.equal(registry.resolveOutputType("travel-craft"), "travel-craft/trip");
});
