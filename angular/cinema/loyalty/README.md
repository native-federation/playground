# loyalty

The cinema's loyalty scheme (`@cinema/loyalty`, Angular 22, see
[ADR-08](../docs/decisions.md#adr-08-versions-are-aligned-by-convention)). It consumes
`booking:confirmed` with `replay: false` and earns 10 points per ticket. It exposes two elements that share
one `PointsStore`: the page `mfe-loyalty-points` (routed at `/loyalty`) and the fragment
`mfe-loyalty-badge` (mounted in the shell header), plus `nav-contribution`. Points live in memory, so a
reload resets them.
`npm start` serves it standalone on http://localhost:4305 with the badge and the page (both show 0:
nobody emits `booking:confirmed` without booking), `npm test` runs the specs and `npm run build` builds
to `dist/loyalty`.
