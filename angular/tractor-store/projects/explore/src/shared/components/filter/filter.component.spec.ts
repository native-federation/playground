import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { FilterComponent, type FilterItem } from './filter.component';
import { publishNavIntents } from '../../../testing/nav-intents.stub';

const filters: FilterItem[] = [
  { link: { intent: 'explore.products' }, name: 'All', active: false },
  {
    link: {
      intent: 'explore.products.category',
      params: { category: 'classic' },
    },
    name: 'Classics',
    active: true,
  },
  {
    link: {
      intent: 'explore.products.category',
      params: { category: 'autonomous' },
    },
    name: 'Autonomous',
    active: false,
  },
];

describe('FilterComponent', () => {
  beforeEach(() => {
    publishNavIntents({
      'explore.products': '/explore/products',
      'explore.products.category': '/explore/products/{category}',
    });
  });

  async function render() {
    const fixture = TestBed.createComponent(FilterComponent);
    fixture.componentRef.setInput('filters', filters);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders the active filter as plain text', async () => {
    const active = (await render()).querySelector('.e_Filter__filter--active')!;
    expect(active.textContent).toBe('Classics');
    expect(active.querySelector('a')).toBeNull();
  });

  it('links the other filters to their intent', async () => {
    const links = [...(await render()).querySelectorAll('a')];
    expect(links.map((a) => [a.textContent, a.getAttribute('href')])).toEqual([
      ['All', '/explore/products'],
      ['Autonomous', '/explore/products/autonomous'],
    ]);
  });
});
