import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CartStore } from '../../../data/cart-store';
import { NavIntentDirective } from '../../nav-intent.directive';
import { ButtonComponent } from '../button/button.component';

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
  imports: [NgOptimizedImage, NavIntentDirective, ButtonComponent],
  templateUrl: './line-item.component.html',
  styleUrl: './line-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'c_LineItem', role: 'listitem' },
})
export class LineItemComponent {
  private readonly cart = inject(CartStore);

  readonly item = input.required<LineItemView>();

  protected readonly linkParams = computed(() => ({
    id: this.item().id,
    sku: this.item().sku,
  }));

  protected remove(): void {
    this.cart.remove(this.item().sku);
  }
}
