import { DestroyRef, inject } from '@angular/core';
import type { NFEventRegistry } from '@softarc/native-federation-orchestrator/registry';

// Looked up on every call, so channels can be declared before the bus exists.
const bus = (): NFEventRegistry => {
  const registry = (window as { __NF_REGISTRY__?: NFEventRegistry })
    .__NF_REGISTRY__;
  if (!registry) {
    throw new Error(
      'event bus: window.__NF_REGISTRY__ is not installed (see startFederation).',
    );
  }
  return registry;
};

export interface Subscribable<T> {
  on(handler: (value: T) => void): () => void;
}

export interface Channel<T> extends Subscribable<T> {
  emit(payload: T): void;
}

// An event stream. `replay` is how many past events a new subscriber receives.
export const defineChannel = <T>(
  name: string,
  { replay = 1 }: { replay?: number } = {},
): Channel<T> => ({
  emit: (payload) => bus().emit<T>(name, payload),
  on: (handler) => bus().on<T>(name, ({ data }) => handler(data), { replay }),
});

export interface Resource<T> extends Subscribable<T> {
  publish(value: T): void;
}

// A value that is set once; `on` fires synchronously when it is already there.
export const defineResource = <T>(name: string): Resource<T> => ({
  publish: (value) => void bus().register<T>(name, value),
  on: (handler) => bus().onReady<T>(name, handler),
});

// Subscribes for the lifetime of the current injection context.
export const listenTo = <T>(
  source: Subscribable<T>,
  handler: (value: T) => void,
): void => {
  inject(DestroyRef).onDestroy(source.on(handler));
};
