import { InjectionToken } from '@angular/core';
import type { EnvironmentConfig } from './env';

// Loads an exposed `mfe-*` element from a remote and defines it on the page.
export type LoadRemote = (remoteName: string, element: string) => Promise<void>;

export const LOAD_REMOTE = new InjectionToken<LoadRemote>('LOAD_REMOTE');

// What every exposed `mfe-*` module exports.
export interface RemoteElementModule {
  bootstrap(env: EnvironmentConfig, loadRemote: LoadRemote): Promise<void>;
}
