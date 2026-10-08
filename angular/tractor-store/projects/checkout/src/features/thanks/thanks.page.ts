import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  PLATFORM_ID,
  ViewEncapsulation,
  afterNextRender,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RemoteElementDirective, ButtonComponent } from '@tractor-store/shared';

type ConfettiFn = (options: Record<string, unknown>) => void;

@Component({
  selector: 'app-thanks',
  imports: [RemoteElementDirective, ButtonComponent],
  templateUrl: './thanks.page.html',
  styleUrl: './thanks.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { 'data-boundary-page': 'checkout' },
})
export class ThanksPage {
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      const url = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/+esm';
      (
        new Function('u', 'return import(u)') as (
          u: string,
        ) => Promise<{ default: ConfettiFn }>
      )(url)
        .then((mod) => {
          const confetti = mod.default;
          const end = Date.now() + 1000;
          const settings = {
            particleCount: 3,
            scalar: 1.5,
            colors: ['#FFDE54', '#FF5A54', '#54FF90'],
            spread: 70,
          };
          const frame = () => {
            confetti({ ...settings, angle: 60, origin: { x: 0 } });
            confetti({ ...settings, angle: 120, origin: { x: 1 } });
            if (Date.now() < end) requestAnimationFrame(frame);
          };
          frame();
        })
        .catch(() => {});
    });
  }
}
