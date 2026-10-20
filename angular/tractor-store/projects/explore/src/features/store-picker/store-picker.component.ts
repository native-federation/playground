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
import type { Events } from '@tractor-store/contracts';
import type { Store } from '../../data/store';
import { StoreService } from '../../data/store.service';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-store-picker',
  imports: [NgOptimizedImage, ButtonComponent],
  templateUrl: './store-picker.component.html',
  styleUrl: './store-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class StorePickerComponent {
  private readonly storesResource = inject(StoreService).list();
  private readonly dialog =
    viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  protected readonly stores = computed(() => this.storesResource.value() ?? []);
  protected readonly selected = signal<Store | null>(null);

  protected open(): void {
    this.dialog().nativeElement.showModal();
  }

  protected select(store: Store): void {
    this.selected.set(store);
    this.dialog().nativeElement.close();
    window.__NF_REGISTRY__!.emit<Events['store:selected']>('store:selected', {
      id: store.id,
    });
  }
}
