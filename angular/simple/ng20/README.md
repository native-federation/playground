# Native Federation v20 remote (mfe4)

A standalone Angular 20 workspace serving one remote, `mfe4`, built with
`@angular-architects/native-federation-v4@~20.4.3`.

Mirrors `../ng21` (`mfe5`, adapter v21.2.x) so the v22 host in `..` can load remotes from three
adapter generations side by side. Dependencies are isolated on the `ng20` share scope, so its
Angular 20 copies never negotiate against the host's Angular 22.

## Run

```bash
pnpm install
pnpm start          # serves mfe4 on http://localhost:4204
```

Then start the host in `..` and open `http://localhost:4200/mfe4`.
