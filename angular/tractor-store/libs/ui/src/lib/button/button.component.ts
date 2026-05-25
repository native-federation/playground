import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { NavigateToDirective } from '@internal/navigation';
import { NavPayload } from '@internal/url';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'small' | 'normal';

@Component({
  selector: 'ts-button',
  imports: [NgTemplateOutlet, NavigateToDirective],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  host: {
    '(click)': 'onHostClick($event)',
  },
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
  readonly appNavigateTo = input<string | null>(null);
  readonly navPayload = input<NavPayload>({});

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

  // The real <button type="submit"> lives in this component's shadow root, so
  // browsers don't associate it with the <form> in the host's shadow root.
  // Forward the click as a programmatic submit on the enclosing form.
  onHostClick(event: Event): void {
    if (this.type() !== 'submit' || this.disabled()) return;
    const host = event.currentTarget as HTMLElement;
    host.closest('form')?.requestSubmit();
  }
}
