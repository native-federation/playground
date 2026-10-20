import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewEncapsulation,
  computed,
  inject,
} from '@angular/core';
import { StoreService } from '../../data/store.service';
import { RemoteElementDirective } from '../../shared/remote-element';
import { StoreTileComponent } from '../../shared/components/store-tile/store-tile.component';

@Component({
  selector: 'app-stores',
  imports: [RemoteElementDirective, StoreTileComponent],
  templateUrl: './stores.page.html',
  styleUrl: './stores.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { 'data-boundary-page': 'explore' },
})
export class StoresPage {
  private readonly storesResource = inject(StoreService).list();
  protected readonly stores = computed(() => this.storesResource.value() ?? []);
}
