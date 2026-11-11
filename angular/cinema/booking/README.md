# booking

The cinema's checkout (`@cinema/booking`, Angular 22, see
[ADR-08](../docs/decisions.md#adr-08-versions-are-aligned-by-convention)). It turns a hold into a
booking and publishes the one domain event, `booking:confirmed`. It exposes `mfe-booking-checkout`
(routed at `/booking/{screeningId}/{seats}`) and `nav-contribution`.
`npm start` serves it standalone on http://localhost:4304 with screening `s-101` and seats `A1,A2`
(Confirm emits `booking:confirmed`, but nobody listens without loyalty and notifications),
`npm test` runs the specs and `npm run build` builds to `dist/booking`.
