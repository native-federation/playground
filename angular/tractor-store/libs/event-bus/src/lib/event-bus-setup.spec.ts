import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { defineChannel } from './event-bus-setup';

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

describe('defineChannel', () => {
  let original: unknown;
  let bus: ReturnType<typeof fakeRegistry>;

  beforeEach(() => {
    original = (window as unknown as { __NF_REGISTRY__?: unknown })
      .__NF_REGISTRY__;
    bus = fakeRegistry();
    (window as unknown as { __NF_REGISTRY__: unknown }).__NF_REGISTRY__ = bus;
  });

  afterEach(() => {
    (window as unknown as { __NF_REGISTRY__?: unknown }).__NF_REGISTRY__ =
      original as never;
  });

  it('returns a handle whose emit/on target the named channel', () => {
    const ch = defineChannel<{ n: number }>('demo:channel');

    const handler = vi.fn();
    ch.on(handler);
    ch.emit({ n: 7 });

    expect(bus.emit).toHaveBeenCalledWith('demo:channel', { n: 7 });
    expect(handler).toHaveBeenCalledWith({ n: 7 });
  });

  it('keeps separate channels independent', () => {
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

  it('throws when the bus is missing at channel creation', () => {
    (window as unknown as { __NF_REGISTRY__?: unknown }).__NF_REGISTRY__ =
      undefined;
    expect(() => defineChannel('demo:thing')).toThrow(/__NF_REGISTRY__/);
  });
});
