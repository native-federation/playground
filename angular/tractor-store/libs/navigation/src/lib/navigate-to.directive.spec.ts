import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NavigateToDirective } from './navigate-to.directive';
import type { NavIntentMap, NavigatePayload } from '@ng-internal/event-bus';

const testIntents: NavIntentMap = new Map([
  ['explore.home', { basePath: 'explore', path: '/' }],
  ['decide.product', { basePath: 'decide', path: '/product/{id}' }],
  ['checkout.cart', { basePath: 'checkout', path: '/cart' }],
]);

type Entry = { data: unknown; timestamp: number };
type Handler = (event: Entry) => void;

const fakeRegistry = () => {
  const listeners = new Map<string, Handler[]>();
  const history = new Map<string, Entry[]>();
  return {
    on: (
      type: string,
      cb: Handler,
      opts: { replay?: number } = {},
    ) => {
      const replay = opts.replay ?? 1;
      const arr = listeners.get(type) ?? [];
      arr.push(cb);
      listeners.set(type, arr);
      const past = history.get(type) ?? [];
      if (past.length > 0 && replay > 0) {
        const start = Math.max(0, past.length - replay);
        queueMicrotask(() => {
          for (let i = start; i < past.length; i++) cb(past[i]);
        });
      }
      return () => {
        const next = (listeners.get(type) ?? []).filter((h) => h !== cb);
        listeners.set(type, next);
      };
    },
    emit: (type: string, data: unknown) => {
      const entry = { data, timestamp: Date.now() };
      const past = history.get(type) ?? [];
      past.push(entry);
      history.set(type, past);
      for (const cb of listeners.get(type) ?? []) cb(entry);
    },
  };
};

@Component({
  imports: [NavigateToDirective],
  template: `
    <a [appNavigateTo]="'explore.home'"></a>
    <a [appNavigateTo]="'decide.product'" [navPayload]="{ id: 'CL-01' }"></a>
    <button [appNavigateTo]="'checkout.cart'"></button>
    <a [appNavigateTo]="'decide.product'"></a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

describe('NavigateToDirective', () => {
  let bus: ReturnType<typeof fakeRegistry>;
  let original: unknown;

  beforeEach(() => {
    bus = fakeRegistry();
    original = (window as unknown as { __NF_REGISTRY__?: unknown }).__NF_REGISTRY__;
    (window as unknown as { __NF_REGISTRY__: unknown }).__NF_REGISTRY__ = bus;
  });

  afterEach(() => {
    (window as unknown as { __NF_REGISTRY__?: unknown }).__NF_REGISTRY__ =
      original as never;
  });

  function render() {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    bus.emit('nav:intents', testIntents);
    fixture.detectChanges();
    return fixture;
  }

  it('emits the intent id on the nav:navigate channel when clicked', () => {
    const seen = vi.fn();
    bus.on('nav:navigate', ({ data }) => seen(data));

    const fixture = render();
    const anchor = fixture.nativeElement.querySelectorAll('a')[0] as HTMLElement;
    anchor.click();

    expect(seen).toHaveBeenCalledWith({
      id: 'explore.home',
      payload: {},
    } satisfies NavigatePayload);
  });

  it('forwards nav params alongside the intent id', () => {
    const seen = vi.fn();
    bus.on('nav:navigate', ({ data }) => seen(data));

    const fixture = render();
    const anchor = fixture.nativeElement.querySelectorAll('a')[1] as HTMLElement;
    anchor.click();

    expect(seen).toHaveBeenCalledWith({
      id: 'decide.product',
      payload: { id: 'CL-01' },
    } satisfies NavigatePayload);
  });

  it('works on button elements too', () => {
    const seen = vi.fn();
    bus.on('nav:navigate', ({ data }) => seen(data));

    const fixture = render();
    const button = fixture.nativeElement.querySelector('button') as HTMLElement;
    button.click();

    expect(seen).toHaveBeenCalledWith({
      id: 'checkout.cart',
      payload: {},
    } satisfies NavigatePayload);
  });

  it('prevents the default anchor navigation', () => {
    const fixture = render();
    const anchor = fixture.nativeElement.querySelectorAll('a')[0] as HTMLElement;
    const event = new MouseEvent('click', { cancelable: true, bubbles: true });
    anchor.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it('is a no-op when the event bus is missing', () => {
    (window as unknown as { __NF_REGISTRY__?: unknown }).__NF_REGISTRY__ = undefined;
    const fixture = render();
    const anchor = fixture.nativeElement.querySelectorAll('a')[0] as HTMLElement;
    expect(() => anchor.click()).not.toThrow();
  });

  it('stays silent until the user actually clicks, then warns about the missing param', () => {
    const consoleWarn = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {});
    const seen = vi.fn();
    bus.on('nav:navigate', ({ data }) => seen(data));

    const fixture = render();
    const anchor = fixture.nativeElement.querySelectorAll('a')[2] as HTMLElement;
    expect(anchor.getAttribute('href')).toBeNull();
    expect(consoleWarn).not.toHaveBeenCalled();

    anchor.click();
    expect(seen).not.toHaveBeenCalled();
    expect(consoleWarn).toHaveBeenCalledTimes(1);
    expect(consoleWarn).toHaveBeenCalledWith(
      expect.stringMatching(
        /\[appNavigateTo\]="decide\.product".*missing required param "\{id\}"/,
      ),
    );
    consoleWarn.mockRestore();
  });

  it('hides the element until its intent is registered, then reveals it', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    const anchor = fixture.nativeElement.querySelectorAll('a')[0] as HTMLElement;
    expect(anchor.style.display).toBe('none');

    bus.emit('nav:intents', testIntents);
    fixture.detectChanges();
    expect(anchor.style.display).toBe('');
  });

  it('receives the latest intents map via replay when it subscribes after the host has already emitted', async () => {
    bus.emit('nav:intents', testIntents);

    TestBed.configureTestingModule({ imports: [HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    const anchor = fixture.nativeElement.querySelectorAll('a')[0] as HTMLElement;
    expect(anchor.style.display).toBe('none');

    await Promise.resolve();
    fixture.detectChanges();
    expect(anchor.style.display).toBe('');
  });

  it('keeps an element with a known-but-unresolvable intent visible (so the click warning can fire)', () => {
    const fixture = render();
    const danglingAnchor = fixture.nativeElement.querySelectorAll('a')[2] as HTMLElement;
    expect(danglingAnchor.style.display).toBe('');
  });

  it('stays silent (no warn, empty href) when the intent has not been loaded yet', () => {
    const consoleWarn = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {});
    const seen = vi.fn();
    bus.on('nav:navigate', ({ data }) => seen(data));

    TestBed.configureTestingModule({ imports: [HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    // intentionally do NOT emit nav:intents — registry hasn't published yet

    const anchor = fixture.nativeElement.querySelectorAll('a')[2] as HTMLElement;
    expect(anchor.getAttribute('href')).toBeNull();

    anchor.click();
    expect(seen).not.toHaveBeenCalled();
    expect(consoleWarn).not.toHaveBeenCalled();
    consoleWarn.mockRestore();
  });
});
