import { InjectionToken } from '@angular/core';

export const BOOKING_REF = new InjectionToken<() => string>('BOOKING_REF', {
  providedIn: 'root',
  factory: () => () =>
    'BR-' + Math.floor(Math.random() * 0x10000).toString(16).toUpperCase().padStart(4, '0'),
});
