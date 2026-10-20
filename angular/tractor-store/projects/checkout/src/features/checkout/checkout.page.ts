import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  ViewEncapsulation,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import type { Events } from '@tractor-store/contracts';
import { CartStore } from '../../data/cart-store';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CompactHeaderComponent } from '../../shared/components/compact-header/compact-header.component';
import { RemoteElementDirective } from '../../shared/remote-element';

@Component({
  selector: 'app-checkout',
  imports: [
    RemoteElementDirective,
    ButtonComponent,
    CompactHeaderComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './checkout.page.html',
  styleUrl: './checkout.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { 'data-boundary-page': 'checkout' },
})
export class CheckoutPage {
  private readonly cart = inject(CartStore);

  protected readonly form = inject(NonNullableFormBuilder).group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    storeId: ['', Validators.required],
  });

  private readonly status = toSignal(this.form.statusChanges, {
    initialValue: this.form.status,
  });
  protected readonly isReady = computed(() => this.status() === 'VALID');

  constructor() {
    const stop = window.__NF_REGISTRY__!.on<Events['store:selected']>(
      'store:selected',
      ({ data }) => this.form.controls.storeId.setValue(data.id),
    );
    inject(DestroyRef).onDestroy(stop);
  }

  protected submit(): void {
    if (!this.isReady()) return;
    this.cart.clear();
    window.__NF_REGISTRY__!.emit<Events['nav:navigate']>('nav:navigate', {
      id: 'checkout.thanks',
    });
  }
}
