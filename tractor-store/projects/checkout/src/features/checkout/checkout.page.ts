import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { navigateTo, storeSelected } from '@internal/events';
import { ButtonComponent } from '@internal/ui';
import { CartStore } from '../../core/data/store/cart-store';
import { CompactHeaderComponent } from '../../shared/components/compact-header/compact-header';
import { LOADER } from '../../core/remote-loader';

@Component({
  selector: 'app-checkout',
  imports: [ButtonComponent, CompactHeaderComponent, ReactiveFormsModule],
  templateUrl: './checkout.page.html',
  styleUrl: './checkout.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { 'data-boundary-page': 'checkout' },
})
export class CheckoutPage {
  private readonly fb = inject(FormBuilder);
  private readonly cart = inject(CartStore);
  private loader = inject(LOADER);

  constructor() {
    void this.loader('@tractor-store/explore', 'mfe-store-picker');
    void this.loader('@tractor-store/explore', 'mfe-footer');

    const off = storeSelected.on(({ id }) => this.applyStoreId(id));
    inject(DestroyRef).onDestroy(off);
  }

  readonly storeId = signal<string>('');

  readonly form = this.fb.nonNullable.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    storeId: [{ value: '', disabled: false }, Validators.required],
  });

  isReady(): boolean {
    const { firstname, lastname, storeId } = this.form.getRawValue();
    return !!firstname && !!lastname && !!storeId;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.isReady()) return;
    this.cart.clear();
    navigateTo.emit({ id: 'checkout.thanks' });
  }

  private applyStoreId(id: string): void {
    this.storeId.set(id);
    this.form.controls.storeId.setValue(id);
  }
}
