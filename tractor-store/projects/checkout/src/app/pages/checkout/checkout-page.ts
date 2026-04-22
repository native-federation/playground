import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '@tractor-store/ui';
import { CompactHeaderComponent } from '../../components/compact-header/compact-header';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout-page',
  imports: [ButtonComponent, CompactHeaderComponent, ReactiveFormsModule],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { 'data-boundary-page': 'checkout' },
})
export class CheckoutPage {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly cart = inject(CartService);

  readonly storeId = signal<string>('');

  readonly form = this.fb.nonNullable.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    storeId: [{ value: '', disabled: false }, Validators.required],
  });

  onStoreSelected(event: Event): void {
    const ce = event as CustomEvent<{ id: string }>;
    const id = ce.detail?.id ?? '';
    this.storeId.set(id);
    this.form.controls.storeId.setValue(id);
  }

  isReady(): boolean {
    const { firstname, lastname, storeId } = this.form.getRawValue();
    return !!firstname && !!lastname && !!storeId;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.isReady()) return;
    this.cart.clear();
    this.router.navigateByUrl('/checkout/thanks');
  }
}
