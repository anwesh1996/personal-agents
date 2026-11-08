import assert from "node:assert/strict";
import { test } from "node:test";
import { validateManifest } from "./index.js";

test("validates a well-formed agent manifest", () => {
  const result = validateManifest({
    id: "hello-agent",
    name: "Hello Agent",
    version: "0.1.0",
    description: "Sample headless agent",
    capabilities: ["echo"],
    inputSchema: "hello.input.v1",
    outputSchema: "hello.output.v1",
    outputType: "hello/message",
    supportedPlatforms: ["generic", "cursor"],
  });
  assert.equal(result.ok, true);
});

test("rejects incomplete manifests", () => {
  const result = validateManifest({ id: "x" });
  assert.equal(result.ok, false);
  assert.ok(result.issues.length > 0);
});
