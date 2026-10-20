import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NavIntentDirective } from '../../nav-intent.directive';

@Component({
  selector: 'app-compact-header',
  imports: [NgOptimizedImage, NavIntentDirective],
  template: `
    <div class="c_CompactHeader__inner">
      <a class="c_CompactHeader__link" [navIntent]="'explore.home'">
        <img
          class="c_CompactHeader__logo"
          ngSrc="/cdn/img/logo.svg"
          width="700"
          height="200"
          disableOptimizedSrcset
          alt="Micro Frontends - Tractor Store"
        />
      </a>
    </div>
  `,
  styleUrl: './compact-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'c_CompactHeader', role: 'banner' },
})
export class CompactHeaderComponent {}
