import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { storeSelected, ButtonComponent } from '@tractor-store/shared';
import type { StoreModel } from '../../core/data/contracts/models/store.model';
import { StoreHttp } from '../../core/data/http/store-http';

@Component({
  selector: 'app-store-picker',
  imports: [NgOptimizedImage, ButtonComponent],
  templateUrl: './store-picker.component.html',
  styleUrl: './store-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class StorePickerComponent {
  private readonly storeHttp = inject(StoreHttp);

  readonly selected = signal<StoreModel | null>(null);

  private readonly storesResource = this.storeHttp.list();

  readonly stores = computed(() => this.storesResource.value() ?? []);

  readonly dialogRef =
    viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  open(): void {
    const el = this.dialogRef().nativeElement;
    if (typeof el.showModal === 'function') {
      el.showModal();
    }
  }

  select(store: StoreModel): void {
    this.selected.set(store);
    const el = this.dialogRef().nativeElement;
    if (typeof el.close === 'function') el.close();
    storeSelected.emit({ id: store.id });
  }
}
