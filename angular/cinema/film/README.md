# film

The cinema's film pages (`@cinema/film`, Angular 21 in its own share scope, see
[ADR-08](../docs/decisions.md#adr-08-versions-are-aligned-by-convention)). It owns the film
details and exposes `mfe-film-detail` (routed at `/film/{filmId}`) and `nav-contribution`.
`npm start` serves it standalone on http://localhost:4302 showing film `f-1` (links stay inert
without the shell), `npm test` runs the specs and `npm run build` builds to `dist/film`.
