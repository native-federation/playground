import { ChangeDetectionStrategy, Component } from '@angular/core';
import { cdnUrl } from '../../utils/image';

@Component({
  selector: 'app-compact-header',
  template: `
    <div class="c_CompactHeader__inner">
      <a class="c_CompactHeader__link" href="/">
        <img
          class="c_CompactHeader__logo"
          [src]="logoUrl"
          alt="Micro Frontends - Tractor Store"
        />
      </a>
    </div>
  `,
  styleUrl: './compact-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'c_CompactHeader', role: 'banner' },
})
export class CompactHeaderComponent {
  readonly logoUrl = cdnUrl('/cdn/img/logo.svg');
}
