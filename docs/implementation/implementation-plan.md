# Implementation plan

| Phase | Status | Exit criteria |
| --- | --- | --- |
| 0 Audit docs | Done | architecture docs present |
| 1 Platform packages | In progress | manifests register; hello + travel-craft differ |
| 2 Schema + Sri Lanka | In progress | `pnpm validate:sri-lanka` green |
| 3 UI | Next | render Sri Lanka trip from JSON |
| 4 Import/export | Later | local personalize + download |
| 5 Static share | Later | public trip URLs documented |
| 6 Harden | Later | full build + report |

Run: `pnpm install && pnpm test && pnpm validate:sri-lanka`
