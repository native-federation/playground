import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import type { EnvironmentConfig } from '@tractor-store/contracts';
import { createCustomElement, getApp } from '../../app';
import { AddToCart } from './AddToCart';

export const bootstrap = async (
  env: EnvironmentConfig,
  nf: NativeFederationResult,
): Promise<void> => {
  if (customElements.get('mfe-add-to-cart')) return;
  customElements.define('mfe-add-to-cart', createCustomElement(AddToCart, getApp(env, nf), ['sku']));
};
