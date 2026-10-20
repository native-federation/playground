import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import type { RouteParams } from '@tractor-store/contracts';
import { ProductService } from '../../data/product.service';
import { RemoteElementDirective } from '../../shared/remote-element';
import { VariantOptionComponent } from '../../shared/components/variant-option/variant-option.component';

const param = (params: RouteParams, key: string) =>
  typeof params[key] === 'string' ? params[key] : undefined;

@Component({
  selector: 'app-product',
  imports: [NgOptimizedImage, RemoteElementDirective, VariantOptionComponent],
  templateUrl: './product.page.html',
  styleUrl: './product.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { 'data-boundary-page': 'decide' },
})
export class ProductPage {
  readonly routeParams = input<RouteParams>({});

  private readonly id = computed(() => param(this.routeParams(), 'id'));
  private readonly sku = computed(() => param(this.routeParams(), 'sku'));

  private readonly productResource = inject(ProductService).getById(this.id);
  protected readonly product = this.productResource.value;
  protected readonly isLoading = this.productResource.isLoading;

  protected readonly selectedVariant = computed(() => {
    const variants = this.product()?.variants ?? [];
    return variants.find((v) => v.sku === this.sku()) ?? variants[0];
  });

  protected readonly selectedSku = computed(
    () => this.selectedVariant()?.sku ?? '',
  );
}
