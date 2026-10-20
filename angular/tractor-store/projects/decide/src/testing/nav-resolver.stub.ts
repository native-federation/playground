import type { Events, NavResolver } from '@tractor-store/contracts';

// Plays the host's part. register() calls a function resource to produce the
// value, so the resolver itself is wrapped.
export const publishNavResolver = (resolve: NavResolver): Promise<void> =>
  window.__NF_REGISTRY__!.register<Events['nav:resolve']>(
    'nav:resolve',
    () => resolve,
  );
