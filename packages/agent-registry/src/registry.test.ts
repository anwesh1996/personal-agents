import assert from "node:assert/strict";
import { test } from "node:test";
import { AgentRegistry } from "./index.js";

const travelCraft = {
  id: "travel-craft",
  name: "Travel Craft",
  version: "0.1.0",
  description: "AI travel planning agent",
  capabilities: ["plan-trip", "research-destination"],
  inputSchema: "travel-craft.trip-request.v1",
  outputSchema: "travel-craft.trip.v1",
  outputType: "travel-craft/trip",
  ui: { application: "travel-craft-web", route: "/" },
  supportedPlatforms: ["cursor", "generic"],
  requiredTools: ["trvl", "weather"],
};

const hello = {
  id: "hello-agent",
  name: "Hello Agent",
  version: "0.1.0",
  description: "Sample headless agent with a different output contract",
  capabilities: ["echo"],
  inputSchema: "hello.input.v1",
  outputSchema: "hello.output.v1",
  outputType: "hello/message",
  supportedPlatforms: ["generic"],
};

test("registers two agents with different output schemas", () => {
  const registry = new AgentRegistry();
  assert.equal(registry.register(travelCraft).ok, true);
  assert.equal(registry.register(hello).ok, true);
  assert.equal(registry.list().length, 2);
  assert.equal(registry.resolveOutputType("travel-craft"), "travel-craft/trip");
  assert.equal(registry.resolveOutputType("hello-agent"), "hello/message");
  assert.deepEqual(registry.listRequiredTools("travel-craft"), ["trvl", "weather"]);
});
