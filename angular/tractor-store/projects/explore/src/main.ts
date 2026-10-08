import { startFederation } from '@tractor-store/start';

void startFederation(({ env, loadRemote }) =>
  import('./features/home/bootstrap').then((m) => m.bootstrap(env, loadRemote)),
);
