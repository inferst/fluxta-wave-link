# Wave Link

This standalone Fluxta Plugin Source Package controls one local Elgato Wave
Link 3 instance on Windows or macOS. Read CONTEXT.md and docs/spec.md first.

- Created with `fluxta create`. Dependencies on the SDK and CLI come from npm,
  through the pnpm catalog; use their installed public contracts. Do not patch
  Fluxta or node_modules to work around a missing capability.
- `pnpm build`, `pnpm typecheck`, `pnpm test`, `pnpm lint`,
  `pnpm format:check`, `pnpm exec fluxta validate` are the checks.
- `apps/plugin/src/wave-link/` owns discovery, RPC, protocol decoding and
  connection/state lifecycle. It imports no Fluxta code. Add future Wave Link
  features there before exposing them through actions, events and sources.
- `packages/protocol/` owns shared domain types, settings and editor messages.
- `apps/plugin/src/index.ts` starts the runtime; `runtime.ts` registers the SDK surface. Manifest declarations
  and registrations must match. Actions are standalone and return success/error.
- Types and source keys use camelCase; action/event types and source filenames
  use kebab-case. React component filenames use PascalCase.
- Never guess an object by name, manufacture mute/volume while offline, replay
  commands across connections, or publish optimistic state. Initial snapshots
  and reconnection hydration emit no mute/volume events.
- Serialize mutations, including reads for toggle and relative volume. Every
  network request has a timeout. Test lifecycle behavior with a fake transport
  and clock; tests must not change the user's real audio settings.
- Keep the sidecar bundle self-contained (`deps.alwaysBundle`). Check compatibility
  on both operating systems before calling a version supported. Record evidence
  in docs/compatibility.md; emulated protocol tests are not real-device evidence.
- Use conventional commits. Publishing, GitHub repository creation, merging,
  default-branch pushes, tags and releases require explicit user instruction.
- Issues: GitHub Issues at `inferst/fluxta-wave-link`. Use `needs-triage`,
  `needs-info`, `ready-for-agent`, `ready-for-human` and `wontfix` as appropriate.
  Cross-repository coordination for v1 lives in `fluxta/hub#23`; implementation
  and application-compatibility checks are tracked in this repository.
