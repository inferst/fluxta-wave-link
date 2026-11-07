# Version 1 — agreed scope

Primary use case: live audio control from a Fluxta deck or automation. Mute a
microphone, adjust music, or remove it from the stream while keeping it in the
personal Mix. Windows and macOS; one local Wave Link 3 on the Fluxta computer.

## Control

Three independent Targets: Channel overall, Channel in selected Mix, Mix overall.
Each supports mute/unmute/toggle, absolute volume and relative volume in
percentage points. Clamp to 0–100%. Change only the selected setting, without
clearing other levels' mute flags. Sources expose each level's own setting,
not effective audibility.

## State and Events

Expose current volume, mute and connection status. Offline, deleted and
unsupported Target values are absent, never guessed zero/false.

Events report confirmed volume/mute/connection changes regardless of initiator,
including this plugin. Identical values, new objects, startup and reconnection
hydration produce no volume/mute Events. Changes after hydration do.

## Identity and failures

Live pickers store ids; names are labels. Renames preserve bindings; deletion
requires explicit reselection even if a new object has the old name.

Detect and reconnect automatically. Show connection state, its reason and the
latest Action error. Reject offline commands without queuing/replay. Serialize
mutations, including reads for relative volume/toggle. Invalidate admitted work
on connection changes. Every network call is bounded. Actions return `success`
and `error` so scenarios can branch; Fluxta continues after a failed step.

## Extensibility and readiness

Create with Fluxta CLI. Isolate the Wave Link client/state from Fluxta and add
Actions, Events and Sources as modules. Preserve existing ids/settings; additions
requiring new settings need migration or backward-compatible defaults.

Require automated checks and real checks on both operating systems before v1
release. Document tested versions/operations. Emulated tests are not evidence
of real-application compatibility.

Deferred: hardware gain, effects, routing, fades, meters, silence detection,
multiple instances and remote connections.
