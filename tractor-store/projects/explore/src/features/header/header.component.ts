import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
} from '@angular/core';
import { NavigateToDirective } from '@internal/events';
import { NavigationComponent } from '../../shared/components/navigation/navigation';
import { ResourceService } from '../../shared/utils/resource.service';
import { LOADER } from '../../core/remote-loader';

@Component({
  selector: 'app-header',
  imports: [NavigationComponent, NavigateToDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent {
  private readonly image = inject(ResourceService);
  readonly logoUrl = this.image.cdnUrl('/cdn/img/logo.svg');
  private readonly loader = inject(LOADER);

  constructor() {
    void this.loader('@tractor-store/checkout', 'mfe-mini-cart');
  }
}
