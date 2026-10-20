import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type {
  Events,
  NavigatePayload,
  NavResolver,
} from '@tractor-store/contracts';
import { beforeEach, describe, expect, it } from 'vitest';
import { publishNavResolver } from '../testing/nav-resolver.stub';
import { NavIntentDirective } from './nav-intent.directive';

// Stand-in for the host's resolver: knows two intents, needs {id} for the product.
const resolver: NavResolver = (id, payload = {}) => {
  if (id === 'explore.home') return '/';
  if (id === 'decide.product' && payload['id']) {
    return `/product/${payload['id']}`;
  }
  return null;
};

const publishResolver = () => publishNavResolver(resolver);

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
    window.__NF_REGISTRY__!.on<Events['nav:navigate']>(
      'nav:navigate',
      ({ data }) => navigations.push(data),
      { replay: 0 },
    );
  });

  async function render(resolverPublished = true) {
    if (resolverPublished) await publishResolver();
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

  it('emits nav:navigate with the intent and payload when clicked', async () => {
    const { anchors } = await render();
    anchors[0].click();
    anchors[1].click();
    expect(navigations).toEqual([
      { id: 'explore.home', payload: {} },
      { id: 'decide.product', payload: { id: 'CL-01' } },
    ]);
  });

  it('works on buttons too, without an href', async () => {
    const { button } = await render();
    button.click();
    expect(navigations).toEqual([{ id: 'explore.home', payload: {} }]);
    expect(button.hasAttribute('href')).toBe(false);
  });

  it('renders the resolved URL as href on anchors', async () => {
    const { anchors } = await render();
    expect(anchors[0].getAttribute('href')).toBe('/');
    expect(anchors[1].getAttribute('href')).toBe('/product/CL-01');
  });

  it('prevents the default anchor navigation', async () => {
    const { anchors } = await render();
    const event = new MouseEvent('click', { cancelable: true, bubbles: true });
    anchors[0].dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it('leaves modified clicks on anchors to the browser', async () => {
    const { anchors } = await render();
    const event = new MouseEvent('click', {
      cancelable: true,
      bubbles: true,
      ctrlKey: true,
    });
    anchors[0].dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
    expect(navigations).toEqual([]);
  });

  it('marks links aria-disabled until the host publishes its resolver', async () => {
    const { fixture, anchors } = await render(false);
    expect(anchors[0].getAttribute('aria-disabled')).toBe('true');
    expect(anchors[0].getAttribute('href')).toBeNull();

    anchors[0].click();
    expect(navigations).toEqual([]);

    await publishResolver();
    fixture.detectChanges();
    expect(anchors[0].getAttribute('aria-disabled')).toBeNull();
    expect(anchors[0].getAttribute('href')).toBe('/');
  });

  it('stays disabled and silent when the resolver cannot build the URL', async () => {
    const { anchors } = await render();
    expect(anchors[2].getAttribute('aria-disabled')).toBe('true');
    anchors[2].click();
    expect(navigations).toEqual([]);
  });
});
