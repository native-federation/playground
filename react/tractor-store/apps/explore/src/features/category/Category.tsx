import type { RouteParams } from '@tractor-store/contracts';
import { useStyles } from '../../app';
import { getCategories } from '../../data/category';
import { useRemoteElement } from '../../shared/remote-element';
import { useAsync } from '../../shared/use-async';
import { ProductTile } from './ProductTile';
import { Filter, type FilterItem } from './Filter';
import { categoryStyles } from './category-styles';

const param = (params: RouteParams, key: string) =>
  typeof params[key] === 'string' ? params[key] : undefined;

export function Category({ routeParams = {} }: { routeParams?: RouteParams }) {
  useStyles(categoryStyles);
  useRemoteElement('@tractor-store/explore', 'mfe-header');
  useRemoteElement('@tractor-store/explore', 'mfe-footer');

  const categoryKey = param(routeParams, 'category');

  const { value: rawCategories, error } = useAsync(() => getCategories(), []);
  const categories = rawCategories ?? [];

  const activeCategory = categoryKey
    ? categories.find((c) => c.key === categoryKey)
    : undefined;
  const title = activeCategory?.name ?? 'All Machines';

  const products = (activeCategory
    ? [...activeCategory.products]
    : categories.flatMap((c) => c.products)
  ).sort((a, b) => b.startPrice - a.startPrice);

  const filters: FilterItem[] = [
    {
      link: { intent: 'explore.products' },
      name: 'All',
      active: !activeCategory,
    },
    ...categories.map((c) => ({
      link: {
        intent: 'explore.products.category',
        params: { category: c.key },
      },
      name: c.name,
      active: c.key === categoryKey,
    })),
  ];

  return (
    <div data-boundary-page="explore">
      <mfe-header></mfe-header>
      <main className="e_CategoryPage">
        <h2>{title}</h2>
        {error ? (
          <p role="alert">Failed to load categories. Please refresh.</p>
        ) : (
          <>
            <div className="e_CategoryPage__subline">
              <p>{products.length} products</p>
              <Filter filters={filters} />
            </div>
            <ul className="e_CategoryPage_list">
              {products.map((p) => (
                <ProductTile key={p.id} product={p} />
              ))}
            </ul>
          </>
        )}
      </main>
      <mfe-footer></mfe-footer>
    </div>
  );
}
