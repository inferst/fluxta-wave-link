# Compatibility evidence

No Wave Link version is yet claimed fully supported. This remains a development
build until the manual matrix passes on both OSes.

| OS / application                                     | Evidence                                                                                                                   | Remaining                                                                       |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| macOS / Wave Link 3.2.2 (2896), interface revision 2 | Real loopback identification and Channel/Mix reads passed; 1 Channel, 3 Mixes decoded. Overall volume/mute fields present. | Actual writes, external changes, restart, object lifecycle and Fluxta UI checks |
| Windows / Wave Link 3.x                              | Emulated RPC, dynamic port-file discovery and lifecycle tests                                                              | All real application checks; record version/build                               |
| Other versions                                       | No real checks                                                                                                             | Repeat matrix before claiming support                                           |

The real probe sent only `getApplicationInfo`, `getChannels` and `getMixes`.
It sent no setters and changed no audio settings. The observed macOS build
accepts `{}` or omitted parameters, but `params: null` returns `-32602 Invalid
params`. Channel-in-Mix entries used `id`.

## Manual acceptance matrix

Run when changing audio is intended. Record OS, Wave Link version/build,
Fluxta version and per-step results.

1. Build/link `dist/wave-link`. Open plugin settings and all three Action
   Editors. Check live names and missing choices. Reopen and verify saved values.
2. At each Target level, test volume, both adjustment signs, both bounds,
   mute/unmute/toggle. Verify other settings are unaffected and Run results work.
3. Press +5 twice rapidly, then toggle twice; both presses must count.
4. Change settings in Wave Link (and Stream Deck if available). Verify Sources
   and Events, Target ids and old/new values.
5. Set an already-current value: no duplicate Event. Check Events from this
   plugin's own writes; use conditions/idempotent setters to avoid feedback loops.
6. Rename a selected object: keep binding. Delete and recreate with the same
   name: require reselection.
7. Close Wave Link: values absent, commands fail. Restart: reconnect, hydrate
   silently, never replay commands. Repeat with a command in flight.
8. If available, check unsupported fields/revisions: report readable failure
   and absent values.

CI emulates Wave Link and runs checks on Linux, Windows and macOS. It does not
install Wave Link and does not count as real-application evidence.
