# notifications

The cinema's toasts (`@cinema/notifications`, Angular 21 in its own share scope, see
[ADR-08](../docs/decisions.md#adr-08-versions-are-aligned-by-convention)). A fragment with no page
and no intents: the shell mounts `mfe-notifications-toast` at boot, and it shows
"Booking BR-… confirmed" for 3 s on every `booking:confirmed`. It exposes `mfe-notifications-toast`
and `nav-contribution` (with no intents).
`npm start` serves it standalone on http://localhost:4306, which is empty on purpose (nobody emits
`booking:confirmed` without booking), `npm test` runs the specs and `npm run build` builds to
`dist/notifications`.
