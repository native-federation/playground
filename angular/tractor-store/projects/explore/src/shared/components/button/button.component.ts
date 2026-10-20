import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button
      class="c_Button c_Button--secondary c_Button--size-normal"
      [type]="type()"
    >
      <div class="c_Button__inner"><ng-content /></div>
    </button>
  `,
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  readonly type = input<'button' | 'submit' | 'reset'>('button');
}
