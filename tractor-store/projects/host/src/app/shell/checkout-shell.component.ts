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
  selector: 'app-checkout-shell',
  imports: [SpinnerComponent],
  template: `
    @if (loaded()) {
      <mfe-checkout></mfe-checkout>
    } @else {
      <ts-spinner label="Loading checkout…" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CheckoutShell {
  protected readonly loaded = signal(
    customElements.get('mfe-checkout') != null,
  );
  private loader = inject(NF_LOADER);
  private getEnv = inject(GET_ENV);

  constructor() {
    const remoteName = '@tractor-store/checkout';
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
