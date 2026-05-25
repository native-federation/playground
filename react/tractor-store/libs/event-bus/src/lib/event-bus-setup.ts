import type { NFEventRegistry } from "@softarc/native-federation-orchestrator/registry";

declare global {
  interface Window {
    __NF_REGISTRY__: NFEventRegistry;
  }
}

export const NOOP_UNSUBSCRIBE = (): void => {
  // No-op: returned when there is no event bus to subscribe to.
};

export interface ChannelOnOptions {
  /**
   * Replay the last N events to a new subscriber. The underlying registry
   * defaults this to 1, so a late subscriber asynchronously receives the most
   * recently emitted value. Pass `0` to opt out.
   */
  readonly replay?: number;
}

export interface ChannelHandle<TPayload> {
  emit(payload: TPayload): void;
  /** Produce the next value from the previous one (or `undefined` if none). */
  update(reducer: (last: TPayload | undefined) => TPayload): void;
  on(
    handler: (payload: TPayload) => void,
    opts?: ChannelOnOptions,
  ): () => void;
}

export const defineChannel = <TPayload>(
  name: string,
): ChannelHandle<TPayload> => {
  const bus = (window as { __NF_REGISTRY__?: NFEventRegistry }).__NF_REGISTRY__;
  if (!bus)
    throw new Error("tried to open a channel on non-existent eventbus.");
  return Object.freeze({
    name,
    emit: (payload: TPayload) => bus.emit<TPayload>(name, payload),
    update: (reducer: (last: TPayload | undefined) => TPayload) =>
      bus.update<TPayload>(name, reducer),
    on: (handler: (payload: TPayload) => void, opts?: ChannelOnOptions) => {
      if (!bus) return NOOP_UNSUBSCRIBE;
      return bus.on<TPayload>(
        name,
        (payload) => handler(payload.data),
        opts,
      );
    },
  });
};
