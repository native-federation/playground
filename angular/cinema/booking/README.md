# booking

The cinema's booking (`@cinema/booking`, Angular 22, see
[ADR-08](../docs/decisions.md#adr-08-versions-are-aligned-by-convention)). It owns the price per
seat (`src/ticket-price.ts`), the booking journey and its call to action. It turns a hold into a
booking, confirms it on the page and publishes the one domain event, `booking:confirmed`.
It exposes:

- `mfe-booking-checkout`, routed at `/booking/{screeningId}/{seats}`;
- `mfe-booking-start`, a fragment that pages embed (programme puts one in every screening card);
- `mfe-booking-summary`, a fragment seating's page embeds: it shows seating's `seating:hold`, the
  price, and Continue to checkout (ADR-16).
  Its only input is the `screening-id` attribute. It renders "Book · €12 per seat" and links to
  `seating.plan`, the first step of the journey: booking decides where a booking starts;
- `nav-contribution`.

`npm start` serves it standalone on http://localhost:4304 with screening `s-101` and seats `A1,A2`
(Confirm emits `booking:confirmed`, but nobody listens without loyalty),
`npm test` runs the specs and `npm run build` builds to `dist/booking`.
