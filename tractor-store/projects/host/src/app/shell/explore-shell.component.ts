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
  selector: 'app-explore-shell',
  imports: [SpinnerComponent],
  template: `
    @if (loaded()) {
      <mfe-explore></mfe-explore>
    } @else {
      <ts-spinner label="Loading explore…" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ExploreShell {
  protected readonly loaded = signal(customElements.get('mfe-explore') != null);
  private loader = inject(NF_LOADER);
  private getEnv = inject(GET_ENV);

  constructor() {
    const remoteName = '@tractor-store/explore';
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
