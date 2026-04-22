import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import {
  ExploreDataService,
  Product,
} from '../../services/explore-data.service';
import { ProductTileComponent } from '../../components/product-tile/product-tile';
import { FilterComponent, FilterItem } from '../../components/filter/filter';
import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';

@Component({
  selector: 'app-category-page',
  imports: [ProductTileComponent, FilterComponent, HeaderComponent, FooterComponent],
  templateUrl: './category-page.html',
  styleUrl: './category-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-boundary-page': 'explore' },
})
export class CategoryPage {
  private readonly data = inject(ExploreDataService);

  // Route param bound via withComponentInputBinding().
  readonly category = input<string | undefined>(undefined);

  readonly activeCategory = computed(() =>
    this.data.findCategory(this.category()),
  );

  readonly title = computed(() =>
    this.activeCategory() ? this.activeCategory()!.name : 'All Machines',
  );

  readonly products = computed<Product[]>(() => {
    const cat = this.activeCategory();
    const list = cat
      ? [...cat.products]
      : this.data.categories().flatMap((c) => c.products);
    return list.sort((a, b) => b.startPrice - a.startPrice);
  });

  readonly filters = computed<FilterItem[]>(() => {
    const current = this.category();
    const active = this.activeCategory();
    return [
      { url: '/products', name: 'All', active: !active },
      ...this.data.categories().map((c) => ({
        url: `/products/${c.key}`,
        name: c.name,
        active: c.key === current,
      })),
    ];
  });
}
