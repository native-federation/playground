import { defineChannel } from './event-bus-setup';

export interface NavigatePayload {
  readonly id: string;
  readonly payload?: Readonly<Record<string, string>>;
}

export const navigateTo = defineChannel<NavigatePayload>('nav:navigate');

// Usage:
//   cartItemAdded.emit({ sku: 'ABC-1', qty: 2 });
//   const unsubscribe = cartItemAdded.on((p) => console.log(p.sku, p.qty));
//   unsubscribe();
