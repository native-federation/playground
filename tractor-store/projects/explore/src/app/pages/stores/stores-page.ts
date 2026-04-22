import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ExploreDataService } from '../../services/explore-data.service';
import { StoreTileComponent } from '../../components/store-tile/store-tile';
import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';

@Component({
  selector: 'app-stores-page',
  imports: [StoreTileComponent, HeaderComponent, FooterComponent],
  templateUrl: './stores-page.html',
  styleUrl: './stores-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-boundary-page': 'explore' },
})
export class StoresPage {
  private readonly data = inject(ExploreDataService);
  readonly stores = computed(() => this.data.stores());
}
