# programme

The cinema's programme (`@cinema/programme`, Angular 22, see
[ADR-08](../docs/decisions.md#adr-08-versions-are-aligned-by-convention)). It owns the list of
screenings and exposes `mfe-programme-list` (routed at `/programme`) and `nav-contribution`.
`npm start` serves it standalone on http://localhost:4301 (links stay inert without the shell),
`npm test` runs the specs and `npm run build` builds to `dist/programme`.
