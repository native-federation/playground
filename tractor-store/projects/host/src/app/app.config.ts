import {
  ApplicationConfig,
  InjectionToken,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import { routes } from './app.routes';

export const MODULE_LOADER = new InjectionToken<NativeFederationResult>(
  'loader',
);

export const appConfig = (nf: NativeFederationResult): ApplicationConfig => ({
  providers: [
    { provide: MODULE_LOADER, useValue: nf },
    provideZonelessChangeDetection(),
    provideRouter(routes),
  ],
});
