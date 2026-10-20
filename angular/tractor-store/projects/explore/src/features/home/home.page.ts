import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewEncapsulation,
  computed,
  inject,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TeaserService } from '../../data/teaser.service';
import { NavIntentDirective } from '../../shared/nav-intent.directive';
import { RemoteElementDirective } from '../../shared/remote-element';

@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage, RemoteElementDirective, NavIntentDirective],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { 'data-boundary-page': 'explore' },
})
export class HomePage {
  private readonly teaserResource = inject(TeaserService).list();
  protected readonly teasers = computed(
    () => this.teaserResource.value() ?? [],
  );
}
