import { startFederation } from '@tractor-store/start';

void startFederation(({ env, loadRemote }) =>
  import('./features/product/bootstrap').then((m) =>
    m.bootstrap(env, loadRemote),
  ),
);
