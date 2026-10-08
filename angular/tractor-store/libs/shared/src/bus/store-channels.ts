import { defineChannel } from './channel';

export interface StoreSelectedPayload {
  readonly id: string;
}

export const storeSelected =
  defineChannel<StoreSelectedPayload>('store:selected');
