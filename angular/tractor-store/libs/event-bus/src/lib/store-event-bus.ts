import { defineChannel } from './event-bus-setup';

export type StoreSelectedPayload = {
  readonly id: string;
};

export const storeSelected =
  defineChannel<StoreSelectedPayload>('store:selected');

// Usage:
//   storeSelected.emit({ id: 'ABC-1' });
//   const unsubscribe = storeSelected.on((p) => console.log(p.id));
//   unsubscribe();
