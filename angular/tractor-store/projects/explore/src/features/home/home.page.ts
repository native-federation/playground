import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewEncapsulation,
  computed,
  inject,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import {
  RemoteElementDirective,
  NavigateToDirective,
} from '@tractor-store/shared';
import { TeaserHttp } from '../../core/data/http/teaser-http';

@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage, RemoteElementDirective, NavigateToDirective],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { 'data-boundary-page': 'explore' },
})
export class HomePage {
  private readonly teaserHttp = inject(TeaserHttp);

  private readonly teaserResource = this.teaserHttp.list();

  readonly teasers = computed(() => this.teaserResource.value() ?? []);

  readonly seedSkus: string[] = ['CL-01-GY', 'AU-07-MT'];
}
