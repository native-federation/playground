import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { NavIntentDirective } from '../../nav-intent.directive';

@Component({
  selector: 'app-button',
  imports: [NgTemplateOutlet, NavIntentDirective],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  readonly type = input<'button' | 'submit'>('button');
  readonly disabled = input(false, { transform: Boolean });
  readonly rounded = input(false, { transform: Boolean });
  readonly variant = input<'primary' | 'secondary'>('secondary');
  readonly size = input<'small' | 'normal'>('normal');
  readonly title = input<string | null>(null);
  readonly navIntent = input<string | null>(null);

  protected readonly buttonClass = computed(() => {
    const classes = [
      'c_Button',
      `c_Button--${this.variant()}`,
      `c_Button--size-${this.size()}`,
    ];
    if (this.rounded()) classes.push('c_Button--rounded');
    return classes.join(' ');
  });
}
