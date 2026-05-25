import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { param, RouteParams } from '@internal/url';
import type { ProductModel } from '../../core/data/contracts/models/product.model';
import { CategoryHttp } from '../../core/data/http/category-http';
import { ProductTileComponent } from '../../shared/components/product-tile/product-tile';
import {
  FilterComponent,
  FilterItem,
} from '../../shared/components/filter/filter';
import { LOADER } from '../../core/remote-loader';

@Component({
  selector: 'app-category',
  imports: [ProductTileComponent, FilterComponent],
  templateUrl: './category.page.html',
  styleUrl: './category.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { 'data-boundary-page': 'explore' },
})
export class CategoryPage {
  private readonly categoryHttp = inject(CategoryHttp);
  private readonly loader = inject(LOADER);

  constructor() {
    void this.loader('@tractor-store/explore', 'mfe-header');
    void this.loader('@tractor-store/explore', 'mfe-footer');
  }

  readonly routeParams = input<RouteParams>({});

  readonly category = computed(() => param(this.routeParams(), 'category'));

  private readonly categoriesResource = this.categoryHttp.list();
  private readonly categories = computed(
    () => this.categoriesResource.value() ?? [],
  );

  readonly activeCategory = computed(() => {
    const key = this.category();
    return key ? this.categories().find((c) => c.key === key) : undefined;
  });

  readonly title = computed(
    () => this.activeCategory()?.name ?? 'All Machines',
  );

  readonly products = computed<ProductModel[]>(() => {
    const cat = this.activeCategory();
    const list = cat
      ? [...cat.products]
      : this.categories().flatMap((c) => c.products);
    return list.sort((a, b) => b.startPrice - a.startPrice);
  });

  readonly filters = computed<FilterItem[]>(() => {
    const current = this.category();
    const active = this.activeCategory();
    return [
      {
        link: { intent: 'explore.products' },
        name: 'All',
        active: !active,
      },
      ...this.categories().map((c) => ({
        link: {
          intent: 'explore.products.category',
          params: { category: c.key },
        },
        name: c.name,
        active: c.key === current,
      })),
    ];
  });
}
