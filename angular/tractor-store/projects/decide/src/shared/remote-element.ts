import {
  Directive,
  ElementRef,
  HostAttributeToken,
  InjectionToken,
  inject,
} from '@angular/core';
import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import type {
  EnvironmentConfig,
  RemoteElementModule,
} from '@tractor-store/contracts';

export const LOAD_REMOTE = new InjectionToken<
  (remoteName: string, element: string) => Promise<void>
>('LOAD_REMOTE');

export const createRemoteLoader =
  (env: EnvironmentConfig, nf: NativeFederationResult) =>
  async (remoteName: string, element: string): Promise<void> => {
    if (customElements.get(element)) return;
    const mod = await nf.loadRemoteModule<RemoteElementModule>(
      remoteName,
      element,
    );
    await mod.bootstrap(env, nf);
  };

// Put on an `mfe-*` tag to load and define that element from its remote:
// <mfe-header mfeRemote="@tractor-store/explore" />
@Directive({ selector: '[mfeRemote]' })
export class RemoteElementDirective {
  constructor() {
    const remoteName = inject(new HostAttributeToken('mfeRemote'));
    const element =
      inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.localName;
    inject(LOAD_REMOTE)(remoteName, element).catch((err) =>
      console.error(
        `[remote] failed to load <${element}> from "${remoteName}"`,
        err,
      ),
    );
  }
}
