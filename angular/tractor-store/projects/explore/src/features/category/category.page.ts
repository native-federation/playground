import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import type { RouteParams } from '@tractor-store/contracts';
import { CategoryService } from '../../data/category.service';
import { RemoteElementDirective } from '../../shared/remote-element';
import { ProductTileComponent } from '../../shared/components/product-tile/product-tile.component';
import {
  FilterComponent,
  type FilterItem,
} from '../../shared/components/filter/filter.component';

const param = (params: RouteParams, key: string) =>
  typeof params[key] === 'string' ? params[key] : undefined;

@Component({
  selector: 'app-category',
  imports: [RemoteElementDirective, ProductTileComponent, FilterComponent],
  templateUrl: './category.page.html',
  styleUrl: './category.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { 'data-boundary-page': 'explore' },
})
export class CategoryPage {
  readonly routeParams = input<RouteParams>({});

  private readonly categoriesResource = inject(CategoryService).list();
  private readonly categories = computed(
    () => this.categoriesResource.value() ?? [],
  );

  private readonly activeCategory = computed(() => {
    const key = param(this.routeParams(), 'category');
    return this.categories().find((c) => c.key === key);
  });

  protected readonly title = computed(
    () => this.activeCategory()?.name ?? 'All Machines',
  );

  protected readonly products = computed(() => {
    const products =
      this.activeCategory()?.products ??
      this.categories().flatMap((c) => c.products);
    return [...products].sort((a, b) => b.startPrice - a.startPrice);
  });

  protected readonly filters = computed<FilterItem[]>(() => [
    {
      link: { intent: 'explore.products' },
      name: 'All',
      active: !this.activeCategory(),
    },
    ...this.categories().map((c) => ({
      link: {
        intent: 'explore.products.category',
        params: { category: c.key },
      },
      name: c.name,
      active: c === this.activeCategory(),
    })),
  ]);
}
