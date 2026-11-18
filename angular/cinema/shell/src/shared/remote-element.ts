import { InjectionToken } from '@angular/core';
import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import type { RemoteElementModule } from '../contracts';

export const LOAD_REMOTE = new InjectionToken<
  (remoteName: string, element: string) => Promise<void>
>('LOAD_REMOTE');

export const createRemoteLoader =
  (nf: NativeFederationResult) =>
  async (remoteName: string, element: string): Promise<void> => {
    if (customElements.get(element)) return;
    const mod = await nf.loadRemoteModule<RemoteElementModule>(
      remoteName,
      element,
    );
    await mod.bootstrap();
  };
