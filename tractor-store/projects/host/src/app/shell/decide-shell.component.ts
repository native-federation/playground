import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  signal,
} from '@angular/core';
import { SpinnerComponent } from '@tractor-store/ui';
import { ComponentBootstrap } from '@internal/federation';
import { GET_ENV, NF_LOADER } from '../app.config';

@Component({
  selector: 'app-decide-shell',
  imports: [SpinnerComponent],
  template: `
    @if (loaded()) {
      <mfe-decide></mfe-decide>
    } @else {
      <ts-spinner label="Loading product…" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DecideShell {
  protected readonly loaded = signal(customElements.get('mfe-decide') != null);
  private loader = inject(NF_LOADER);
  private getEnv = inject(GET_ENV);

  constructor() {
    const remoteName = '@tractor-store/decide';
    this.loader
      .loadRemoteModule<ComponentBootstrap>(remoteName, './Component')
      .then((mod) =>
        mod.bootstrap(this.getEnv(remoteName), this.loader.loadRemoteModule),
      )
      .then(() => this.loaded.set(true))
      .catch((err) => {
        console.error(`Failed to load remote ${remoteName}`, err);
        throw err;
      });
  }
}
