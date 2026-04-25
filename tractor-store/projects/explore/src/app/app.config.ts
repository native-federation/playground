import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouterSync } from '@internal/navigation';
import { getRoutes } from './app.routes';
import { ENV, EnvironmentConfig } from './../env.config';

export const appConfig = (env: EnvironmentConfig): ApplicationConfig => ({
  providers: [
    { provide: ENV, useValue: env },
    provideHttpClient(withFetch()),
    provideZonelessChangeDetection(),
    provideRouter(getRoutes(), withComponentInputBinding()),
    provideRouterSync(),
  ],
});
