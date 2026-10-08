import { InjectionToken } from '@angular/core';

export interface EnvironmentConfig {
  readonly production: boolean;
  readonly apiUrl: string;
  readonly cdnUrl: string;
}

export const ENV = new InjectionToken<EnvironmentConfig>('ENV');

export function toCdnUrl(path: string, cdnUrl: string): string {
  const base = cdnUrl.replace(/\/+$/, '');
  const rel = path.startsWith('/') ? path : `/${path}`;
  return `${base}${rel}`;
}
