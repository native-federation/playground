import { ChangeDetectionStrategy, Component } from '@angular/core';
import { cdnUrl } from '../../utils/image';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly neulandLogo = cdnUrl('/cdn/img/neulandlogo.svg');
}
