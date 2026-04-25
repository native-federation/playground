import {
  ApplicationConfig,
  InjectionToken,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import { provideRouterSync } from '@internal/navigation';
import { routes } from './app.routes';
import { EnvironmentConfig } from '@internal/federation';

export const NF_LOADER = new InjectionToken<NativeFederationResult>(
  'nf-loader',
);

export const GET_ENV = new InjectionToken<
  (remoteName: string) => EnvironmentConfig
>('get-env-config');

const mapToRemoteEnv =
  ({
    manifest,
    production,
    apiUrl,
    cdnUrl,
  }: EnvironmentConfig & { manifest: Record<string, string> }) =>
  (remoteName: string): EnvironmentConfig => ({
    production,
    apiUrl,
    scope:
      manifest[remoteName]?.replace('/remoteEntry.json', '') ?? location.origin,
    cdnUrl,
  });

export const appConfig = (
  nf: NativeFederationResult,
  manifest: EnvironmentConfig & { manifest: Record<string, string> },
): ApplicationConfig => ({
  providers: [
    { provide: NF_LOADER, useValue: nf },
    { provide: GET_ENV, useValue: mapToRemoteEnv(manifest) },
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideRouterSync(),
  ],
});
