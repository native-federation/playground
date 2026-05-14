import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  NOOP_UNSUBSCRIBE,
  defineChannel,
  emitToChannel,
  getEventBus,
  onEventEmitted,
} from './event-bus-setup';

type Handler = (event: { data: unknown; timestamp: number }) => void;

const fakeRegistry = () => {
  const listeners = new Map<string, Handler[]>();
  return {
    on: vi.fn((type: string, cb: Handler) => {
      const arr = listeners.get(type) ?? [];
      arr.push(cb);
      listeners.set(type, arr);
      return () => {
        const next = (listeners.get(type) ?? []).filter((h) => h !== cb);
        listeners.set(type, next);
      };
    }),
    emit: vi.fn((type: string, data: unknown) => {
      for (const cb of listeners.get(type) ?? [])
        cb({ data, timestamp: Date.now() });
    }),
  };
};

describe('event-bus-setup', () => {
  let original: unknown;

  beforeEach(() => {
    original = (window as unknown as { __NF_REGISTRY__?: unknown })
      .__NF_REGISTRY__;
  });

  afterEach(() => {
    (window as unknown as { __NF_REGISTRY__?: unknown }).__NF_REGISTRY__ =
      original as never;
  });

  describe('NOOP_UNSUBSCRIBE', () => {
    it('is a callable no-op', () => {
      expect(typeof NOOP_UNSUBSCRIBE).toBe('function');
      expect(() => NOOP_UNSUBSCRIBE()).not.toThrow();
      expect(NOOP_UNSUBSCRIBE()).toBeUndefined();
    });
  });

  describe('getEventBus', () => {
    it('returns the registry when present on window', () => {
      const bus = fakeRegistry();
      (window as unknown as { __NF_REGISTRY__: unknown }).__NF_REGISTRY__ = bus;
      expect(getEventBus()).toBe(bus);
    });

    it('returns undefined when the registry is missing', () => {
      (window as unknown as { __NF_REGISTRY__?: unknown }).__NF_REGISTRY__ =
        undefined;
      expect(getEventBus()).toBeUndefined();
    });
  });

  describe('emitToChannel', () => {
    it('forwards channel and payload to the bus', () => {
      const bus = fakeRegistry();
      (window as unknown as { __NF_REGISTRY__: unknown }).__NF_REGISTRY__ = bus;
      emitToChannel('demo:thing', { foo: 1 });
      expect(bus.emit).toHaveBeenCalledWith('demo:thing', { foo: 1 });
    });

    it('does not throw when the bus is missing', () => {
      (window as unknown as { __NF_REGISTRY__?: unknown }).__NF_REGISTRY__ =
        undefined;
      expect(() => emitToChannel('demo:thing', { foo: 1 })).not.toThrow();
    });
  });

  describe('onEventEmitted', () => {
    it('subscribes to the bus and unwraps the event payload', () => {
      const bus = fakeRegistry();
      (window as unknown as { __NF_REGISTRY__: unknown }).__NF_REGISTRY__ = bus;
      const handler = vi.fn();
      onEventEmitted<{ foo: number }>('demo:thing', handler);
      bus.emit('demo:thing', { foo: 1 });
      expect(handler).toHaveBeenCalledWith({ foo: 1 });
    });

    it('returns the unsubscribe from the bus', () => {
      const bus = fakeRegistry();
      (window as unknown as { __NF_REGISTRY__: unknown }).__NF_REGISTRY__ = bus;
      const handler = vi.fn();
      const off = onEventEmitted('demo:thing', handler);
      off();
      bus.emit('demo:thing', { foo: 1 });
      expect(handler).not.toHaveBeenCalled();
    });

    it('returns NOOP_UNSUBSCRIBE when the bus is missing', () => {
      (window as unknown as { __NF_REGISTRY__?: unknown }).__NF_REGISTRY__ =
        undefined;
      const off = onEventEmitted('demo:thing', vi.fn());
      expect(off).toBe(NOOP_UNSUBSCRIBE);
    });
  });

  describe('defineChannel', () => {
    it('returns a handle whose emit/on target the named channel', () => {
      const bus = fakeRegistry();
      (window as unknown as { __NF_REGISTRY__: unknown }).__NF_REGISTRY__ = bus;
      const ch = defineChannel<{ n: number }>('demo:channel');

      const handler = vi.fn();
      ch.on(handler);
      ch.emit({ n: 7 });

      expect(bus.emit).toHaveBeenCalledWith('demo:channel', { n: 7 });
      expect(handler).toHaveBeenCalledWith({ n: 7 });
    });

    it('keeps separate channels independent', () => {
      const bus = fakeRegistry();
      (window as unknown as { __NF_REGISTRY__: unknown }).__NF_REGISTRY__ = bus;
      const a = defineChannel<number>('a');
      const b = defineChannel<number>('b');

      const seenA = vi.fn();
      const seenB = vi.fn();
      a.on(seenA);
      b.on(seenB);

      a.emit(1);
      expect(seenA).toHaveBeenCalledWith(1);
      expect(seenB).not.toHaveBeenCalled();
    });
  });
});
