import type { Provider } from '@angular/core';
import { provideCdnImageLoader } from '../ui/cdn-image-loader';
import { ENV, type EnvironmentConfig } from './env';

export const provideEnv = (env: EnvironmentConfig): Provider[] => [
  { provide: ENV, useValue: env },
  provideCdnImageLoader(),
];
