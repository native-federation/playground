import { NFEventRegistry } from '@softarc/native-federation-orchestrator/registry';

declare global {
  interface Window {
    __NF_REGISTRY__: NFEventRegistry;
  }
}

export const NOOP_UNSUBSCRIBE = (): void => {};

export const getEventBus = (): NFEventRegistry | undefined =>
  (window as { __NF_REGISTRY__?: NFEventRegistry }).__NF_REGISTRY__ ?? undefined;

// A typed handle for a single channel: payload type and channel name
// live together, so consumers can't typo the name or pass the wrong shape.
export interface ChannelHandle<TPayload> {
  emit(payload: TPayload): void;
  on(handler: (payload: TPayload) => void): () => void;
}

export const defineChannel = <TPayload>(
  name: string,
): ChannelHandle<TPayload> => ({
  emit: (payload) => emitToChannel<TPayload>(name, payload),
  on: (handler) => onEventEmitted<TPayload>(name, handler),
});

export const emitToChannel = <TPayload>(
  channel: string,
  payload: TPayload,
): void => {
  getEventBus()?.emit<TPayload>(channel, payload);
};

export const onEventEmitted = <TPayload>(
  channel: string,
  handler: (payload: TPayload) => void,
): (() => void) => {
  const bus = getEventBus();
  if (!bus) return NOOP_UNSUBSCRIBE;
  return bus.on<TPayload>(channel, (payload) => handler(payload.data));
};
