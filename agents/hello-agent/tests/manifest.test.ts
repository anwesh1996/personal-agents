import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { validateManifest } from "@personal-agents/agent-contracts";
import { AgentRegistry } from "@personal-agents/agent-registry";

const here = dirname(fileURLToPath(import.meta.url));

test("hello-agent has a different output schema than travel-craft", () => {
  const hello = JSON.parse(
    readFileSync(join(here, "../agent/manifest.json"), "utf8"),
  );
  const travel = JSON.parse(
    readFileSync(
      join(here, "../../travel-craft/agent/manifest.json"),
      "utf8",
    ),
  );
  assert.equal(validateManifest(hello).ok, true);
  assert.equal(validateManifest(travel).ok, true);
  assert.notEqual(hello.outputSchema, travel.outputSchema);
  const registry = new AgentRegistry();
  registry.register(hello);
  registry.register(travel);
  assert.equal(registry.list().length, 2);
  assert.equal(hello.ui, undefined);
});
