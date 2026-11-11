import {
  type Injector,
  inject,
  provideEnvironmentInitializer,
  provideZonelessChangeDetection,
} from '@angular/core';
import { createApplication } from '@angular/platform-browser';
import { PointsStore } from './points.store';

let injector: Promise<Injector> | undefined;

// Every element this remote exposes shares one Angular app.
export const getAppInjector = (): Promise<Injector> =>
  (injector ??= createApplication({
    providers: [
      provideZonelessChangeDetection(),
      // Subscribe when the first element (the shell's badge) boots, not when the page first opens.
      provideEnvironmentInitializer(() => inject(PointsStore)),
    ],
  }).then((app) => app.injector));
