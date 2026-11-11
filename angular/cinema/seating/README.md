# seating

The cinema's seat plan (`@cinema/seating`, Angular 22, see
[ADR-08](../docs/decisions.md#adr-08-versions-are-aligned-by-convention)). It owns the seat grid and
the hold, and exposes `mfe-seating-plan` (routed at `/seating/{screeningId}`) and `nav-contribution`.
`npm start` serves it standalone on http://localhost:4303 with screening `s-101` (Continue emits
`nav:navigate`, but nothing navigates without the shell), `npm test` runs the specs and
`npm run build` builds to `dist/seating`.
