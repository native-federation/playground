# account

The cinema's profile page (`@cinema/account`, Angular 21 in its own share scope, see
[ADR-08](../docs/decisions.md#adr-08-versions-are-aligned-by-convention)). The minimal remote:
copy this repo to start a new team. It exposes `mfe-account-profile` (routed at `/account`) and
`nav-contribution`, and shows a mock profile.
`npm start` serves it standalone on http://localhost:4307, `npm test` runs the specs and
`npm run build` builds to `dist/account`.
It is also the subject of the remote-down / redeploy walkthrough, see
[docs/testing.md](../docs/testing.md#the-remote-down--redeploy-walkthrough-readme-script).
