import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NavigateToDirective, ButtonComponent } from '@tractor-store/shared';
import { CartStore } from '../../../core/data/store/cart-store';

export interface LineItemView {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  total: number;
  image: string;
}

@Component({
  selector: 'app-line-item',
  imports: [NgOptimizedImage, NavigateToDirective, ButtonComponent],
  templateUrl: './line-item.html',
  styleUrl: './line-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'c_LineItem', role: 'listitem' },
})
export class LineItemComponent {
  private readonly cart = inject(CartStore);

  readonly item = input.required<LineItemView>();
  readonly removed = output<string>();

  readonly linkParams = computed(() => ({
    id: this.item().id,
    sku: this.item().sku,
  }));

  onRemove(event: Event): void {
    event.preventDefault();
    const sku = this.item().sku;
    this.cart.remove(sku);
    this.removed.emit(sku);
  }
}
