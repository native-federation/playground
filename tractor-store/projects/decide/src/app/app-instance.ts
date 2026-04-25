import { ApplicationRef } from '@angular/core';
import { createApplication } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EnvironmentConfig } from '../env.config';
import { appConfig } from './app.config';
import { setImageServer } from './utils/image';

let appPromise: Promise<ApplicationRef> | null = null;

export function getApp(env: EnvironmentConfig): Promise<ApplicationRef> {
  if (!appPromise) {
    setImageServer(env.cdnUrl);
    appPromise = createApplication(appConfig(env)).then((app) => {
      app.injector.get(Router).initialNavigation();
      return app;
    });
  }
  return appPromise;
}
