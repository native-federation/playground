import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavigateToDirective } from '@internal/navigation';
import { ButtonComponent } from '@internal/ui';
import { VariantHttp } from '../../core/data/http/variant-http';
import { CartStore } from '../../core/data/store/cart-store';

@Component({
  selector: 'app-add-to-cart',
  imports: [ButtonComponent, NavigateToDirective, ReactiveFormsModule],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  host: { 'data-boundary': 'checkout' },
})
export class AddToCartComponent {
  private readonly cart = inject(CartStore);
  private readonly variantHttp = inject(VariantHttp);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly sku = input.required<string>();

  readonly form = this.fb.group({
    sku: this.fb.control('', Validators.required),
  });

  private readonly variantResource = this.variantHttp.getBySku(this.sku);
  readonly variant = this.variantResource.value;
  readonly isLoading = this.variantResource.isLoading;
  readonly outOfStock = computed(() => (this.variant()?.inventory ?? 0) === 0);
  readonly confirmed = signal(false);

  constructor() {
    effect(() => this.form.controls.sku.setValue(this.sku()));
  }

  onSubmit(): void {
    if (this.outOfStock() || this.form.invalid) return;
    const { sku } = this.form.getRawValue();
    this.cart.add(sku);
    this.confirmed.set(true);
  }
}
