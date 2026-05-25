import { NFEventRegistry } from '@softarc/native-federation-orchestrator/registry';

declare global {
  interface Window {
    __NF_REGISTRY__: NFEventRegistry;
  }
}

export interface ChannelOnOptions {
  /**
   * Replay the last N events to a new subscriber. Defaults to 1 in the
   * underlying registry — i.e. a late subscriber asynchronously receives the
   * most recently emitted value. Pass `0` to opt out.
   */
  readonly replay?: number;
}

export interface ChannelHandle<TPayload> {
  readonly name: string;
  emit(payload: TPayload): void;
  /** Produce the next value from the previous one (or `undefined` if none). */
  update(reducer: (last: TPayload | undefined) => TPayload): void;
  on(
    handler: (payload: TPayload) => void,
    opts?: ChannelOnOptions,
  ): () => void;
}

const requireBus = (channelName: string): NFEventRegistry => {
  const bus = (window as { __NF_REGISTRY__?: NFEventRegistry }).__NF_REGISTRY__;
  if (!bus) {
    // The host installs __NF_REGISTRY__ synchronously at bootstrap, so this
    // should never fire at runtime. In tests, preload a registry stub via
    // the unit-test builder's setupFiles (see libs/event-bus/src/testing).
    throw new Error(
      `event-bus: __NF_REGISTRY__ is not on window (channel "${channelName}").`,
    );
  }
  return bus;
};

export const defineChannel = <TPayload>(
  name: string,
): ChannelHandle<TPayload> => {
  requireBus(name);
  return Object.freeze({
    name,
    emit: (payload: TPayload) => requireBus(name).emit<TPayload>(name, payload),
    update: (reducer: (last: TPayload | undefined) => TPayload) =>
      requireBus(name).update<TPayload>(name, reducer),
    on: (handler: (payload: TPayload) => void, opts?: ChannelOnOptions) =>
      requireBus(name).on<TPayload>(
        name,
        (event) => handler(event.data),
        opts,
      ),
  });
};
