import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NavigateToDirective } from '@tractor-store/shared';

@Component({
  selector: 'app-compact-header',
  imports: [NgOptimizedImage, NavigateToDirective],
  template: `
    <div class="c_CompactHeader__inner">
      <a class="c_CompactHeader__link" [appNavigateTo]="'explore.home'">
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
  styleUrl: './compact-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'c_CompactHeader', role: 'banner' },
})
export class CompactHeaderComponent {}
