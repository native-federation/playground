import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { NavigatePayload } from '@tractor-store/contracts';
import { beforeEach, describe, expect, it } from 'vitest';
import { publishNavIntents } from '../testing/nav-intents.stub';
import { NavIntentDirective } from './nav-intent.directive';
import { bus } from '@softarc/native-federation-communication';

// Stand-in for the host's intents: two of them, and the product needs {id}.
const publishIntents = () =>
  publishNavIntents({ 'explore.home': '/', 'decide.product': '/product/{id}' });

@Component({
  imports: [NavIntentDirective],
  template: `
    <a [navIntent]="'explore.home'"></a>
    <a [navIntent]="'decide.product'" [navPayload]="{ id: 'CL-01' }"></a>
    <button [navIntent]="'explore.home'"></button>
    <a [navIntent]="'decide.product'"></a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

describe('NavIntentDirective', () => {
  let navigations: NavigatePayload[];

  beforeEach(() => {
    navigations = [];
    bus.on(
      'nav:navigate',
      (value) => navigations.push(value),
      { replay: false },
    );
  });

  function render(intentsPublished = true) {
    if (intentsPublished) publishIntents();
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

  it('emits nav:navigate with the intent and payload when clicked', () => {
    const { anchors } = render();
    anchors[0].click();
    anchors[1].click();
    expect(navigations).toEqual([
      { id: 'explore.home', payload: {} },
      { id: 'decide.product', payload: { id: 'CL-01' } },
    ]);
  });

  it('works on buttons too, without an href', () => {
    const { button } = render();
    button.click();
    expect(navigations).toEqual([{ id: 'explore.home', payload: {} }]);
    expect(button.hasAttribute('href')).toBe(false);
  });

  it('renders the resolved URL as href on anchors', () => {
    const { anchors } = render();
    expect(anchors[0].getAttribute('href')).toBe('/');
    expect(anchors[1].getAttribute('href')).toBe('/product/CL-01');
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

  it('marks links aria-disabled until the host publishes its intents', () => {
    const { fixture, anchors, button } = render(false);
    expect(anchors[0].getAttribute('aria-disabled')).toBe('true');
    // Buttons keep their own role; only href-less anchors need role="link".
    expect(button.hasAttribute('role')).toBe(false);
    expect(anchors[0].getAttribute('href')).toBeNull();

    anchors[0].click();
    expect(navigations).toEqual([]);

    publishIntents();
    fixture.detectChanges();
    expect(anchors[0].getAttribute('aria-disabled')).toBeNull();
    expect(anchors[0].getAttribute('role')).toBeNull();
    expect(anchors[0].getAttribute('href')).toBe('/');
  });

  it('stays disabled and silent when a path param is missing', () => {
    const { anchors } = render();
    expect(anchors[2].getAttribute('aria-disabled')).toBe('true');
    expect(anchors[2].getAttribute('role')).toBe('link');
    expect(anchors[2].hasAttribute('href')).toBe(false);
    anchors[2].click();
    expect(navigations).toEqual([]);
  });
});
