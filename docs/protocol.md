# Wave Link transport notes

Implementation references:

- [WaveLink.Client protocol observations](https://github.com/Agash/WaveLink.Client/blob/main/PROTOCOL.md)
- [Wave Link knob's observed Windows behavior](https://github.com/idlewatts/wavelink-knob)
- The installed Wave Link 3.2.2 macOS app: read-only evidence in
  [compatibility.md](compatibility.md).

These community references describe the local interface used by Stream Deck;
no official public protocol specification was found. Validate returned data,
ignore unknown fields and expose missing capabilities rather than guessing.

Windows discovery checks
`%LOCALAPPDATA%/Packages/Elgato.WaveLink_g54w8ztgkx496/LocalState/ws-info.json`.
Derive Local from APPDATA if needed. Try its port first, then 1884–1893. On
macOS use the same bounded range. Connect only to `127.0.0.1` with
`Origin: streamdeck://`. Verify EWL identity and a positive interface revision.
Revision alone is not a capability guarantee.

Send `{}` for parameterless calls, as verified on macOS. Channel/Mix reads
return wrapped arrays. Convert wire levels 0–1 to percent; missing fields stay
unknown. Retain received per-Mix id spelling (`id` or `mixId`) for writes.

Single-object notifications are partial patches; merge them, including per-Mix
entries. Plural notifications replace lists and remove omitted objects. Apply
snapshot replies before subsequent notifications to avoid overwriting newer
patches from an await continuation. Poll every five seconds as a fallback.

Requests time out after two seconds; handshakes after half a second. A lost
transport rejects requests and invalidates the session's queued commands.
Read back after setters and verify requested values. Never retry a timed-out
setter automatically: it may have applied.

Add future wire operations/decoding here first, test lifecycle handling, then
add shared settings/messages, Fluxta modules, manifest declarations and editors.
Preserve public identifiers and migrate saved settings when necessary.
