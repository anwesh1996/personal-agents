# Target architecture

## Dependency direction

```text
apps/travel-craft-web  →  packages/travel-craft-schema
                       →  packages/agent-contracts (types only)

agents/travel-craft    →  packages/* (contracts, registry, schema)
agents/hello-agent     →  packages/agent-contracts, agent-registry

packages/agent-registry → packages/agent-contracts
packages/travel-craft-schema → packages/agent-contracts

Shared packages MUST NOT import apps/ or domain agent UI.
Agent modules MUST NOT import React apps.
```

## Cursor rules policy

- No travel content in always-on global rules
- Per-agent `.cursor/rules/<agent>.mdc` with path globs
- Optional thin platform rule for secrets / isolation only

## Canonical trip pipeline

Natural language → Travel Craft workflow (skills) → `trip.json` (validate) → Markdown/UI/export
