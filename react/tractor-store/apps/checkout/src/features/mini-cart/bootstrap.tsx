import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import type { EnvironmentConfig } from '@tractor-store/contracts';
import { createCustomElement, getApp } from '../../app';
import { MiniCart } from './MiniCart';

export const bootstrap = async (
  env: EnvironmentConfig,
  nf: NativeFederationResult,
): Promise<void> => {
  if (customElements.get('mfe-mini-cart')) return;
  customElements.define('mfe-mini-cart', createCustomElement(MiniCart, getApp(env, nf)));
};
