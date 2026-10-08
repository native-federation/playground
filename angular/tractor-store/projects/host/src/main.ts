import { startFederation } from '@tractor-store/start';

void startFederation((ctx) =>
  import('./app/bootstrap').then((m) => m.bootstrap(ctx)),
);
