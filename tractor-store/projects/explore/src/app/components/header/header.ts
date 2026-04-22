import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { NavigationComponent } from '../navigation/navigation';
import { cdnUrl } from '../../utils/image';

@Component({
  selector: 'app-header',
  imports: [NavigationComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent {
  readonly logoUrl = cdnUrl('/cdn/img/logo.svg');
}
