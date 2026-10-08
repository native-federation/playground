import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewEncapsulation,
  computed,
  inject,
} from '@angular/core';
import { StoreHttp } from '../../core/data/http/store-http';
import { StoreTileComponent } from '../../shared/components/store-tile/store-tile';
import { RemoteElementDirective } from '@tractor-store/shared';

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
  private readonly storeHttp = inject(StoreHttp);
  private readonly storesResource = this.storeHttp.list();
  readonly stores = computed(() => this.storesResource.value() ?? []);
}
