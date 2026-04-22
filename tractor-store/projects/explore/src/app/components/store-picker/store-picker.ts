import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ButtonComponent } from '@tractor-store/ui';
import { ExploreDataService, Store } from '../../services/explore-data.service';
import { imgSrc, imgSrcset } from '../../utils/image';

@Component({
  selector: 'app-store-picker',
  imports: [ButtonComponent],
  templateUrl: './store-picker.html',
  styleUrl: './store-picker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorePickerComponent {
  private readonly dataSvc = inject(ExploreDataService);
  private readonly hostRef = inject(ElementRef<HTMLElement>);

  readonly stores = computed(() => this.dataSvc.stores());
  readonly selected = signal<Store | null>(null);

  readonly dialogRef =
    viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  readonly imageMeta = (image: string) => ({
    src: imgSrc(image, 200),
    srcset: imgSrcset(image, [200, 400]),
  });

  open(): void {
    const el = this.dialogRef().nativeElement;
    if (typeof el.showModal === 'function') {
      el.showModal();
    }
  }

  select(store: Store): void {
    this.selected.set(store);
    const el = this.dialogRef().nativeElement;
    if (typeof el.close === 'function') el.close();
    this.hostRef.nativeElement.dispatchEvent(
      new CustomEvent('store-selected', {
        detail: { id: store.id },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
