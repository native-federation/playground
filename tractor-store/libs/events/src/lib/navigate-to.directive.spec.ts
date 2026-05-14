import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NavigateToDirective } from './navigate-to.directive';
import type { NavigatePayload } from './nav-event-bus';

type Handler = (event: { data: unknown; timestamp: number }) => void;

const fakeRegistry = () => {
  const listeners = new Map<string, Handler[]>();
  return {
    on: (type: string, cb: Handler) => {
      const arr = listeners.get(type) ?? [];
      arr.push(cb);
      listeners.set(type, arr);
      return () => {
        const next = (listeners.get(type) ?? []).filter((h) => h !== cb);
        listeners.set(type, next);
      };
    },
    emit: (type: string, data: unknown) => {
      for (const cb of listeners.get(type) ?? [])
        cb({ data, timestamp: Date.now() });
    },
  };
};

@Component({
  imports: [NavigateToDirective],
  template: `
    <a [navigateTo]="'explore.home'"></a>
    <a [navigateTo]="'decide.product'" [navParams]="{ id: 'CL-01' }"></a>
    <button [navigateTo]="'checkout.cart'"></button>
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
});
