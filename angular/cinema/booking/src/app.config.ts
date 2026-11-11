import { type Injector, provideZonelessChangeDetection } from '@angular/core';
import { createApplication } from '@angular/platform-browser';

let injector: Promise<Injector> | undefined;

// Every element this remote exposes shares one Angular app.
export const getAppInjector = (): Promise<Injector> =>
  (injector ??= createApplication({
    providers: [provideZonelessChangeDetection()],
  }).then((app) => app.injector));
