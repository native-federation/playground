# programme

The cinema's programme (`@cinema/programme`, Angular 22, see
[ADR-08](../docs/decisions.md#adr-08-versions-are-aligned-by-convention)). It owns the screenings
(when a film is shown: day, time and `screeningId → filmId`) and exposes `mfe-programme-list`
(routed at `/programme`) and `nav-contribution`.

The list owns the page, not its content: each screening card embeds film's `<mfe-film-card film-id>`
(poster, title, runtime, age label) and booking's `<mfe-booking-start screening-id>` (the Book link).
Programme passes ids as attributes and links to no other team itself. When film or booking is
absent, its tag stays undefined and renders nothing.

`npm start` serves it standalone on http://localhost:4301 (no other remotes, so cards show only
day and time), `npm test` runs the specs and `npm run build` builds to `dist/programme`.
