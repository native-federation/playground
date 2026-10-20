import { TestBed } from '@angular/core/testing';
import type { Events, NavResolver } from '@tractor-store/contracts';
import { beforeEach, describe, expect, it } from 'vitest';
import { VariantOptionComponent } from './variant-option.component';
import { publishNavResolver } from '../../../testing/nav-resolver.stub';

// Stands in for the host's resolver: '/<intent>?<payload>'.
const resolve: NavResolver = (id, payload = {}) =>
  `/${id}?${new URLSearchParams(payload)}`;

describe('VariantOptionComponent', () => {
  beforeEach(async () => {
    await publishNavResolver(resolve);
  });

  async function render(
    inputs: { sku?: string; color?: string; selected?: boolean } = {},
  ) {
    const fixture = TestBed.createComponent(VariantOptionComponent);
    fixture.componentRef.setInput('id', 'AU-03');
    fixture.componentRef.setInput('sku', inputs.sku ?? 'AU-03-RD');
    fixture.componentRef.setInput('name', 'Scarlet Dynamo');
    fixture.componentRef.setInput('color', inputs.color ?? '#FF2400');
    if (inputs.selected !== undefined)
      fixture.componentRef.setInput('selected', inputs.selected);
    await fixture.whenStable();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  it('links to the variant by default', async () => {
    const { el } = await render();
    const link = el.querySelector('a')!;
    expect(link.textContent).toBe('Scarlet Dynamo');
    expect(link.getAttribute('href')).toBe(
      '/decide.product?id=AU-03&sku=AU-03-RD',
    );
    expect(el.querySelector('strong')).toBeNull();
  });

  it('shows the selected variant as plain text instead of a link', async () => {
    const { el } = await render({ selected: true });
    expect(el.querySelector('strong')?.textContent).toBe('Scarlet Dynamo');
    expect(el.querySelector('a')).toBeNull();
  });

  it('exposes the color through the --variant-color custom property', async () => {
    const { el } = await render({ color: '#123456' });
    expect(
      el.querySelector('li')!.style.getPropertyValue('--variant-color'),
    ).toBe('#123456');
  });

  it('updates the link when the sku changes', async () => {
    const { fixture, el } = await render();
    fixture.componentRef.setInput('sku', 'AU-03-YE');
    await fixture.whenStable();
    expect(el.querySelector('a')!.getAttribute('href')).toBe(
      '/decide.product?id=AU-03&sku=AU-03-YE',
    );
  });

  it('asks the host to navigate when the link is clicked', async () => {
    const navigations: Events['nav:navigate'][] = [];
    window.__NF_REGISTRY__!.on<Events['nav:navigate']>(
      'nav:navigate',
      ({ data }) => navigations.push(data),
    );
    const { el } = await render();
    el.querySelector('a')!.click();
    expect(navigations).toEqual([
      { id: 'decide.product', payload: { id: 'AU-03', sku: 'AU-03-RD' } },
    ]);
  });
});
