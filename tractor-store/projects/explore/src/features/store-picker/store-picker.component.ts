import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { storeSelected } from '@internal/events';
import { ButtonComponent } from '@internal/ui';
import type { StoreModel } from '../../core/data/contracts/models/store.model';
import { StoreHttp } from '../../core/data/http/store-http';
import { ResourceService } from '../../shared/utils/resource.service';

interface StoreView extends StoreModel {
  src: string;
  srcset: string;
}

@Component({
  selector: 'app-store-picker',
  imports: [ButtonComponent],
  templateUrl: './store-picker.component.html',
  styleUrl: './store-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorePickerComponent {
  private readonly storeHttp = inject(StoreHttp);
  private readonly image = inject(ResourceService);

  readonly selected = signal<StoreModel | null>(null);

  private readonly storesResource = this.storeHttp.list();

  readonly stores = computed<StoreView[]>(() =>
    (this.storesResource.value() ?? []).map((s) => this.toView(s)),
  );

  readonly selectedView = computed<StoreView | null>(() => {
    const s = this.selected();
    return s ? this.toView(s) : null;
  });

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

  private toView(store: StoreModel): StoreView {
    return {
      ...store,
      src: this.image.imgSrc(store.image, 200),
      srcset: this.image.imgSrcset(store.image, [200, 400]),
    };
  }
}
