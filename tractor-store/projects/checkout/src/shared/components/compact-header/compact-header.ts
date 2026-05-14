import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigateToDirective } from '@internal/events';
import { ResourceService } from '../../utils/resource.service';

@Component({
  selector: 'app-compact-header',
  imports: [NavigateToDirective],
  template: `
    <div class="c_CompactHeader__inner">
      <a class="c_CompactHeader__link" [navigateTo]="'explore.home'">
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
  private readonly image = inject(ResourceService);
  readonly logoUrl = this.image.cdnUrl('/cdn/img/logo.svg');
}
