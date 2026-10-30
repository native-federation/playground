import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import type { EnvironmentConfig } from '@tractor-store/contracts';
import { createCustomElement, getApp } from '../../app';
import { Product } from './Product';

export const bootstrap = async (
  env: EnvironmentConfig,
  nf: NativeFederationResult,
): Promise<void> => {
  if (customElements.get('mfe-product')) return;
  customElements.define('mfe-product', createCustomElement(Product, getApp(env, nf)));
};
