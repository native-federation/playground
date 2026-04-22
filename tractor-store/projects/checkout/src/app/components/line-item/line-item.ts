import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { ButtonComponent } from '@tractor-store/ui';
import { replaceSize, srcset } from '../../utils/image';
import { CartService } from '../../services/cart.service';

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
  imports: [ButtonComponent],
  templateUrl: './line-item.html',
  styleUrl: './line-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'c_LineItem', role: 'listitem' },
})
export class LineItemComponent {
  private readonly cart = inject(CartService);

  readonly item = input.required<LineItemView>();
  readonly removed = output<string>();

  readonly url = computed(() => `/product/${this.item().id}?sku=${this.item().sku}`);
  readonly smallSrc = computed(() => replaceSize(this.item().image, 200));
  readonly srcset = computed(() => srcset(this.item().image, [200, 400]));

  onRemove(event: Event): void {
    event.preventDefault();
    const sku = this.item().sku;
    this.cart.remove(sku);
    this.removed.emit(sku);
  }
}
