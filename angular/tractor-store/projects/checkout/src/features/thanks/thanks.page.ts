import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewEncapsulation,
  afterNextRender,
} from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { RemoteElementDirective } from '../../shared/remote-element';

const CONFETTI_URL = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/+esm';

type Confetti = (options: Record<string, unknown>) => void;

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
  constructor() {
    afterNextRender(() => this.celebrate());
  }

  private async celebrate(): Promise<void> {
    try {
      const { default: confetti }: { default: Confetti } = await import(
        /* @vite-ignore */ CONFETTI_URL
      );
      const settings = {
        particleCount: 3,
        scalar: 1.5,
        colors: ['#FFDE54', '#FF5A54', '#54FF90'],
        spread: 70,
      };
      const end = Date.now() + 1000;
      const frame = () => {
        confetti({ ...settings, angle: 60, origin: { x: 0 } });
        confetti({ ...settings, angle: 120, origin: { x: 1 } });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    } catch (err) {
      console.warn('[thanks] confetti failed to load', err);
    }
  }
}
