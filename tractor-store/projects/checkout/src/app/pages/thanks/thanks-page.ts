import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { ButtonComponent } from '@tractor-store/ui';

@Component({
  selector: 'app-thanks-page',
  imports: [ButtonComponent],
  templateUrl: './thanks-page.html',
  styleUrl: './thanks-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { 'data-boundary-page': 'checkout' },
})
export class ThanksPage {}
