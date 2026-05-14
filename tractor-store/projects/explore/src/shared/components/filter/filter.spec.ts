import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { NavigateToDirective } from '@internal/events';
import { beforeEach, describe, expect, it } from 'vitest';
import { FilterComponent, type FilterItem } from './filter';

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
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  function create(items: FilterItem[] = filters) {
    const fixture = TestBed.createComponent(FilterComponent);
    fixture.componentRef.setInput('filters', items);
    fixture.detectChanges();
    return fixture;
  }

  it('renders one item per filter', () => {
    expect(create().nativeElement.querySelectorAll('li').length).toBe(3);
  });

  it('renders the active filter as a static label, not a link', () => {
    const el: HTMLElement = create().nativeElement;
    const active = el.querySelector('.e_Filter__filter--active');
    expect(active?.textContent).toContain('Classics');
    expect(active?.querySelector('a')).toBeNull();
  });

  it('renders inactive filters as nav links pointing at the correct intent', () => {
    const fixture = create();
    const links = fixture.debugElement.queryAll(By.directive(NavigateToDirective));
    expect(links.length).toBe(2);
    const intents = links.map((l) => l.injector.get(NavigateToDirective).navigateTo());
    expect(intents).toEqual(['explore.products', 'explore.products.category']);
  });

  it('falls back to an empty params object when a filter has no params', () => {
    const fixture = create();
    const link = fixture.debugElement
      .queryAll(By.directive(NavigateToDirective))[0]
      .injector.get(NavigateToDirective);
    expect(link.navParams()).toEqual({});
  });
});
