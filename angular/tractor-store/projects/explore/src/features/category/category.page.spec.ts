import { IMAGE_LOADER } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import type { RouteParams } from '@tractor-store/contracts';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { cdnImageLoader } from '../../app.config';
import type { Category } from '../../data/category';
import { CategoryService } from '../../data/category.service';
import { LOAD_REMOTE } from '../../shared/remote-element';
import { categoryFixture } from '../../testing/category.fixture';
import { testEnv } from '../../testing/env.fixture';
import { fakeCategoryService } from '../../testing/category-service.stub';
import { CategoryPage } from './category.page';

const [classic] = categoryFixture;
const allProducts = categoryFixture.flatMap((c) => c.products);

describe('CategoryPage', () => {
  let loadRemote: ReturnType<typeof vi.fn>;

  function configure(categories: Category[]) {
    loadRemote = vi.fn().mockResolvedValue(undefined);
    TestBed.configureTestingModule({
      providers: [
        { provide: CategoryService, useValue: fakeCategoryService(categories) },
        { provide: LOAD_REMOTE, useValue: loadRemote },
        { provide: IMAGE_LOADER, useValue: cdnImageLoader(testEnv.cdnUrl) },
      ],
    });
  }

  beforeEach(() => configure(categoryFixture));

  async function render(routeParams: RouteParams = {}) {
    const fixture = TestBed.createComponent(CategoryPage);
    fixture.componentRef.setInput('routeParams', routeParams);
    await fixture.whenStable();
    const root = (fixture.nativeElement as HTMLElement).shadowRoot!;
    return {
      root,
      title: root.querySelector('h2')?.textContent,
      products: [...root.querySelectorAll('.e_Product_name')].map(
        (el) => el.textContent,
      ),
      activeFilter: root.querySelector('.e_Filter__filter--active')
        ?.textContent,
    };
  }

  it('shows all machines, most expensive first, without a category', async () => {
    const page = await render();
    expect(page.title).toBe('All Machines');
    expect(page.activeFilter).toBe('All');
    expect(page.products).toEqual(
      [...allProducts]
        .sort((a, b) => b.startPrice - a.startPrice)
        .map((p) => p.name),
    );
  });

  it('shows only the products of the category route param', async () => {
    const page = await render({ category: classic.key });
    expect(page.title).toBe(classic.name);
    expect(page.activeFilter).toBe(classic.name);
    expect(page.products).toEqual(classic.products.map((p) => p.name));
    expect(page.root.textContent).toContain(
      `${classic.products.length} products`,
    );
  });

  it('falls back to all machines for an unknown category', async () => {
    const page = await render({ category: 'nonexistent' });
    expect(page.title).toBe('All Machines');
    expect(page.products).toHaveLength(allProducts.length);
  });

  it('offers a filter per category', async () => {
    const { root } = await render();
    expect(
      [...root.querySelectorAll('.e_Filter li')].map((li) =>
        li.textContent?.trim(),
      ),
    ).toEqual(['All', ...categoryFixture.map((c) => c.name)]);
  });

  it('renders no products when there are no categories', async () => {
    TestBed.resetTestingModule();
    configure([]);
    expect((await render()).products).toEqual([]);
  });

  it('loads the header and footer and marks the explore page boundary', async () => {
    const fixture = TestBed.createComponent(CategoryPage);
    await fixture.whenStable();
    expect(loadRemote.mock.calls).toEqual([
      ['@tractor-store/explore', 'mfe-header'],
      ['@tractor-store/explore', 'mfe-footer'],
    ]);
    expect((fixture.nativeElement as HTMLElement).dataset['boundaryPage']).toBe(
      'explore',
    );
  });
});
