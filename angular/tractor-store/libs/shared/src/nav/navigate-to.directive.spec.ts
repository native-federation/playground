import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { navIntents, type NavigatePayload } from '../bus/nav-channels';
import { installFakeRegistry } from '../testing/install-registry-stub';
import type { IntentMap } from './contribution';
import { NavigateToDirective } from './navigate-to.directive';

const testIntents: IntentMap = new Map([
  ['explore.home', { basePath: 'explore', path: '/' }],
  ['decide.product', { basePath: 'decide', path: '/product/{id}' }],
  ['checkout.cart', { basePath: 'checkout', path: '/cart' }],
]);

@Component({
  imports: [NavigateToDirective],
  template: `
    <a [appNavigateTo]="'explore.home'"></a>
    <a
      [appNavigateTo]="'decide.product'"
      [navPayload]="{ id: 'CL-01', sku: 'X' }"
    ></a>
    <button [appNavigateTo]="'checkout.cart'"></button>
    <a [appNavigateTo]="'decide.product'"></a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

describe('NavigateToDirective', () => {
  let bus: ReturnType<typeof installFakeRegistry>;
  let navigations: NavigatePayload[];
  let consoleWarn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    bus = installFakeRegistry();
    navigations = [];
    bus.on<NavigatePayload>('nav:navigate', ({ data }) =>
      navigations.push(data),
    );
    consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => consoleWarn.mockRestore());

  function render(publishIntents = true) {
    if (publishIntents) navIntents.publish(testIntents);
    TestBed.configureTestingModule({ imports: [HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    return {
      fixture,
      anchors: [...root.querySelectorAll('a')],
      button: root.querySelector('button')!,
    };
  }

  it('emits the intent id on nav:navigate when clicked', () => {
    render().anchors[0].click();
    expect(navigations).toEqual([{ id: 'explore.home', payload: {} }]);
  });

  it('forwards the payload alongside the intent id', () => {
    render().anchors[1].click();
    expect(navigations).toEqual([
      { id: 'decide.product', payload: { id: 'CL-01', sku: 'X' } },
    ]);
  });

  it('works on buttons too', () => {
    render().button.click();
    expect(navigations).toEqual([{ id: 'checkout.cart', payload: {} }]);
  });

  it('renders the resolved URL, including query params, as href on anchors', () => {
    const { anchors, button } = render();
    expect(anchors[0].getAttribute('href')).toBe('/explore');
    expect(anchors[1].getAttribute('href')).toBe('/decide/product/CL-01?sku=X');
    expect(button.hasAttribute('href')).toBe(false);
  });

  it('prevents the default anchor navigation', () => {
    const { anchors } = render();
    const event = new MouseEvent('click', { cancelable: true, bubbles: true });
    anchors[0].dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it('leaves modified clicks on anchors to the browser', () => {
    const { anchors } = render();
    const event = new MouseEvent('click', {
      cancelable: true,
      bubbles: true,
      ctrlKey: true,
    });
    anchors[0].dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
    expect(navigations).toEqual([]);
  });

  it('marks links aria-disabled until the intent can be resolved', () => {
    const { fixture, anchors } = render(false);
    expect(anchors[0].getAttribute('aria-disabled')).toBe('true');
    expect(anchors[0].getAttribute('href')).toBeNull();

    navIntents.publish(testIntents);
    fixture.detectChanges();
    expect(anchors[0].getAttribute('aria-disabled')).toBeNull();
    expect(anchors[0].getAttribute('href')).toBe('/explore');
  });

  it('stays silent when clicked before the intents are published', () => {
    render(false).anchors[0].click();
    expect(navigations).toEqual([]);
    expect(consoleWarn).not.toHaveBeenCalled();
  });

  it('warns on click when a required param is missing', () => {
    const { anchors } = render();
    expect(anchors[2].getAttribute('href')).toBeNull();
    expect(anchors[2].getAttribute('aria-disabled')).toBe('true');

    anchors[2].click();
    expect(navigations).toEqual([]);
    expect(consoleWarn).toHaveBeenCalledWith(
      expect.stringMatching(
        /\[appNavigateTo\]="decide\.product".*missing required param "\{id\}"/,
      ),
    );
  });
});
