import { Injector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { installFakeRegistry } from '../testing/install-registry-stub';
import { defineChannel, defineResource, listenTo } from './channel';
import { navigateTo } from './nav-channels';

describe('defineChannel', () => {
  beforeEach(() => installFakeRegistry());

  it('delivers emitted payloads to subscribers of the same name', () => {
    const channel = defineChannel<{ n: number }>('demo:channel');
    const seen = vi.fn();
    channel.on(seen);
    channel.emit({ n: 7 });
    expect(seen).toHaveBeenCalledWith({ n: 7 });
  });

  it('keeps channels with different names apart', () => {
    const a = defineChannel<number>('a');
    const b = defineChannel<number>('b');
    const seenB = vi.fn();
    b.on(seenB);
    a.emit(1);
    expect(seenB).not.toHaveBeenCalled();
  });

  it('replays the last event to a late subscriber by default', async () => {
    const channel = defineChannel<string>('state');
    channel.emit('latest');
    const seen = vi.fn();
    channel.on(seen);
    await Promise.resolve();
    expect(seen).toHaveBeenCalledWith('latest');
  });

  it('does not replay navigation commands', async () => {
    navigateTo.emit({ id: 'explore.home' });
    const seen = vi.fn();
    navigateTo.on(seen);
    await Promise.resolve();
    expect(seen).not.toHaveBeenCalled();
  });

  it('on returns an unsubscribe', () => {
    const channel = defineChannel<string>('x');
    const seen = vi.fn();
    channel.on(seen)();
    channel.emit('ignored');
    expect(seen).not.toHaveBeenCalled();
  });

  it('can be declared before the bus is installed', () => {
    (window as unknown as { __NF_REGISTRY__?: unknown }).__NF_REGISTRY__ =
      undefined;
    const channel = defineChannel<string>('early');
    installFakeRegistry();
    const seen = vi.fn();
    channel.on(seen);
    channel.emit('ok');
    expect(seen).toHaveBeenCalledWith('ok');
  });

  it('throws a clear error when used without a bus', () => {
    (window as unknown as { __NF_REGISTRY__?: unknown }).__NF_REGISTRY__ =
      undefined;
    expect(() => defineChannel('x').emit(1)).toThrow(/__NF_REGISTRY__/);
    installFakeRegistry();
  });
});

describe('defineResource', () => {
  beforeEach(() => installFakeRegistry());

  it('delivers the value synchronously to subscribers that arrive later', () => {
    const resource = defineResource<string>('config');
    resource.publish('value');
    const seen = vi.fn();
    resource.on(seen);
    expect(seen).toHaveBeenCalledWith('value');
  });

  it('notifies subscribers that were waiting', () => {
    const resource = defineResource<string>('config');
    const seen = vi.fn();
    resource.on(seen);
    resource.publish('value');
    expect(seen).toHaveBeenCalledWith('value');
  });
});

describe('listenTo', () => {
  beforeEach(() => installFakeRegistry());

  it('unsubscribes when the injection context is destroyed', () => {
    const channel = defineChannel<string>('x');
    const seen = vi.fn();
    const injector = Injector.create({
      providers: [],
      parent: TestBed.inject(Injector),
    });
    runInInjectionContext(injector, () => listenTo(channel, seen));

    channel.emit('first');
    (injector as unknown as { destroy(): void }).destroy();
    channel.emit('second');

    expect(seen).toHaveBeenCalledTimes(1);
    expect(seen).toHaveBeenCalledWith('first');
  });
});
