import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { Events, NavResolver } from '@tractor-store/contracts';
import { beforeEach, describe, expect, it } from 'vitest';
import { NavIntentDirective } from './nav-intent.directive';
import { publishNavResolver } from '../testing/nav-resolver.stub';

// Stands in for the host's resolver: knows two intents, and 'decide.product' needs an id.
const resolve: NavResolver = (id, payload = {}) => {
  if (id === 'explore.home') return '/';
  if (id === 'decide.product' && payload['id'])
    return `/product/${payload['id']}`;
  return null;
};

@Component({
  imports: [NavIntentDirective],
  template: `
    <a [navIntent]="'explore.home'"></a>
    <a [navIntent]="'decide.product'" [navPayload]="{ id: 'CL-01' }"></a>
    <a [navIntent]="'decide.product'"></a>
    <button [navIntent]="'explore.home'"></button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

describe('NavIntentDirective', () => {
  let navigations: Events['nav:navigate'][];

  beforeEach(() => {
    navigations = [];
    window.__NF_REGISTRY__!.on<Events['nav:navigate']>(
      'nav:navigate',
      ({ data }) => navigations.push(data),
    );
  });

  async function render() {
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    return {
      fixture,
      links: [...root.querySelectorAll('a')],
      button: root.querySelector('button')!,
    };
  }

  it('renders the resolved URL as href on anchors only', async () => {
    await publishNavResolver(resolve);
    const { links, button } = await render();
    expect(links.map((a) => a.getAttribute('href'))).toEqual([
      '/',
      '/product/CL-01',
      null,
    ]);
    expect(button.hasAttribute('href')).toBe(false);
  });

  it('marks links aria-disabled until the host has published its resolver', async () => {
    const { fixture, links } = await render();
    expect(links[0].getAttribute('aria-disabled')).toBe('true');

    await publishNavResolver(resolve);
    await fixture.whenStable();
    expect(links[0].getAttribute('aria-disabled')).toBeNull();
    expect(links[0].getAttribute('href')).toBe('/');
  });

  it('marks links aria-disabled when the intent cannot be resolved', async () => {
    await publishNavResolver(resolve);
    const { links } = await render();
    expect(links[2].getAttribute('aria-disabled')).toBe('true');
  });

  it('asks the host to navigate instead of following the link', async () => {
    await publishNavResolver(resolve);
    const { links } = await render();
    const click = new MouseEvent('click', { bubbles: true, cancelable: true });
    links[1].dispatchEvent(click);
    expect(click.defaultPrevented).toBe(true);
    expect(navigations).toEqual([
      { id: 'decide.product', payload: { id: 'CL-01' } },
    ]);
  });

  it('works on buttons too', async () => {
    await publishNavResolver(resolve);
    (await render()).button.click();
    expect(navigations).toEqual([{ id: 'explore.home', payload: {} }]);
  });

  it('leaves modified clicks on anchors to the browser', async () => {
    await publishNavResolver(resolve);
    const { links } = await render();
    const click = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      ctrlKey: true,
    });
    links[0].dispatchEvent(click);
    expect(click.defaultPrevented).toBe(false);
    expect(navigations).toEqual([]);
  });

  it('does nothing for an intent that cannot be resolved', async () => {
    await publishNavResolver(resolve);
    (await render()).links[2].click();
    expect(navigations).toEqual([]);
  });
});
