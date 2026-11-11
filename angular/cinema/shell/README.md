# shell

The cinema's host application (`@cinema/shell`, Angular 22, see
[ADR-08](../docs/decisions.md#adr-08-versions-are-aligned-by-convention)). It owns the layout,
the global Material theme, the federation manifest and navigation, and holds no domain data.
`npm start` serves it on http://localhost:4300 (start the remotes for content), `npm test` runs
the specs, `npm run build` builds to `dist/shell`, and `npm run smoke [manifest-url]` checks
every remote in the manifest. See [../docs](../docs/architecture.md) for the architecture.
