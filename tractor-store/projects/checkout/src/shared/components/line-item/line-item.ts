import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { NavigateToDirective } from '@internal/events';
import { ButtonComponent } from '@internal/ui';
import { CartStore } from '../../../core/data/store/cart-store';
import { ResourceService } from '../../utils/resource.service';

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
  imports: [NavigateToDirective, ButtonComponent],
  templateUrl: './line-item.html',
  styleUrl: './line-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'c_LineItem', role: 'listitem' },
})
export class LineItemComponent {
  private readonly cart = inject(CartStore);
  private readonly image = inject(ResourceService);

  readonly item = input.required<LineItemView>();
  readonly removed = output<string>();

  readonly linkParams = computed(() => ({
    id: this.item().id,
    sku: this.item().sku,
  }));
  readonly smallSrc = computed(() => this.image.imgSrc(this.item().image, 200));
  readonly srcset = computed(() =>
    this.image.imgSrcset(this.item().image, [200, 400]),
  );

  onRemove(event: Event): void {
    event.preventDefault();
    const sku = this.item().sku;
    this.cart.remove(sku);
    this.removed.emit(sku);
  }
}
