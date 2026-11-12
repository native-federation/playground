import { bus } from '@softarc/native-federation-communication';
import type { NavigatePayload } from '@tractor-store/contracts';

// The only place that emits nav:navigate: a command, so a listener that subscribes later never gets it.
export const navigateTo = (target: NavigatePayload): void =>
  bus.emit('nav:navigate', target, { retain: false });
