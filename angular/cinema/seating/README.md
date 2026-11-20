# seating

The cinema's seat plan (`@cinema/seating`, Angular 22, see
[ADR-08](../docs/decisions.md#adr-08-versions-are-aligned-by-convention)). It owns the seat grid and
the hold, and exposes `mfe-seating-plan` (routed at `/seating/{screeningId}`) and `nav-contribution`.
Booking's `mfe-booking-start` links here (`seating.plan {screeningId}`). The page embeds booking's
`mfe-booking-summary` and shares the hold with it as retained state on `seating:hold`; the summary's
Continue hands it to `booking.checkout` in the URL
([ADR-16](../docs/decisions.md#adr-16-seatings-hold-is-shared-state-the-handoff-stays-in-the-url)).
`npm start` serves it standalone on http://localhost:4303 with screening `s-101` (no booking, so no
summary and no Continue: without booking the page is a dead end), `npm test` runs the specs and
`npm run build` builds to `dist/seating`.
