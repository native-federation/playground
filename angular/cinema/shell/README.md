# shell

The cinema's host application (`@cinema/shell`, Angular 22, see
[ADR-08](../docs/decisions.md#adr-08-versions-are-aligned-by-convention)). It owns the layout,
the global Material theme, the federation manifest and navigation, and holds no domain data.
At startup `defineFragments` loads every fragment the remotes declare, without waiting for them:
fragments with `slot: 'header'` are also placed in the header, the others are embedded by pages
(see [ADR-15](../docs/decisions.md#adr-15-pages-may-embed-declared-fragments-the-shell-defines-them)). The remote switcher (bottom left) loads every remote in the
manifest until you tick a different selection.
`npm start` serves it on http://localhost:4300 (start the remotes for content), `npm test` runs
the specs, `npm run build` builds to `dist/shell`, and `npm run smoke [manifest-url]` checks
every remote in the manifest. See [../docs](../docs/architecture.md) for the architecture.
