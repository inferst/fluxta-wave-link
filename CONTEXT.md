# Wave Link

Fluxta's Action, Event, Value Source, Options Source and Run Variable retain
their host meanings. This plugin communicates only through the public SDK.

**Channel**: a Wave Link audio channel, addressed by its persistent id. Its
overall volume and mute are separate from its settings in each Mix.

**Mix**: a Wave Link audio mix, addressed by its id, with its own volume/mute.

**Channel in Mix**: one Channel's contribution to one Mix. Changing it does
not change the Channel's overall settings or the Mix's overall settings.

**Target**: a Channel, a Channel in Mix, or a Mix. An Action changes exactly
one Target. Names are display labels, never identity or fallback resolution.

**Volume**: the selected Target's fader setting, shown as 0–100 percent.
An adjustment is in percentage points. It is not signal level or measured
loudness. **Mute** is that Target's own mute flag, not the effective audibility
after other Targets, hardware and output devices are considered.

**Connection**: the single local Wave Link link. Connected means identification
and initial Channel/Mix reads succeeded. Without it, Target values are absent.

**Confirmed Change**: a difference between two known Wave Link states, received
through a notification or a read. It emits an Event regardless of which client
caused it. Initial state, new Targets and reconnection hydration do not emit
volume/mute Events.
