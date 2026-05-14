import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { NavigateToDirective, NavPayload } from '@internal/events';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'small' | 'normal';

@Component({
  selector: 'ts-button',
  imports: [NgTemplateOutlet, NavigateToDirective],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  readonly type = input<'button' | 'submit' | 'reset' | null>(null);
  readonly value = input<string | null>(null);
  readonly disabled = input(false, { transform: Boolean });
  readonly rounded = input(false, { transform: Boolean });
  readonly variant = input<ButtonVariant>('secondary');
  readonly size = input<ButtonSize>('normal');
  readonly dataId = input<string | null>(null);
  readonly title = input<string | null>(null);
  readonly extraClass = input<string>('');
  readonly navigateTo = input<string | null>(null);
  readonly navParams = input<NavPayload>({});

  readonly buttonClass = computed(() => {
    const classes = [
      'c_Button',
      `c_Button--${this.variant()}`,
      `c_Button--size-${this.size()}`,
    ];
    if (this.rounded()) classes.push('c_Button--rounded');
    if (this.extraClass()) classes.push(this.extraClass());
    return classes.join(' ');
  });
}
