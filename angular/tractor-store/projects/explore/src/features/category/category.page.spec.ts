import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CategoryHttp } from '../../core/data/http/category-http';
import { LOAD_REMOTE, provideEnv } from '@tractor-store/shared';
import { categoryFixture } from '../../testing/category.fixture';
import { testEnv } from '../../testing/env.fixture';
import { fakeCategoryHttp } from '../../testing/list-http.stub';
import { CategoryPage } from './category.page';

describe('CategoryPage', () => {
  let loader: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    loader = vi.fn().mockResolvedValue(undefined);
    await TestBed.configureTestingModule({
      imports: [CategoryPage],
      providers: [
        provideRouter([]),
        provideEnv(testEnv),
        { provide: LOAD_REMOTE, useValue: loader },
        { provide: CategoryHttp, useValue: fakeCategoryHttp(categoryFixture) },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  function create(routeParams: Record<string, string> = {}) {
    const fixture = TestBed.createComponent(CategoryPage);
    fixture.componentRef.setInput('routeParams', routeParams);
    fixture.detectChanges();
    return fixture;
  }

  it('shows "All Machines" and every product when no category is selected', () => {
    const cmp = create().componentInstance;
    expect(cmp.title()).toBe('All Machines');
    expect(cmp.products().length).toBe(3);
  });

  it('shows the matching category title and only its products when a category is selected', () => {
    const cmp = create({ category: 'classic' }).componentInstance;
    expect(cmp.title()).toBe('Classics');
    expect(cmp.products().map((p) => p.id)).toEqual(['CL-01', 'CL-02']);
  });

  it('falls back to "All Machines" when the category param is unknown', () => {
    const cmp = create({ category: 'nonexistent' }).componentInstance;
    expect(cmp.title()).toBe('All Machines');
    expect(cmp.products().length).toBe(3);
  });

  it('sorts products by descending startPrice', () => {
    const products = create().componentInstance.products();
    const prices = products.map((p) => p.startPrice);
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  it('builds the filter list with All + every category, marking the active one', () => {
    const filters = create({ category: 'classic' }).componentInstance.filters();
    expect(filters.map((f) => f.name)).toEqual([
      'All',
      'Classics',
      'Autonomous',
    ]);
    expect(filters.map((f) => f.active)).toEqual([false, true, false]);
  });

  it('marks "All" as active when no category is selected', () => {
    const filters = create().componentInstance.filters();
    expect(filters[0]).toMatchObject({ name: 'All', active: true });
    expect(filters.slice(1).every((f) => !f.active)).toBe(true);
  });

  it('renders a product tile per product and a filter component', () => {
    const el: ShadowRoot = (
      create({ category: 'classic' }).nativeElement as HTMLElement
    ).shadowRoot!;
    expect(el.querySelectorAll('app-product-tile').length).toBe(2);
    expect(el.querySelector('app-filter')).not.toBeNull();
    expect(el.querySelector('h2')?.textContent).toBe('Classics');
  });

  it('eagerly preloads the header and footer slices', () => {
    create();
    expect(loader).toHaveBeenCalledWith('@tractor-store/explore', 'mfe-header');
    expect(loader).toHaveBeenCalledWith('@tractor-store/explore', 'mfe-footer');
  });

  it('marks the host with the explore boundary attribute', () => {
    expect(
      (create().nativeElement as HTMLElement).getAttribute(
        'data-boundary-page',
      ),
    ).toBe('explore');
  });

  it('renders no products when the categories list is empty', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [CategoryPage],
      providers: [
        provideRouter([]),
        provideEnv(testEnv),
        {
          provide: LOAD_REMOTE,
          useValue: vi.fn().mockResolvedValue(undefined),
        },
        { provide: CategoryHttp, useValue: fakeCategoryHttp([]) },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    const cmp = TestBed.createComponent(CategoryPage);
    cmp.componentRef.setInput('routeParams', {});
    cmp.detectChanges();
    expect(cmp.componentInstance.products().length).toBe(0);
  });
});
