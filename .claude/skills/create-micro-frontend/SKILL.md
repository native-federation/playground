---
name: next-create-micro-frontend
description: Add a new Angular application to the workspace and configure it as a native-federation micro frontend. Use when the user wants to create a new micro frontend app.
argument-hint: "[workspace][project-name]"
---

# Add Project

Create a new Angular application in the workspace and configure it as a native-federation micro frontend.

## Arguments

`$ARGUMENTS` should be the project name (e.g. `my-pilet`).

Example: `/next-create-micro-frontend workspace my-pilet`

If the project name is missing, ask the user before proceeding.

## Steps

### 1. Collect values

Parse `$ARGUMENTS` as:

- **PROJECT** — the project name (e.g. `my-pilet`)

- **WORSPACE** — the folder in which the action should take place (e.g. `tractor-store`)

`REMOTE_NAME` (`@{WORKSPACE}/{PROJECT}`) and `PORT` (next free port based on
`angular.json`) are derived automatically by the scaffold script in step 5,
so you don't need to resolve them by hand. You only need `PORT` up front for
step 3, where the native-federation init schematic requires it — pick the
next port after the highest `serve.port` or `serve-original.port` currently in
`angular.json`.

If the project name is missing, ask the user.

### 2. Generate the Angular application

Make sure the following packages are installed using pnpm:

````json
{
  "dependencies": {
    "@angular/elements": "~21.2.0",
  },
  "devDependencies": {
    "@angular-architects/native-federation-v4": "^21.1.12",
    "@softarc/native-federation": "~4.0.0",
    "@softarc/native-federation-orchestrator": "^4.0.0",
    "es-module-shims": "^2.0.10",
  }
}

```bash
pnpm ng g application ${PROJECT} --style=scss --prefix=app
````

### 3. Initialize Native Federation

Start by running the following schematic to transform the app into a schematic.

```bash
pnpm ng g @angular-architects/native-federation-v4:init --project=${PROJECT} --port=${PORT} --type=remote
```

Don't worry about the warnings, that will be fixed the next step.

### . Scaffold static federation files

Run the scaffold script. `PORT` is optional — if omitted, the script picks
the next free port based on `angular.json`:

```bash
node ${CLAUDE_SKILL_DIR}/scaffold-files.mjs ${WORKSPACE} ${PROJECT} [${PORT}]
```

This creates/updates:

- `projects/${PROJECT}/src/main.ts`
- `projects/${PROJECT}/src/app/bootstrap.ts` — if the micro frontend uses routing, uncomment the `initialNavigation()` lines in this file so the router activates inside the custom element
- `projects/${PROJECT}/federation.config.js` (name and expose path already filled in from `package.json`)
- `projects/${PROJECT}/src/env.config.ts`
- `projects/${PROJECT}/src/app/app.config.ts`
- `projects/${PROJECT}/src/app/app.routes.ts`
- `projects/${PROJECT}/public/env.config.json`
- `projects/${PROJECT}/tsconfig.federation.json`
- `projects/${PROJECT}/src/styles/_app.scss`
- `projects/${PROJECT}/src/app/app.spec.ts` (smoke test — see step 7)

And also:

- Rewrites `projects/${PROJECT}/src/index.html` to use `<par-ticle-${PROJECT}>` instead of `<app-root>`.
- Adds `lint:${PROJECT}` to the root `package.json`.
- Deletes `projects/${PROJECT}/src/bootstrap.ts`.
- Updates the `buildTarget` on the `test` architect in `angular.json`.

### 6. Verify

- Confirm `projects/${PROJECT}/` directory exists with all required files
- Run `pnpm ng build ${PROJECT}` to verify the build succeeds

### 7. Vitest unit testing suite

Check if the vitest unit testing suite works:

The workspace already has `vitest` and `jsdom` as devDependencies plus a root `vitest.config.js` — no extra installs needed. The scaffold script (step 5) already wrote `projects/${PROJECT}/src/app/app.spec.ts` and set the `buildTarget` on the `test` architect, so you only need to run the tests.

1. **Run the tests:**

   ```bash
   pnpm ng test ${PROJECT} --watch=false
   ```

   Use `--watch=false` so the run exits after a single pass. All tests under `projects/${PROJECT}/` matching `*.spec.ts` will be picked up.

2. **Verify the run passes** — if the test fails, check that:
   - The `buildTarget` in the `test` target of `angular.json` points to `${PROJECT}:esbuild:development` (not the federation `build` target)
   - The component under test does not import modules that require federation runtime (e.g. `loadRemoteModule`) — mock those if needed
   - `vitest` and `jsdom` are installed (`pnpm ls vitest jsdom`)

`@angular/build:unit-test` compiles specs through the Angular compiler, which inlines `templateUrl` / `styleUrl` into `template` / `styles` — no `resolveComponent` workaround is needed for component specs.

### 8. Summary

Report:

- Project name and remote name used
- Files created/modified
- Build result
- Any issues encountered
