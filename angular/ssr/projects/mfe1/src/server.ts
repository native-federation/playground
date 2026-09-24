import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const cors = require('cors');

import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(process.cwd(), 'dist/mfe1/browser');

const app = express();
app.use(cors());

// Readiness probe: reports the federation loader's startup status, published on
// `globalThis.__NF_FEDERATION_STATUS__` by the
// `@angular-architects/native-federation/node-preload` preload. Returns 503 when a
// remote failed to register at boot, so an orchestrator's readiness check keeps this
// instance out of rotation instead of letting it serve empty federated regions. Read
// by literal key on purpose — importing the preload module would re-run its init.
//
// Prod-only. A remote registers no remotes of its own, and the status global is
// published only by the `--import` preload — so under `ng serve` this returns 503
// (the dev SSR bridge publishes no status object). A remote's dev readiness is
// "is it serving its `remoteEntry.json`?", which is what scripts/start-dev.mjs polls.
app.get('/healthz', (_req, res) => {
  const status = (globalThis as Record<string, unknown>)['__NF_FEDERATION_STATUS__'] as
    | { ok: boolean; initialized: string[]; missing: string[]; error?: string }
    | undefined;
  res.status(status?.ok ? 200 : 503).json(status ?? { ok: false, error: 'federation preload did not run' });
});

const angularApp = new AngularNodeAppEngine();

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4201;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
