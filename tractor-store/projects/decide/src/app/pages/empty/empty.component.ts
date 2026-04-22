import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-decide-empty',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyPage {}
