import {
  type AgentManifest,
  validateManifest,
  type ValidationResult,
} from "@personal-agents/agent-contracts";

export class AgentRegistry {
  private readonly agents = new Map<string, AgentManifest>();

  register(manifest: unknown): ValidationResult {
    const result = validateManifest(manifest);
    if (!result.ok) {
      return result;
    }
    const parsed = manifest as AgentManifest;
    this.agents.set(parsed.id, parsed);
    return result;
  }

  get(id: string): AgentManifest | undefined {
    return this.agents.get(id);
  }

  list(): AgentManifest[] {
    return [...this.agents.values()];
  }

  has(id: string): boolean {
    return this.agents.has(id);
  }

  resolveOutputType(id: string): string | undefined {
    return this.agents.get(id)?.outputType;
  }

  listRequiredTools(id: string): string[] {
    return this.agents.get(id)?.requiredTools ?? [];
  }
}
