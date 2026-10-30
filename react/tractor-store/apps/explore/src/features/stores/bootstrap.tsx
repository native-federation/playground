import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import type { EnvironmentConfig } from '@tractor-store/contracts';
import { createCustomElement, getApp } from '../../app';
import { Stores } from './Stores';

export const bootstrap = async (
  env: EnvironmentConfig,
  nf: NativeFederationResult,
): Promise<void> => {
  if (customElements.get('mfe-stores')) return;
  customElements.define('mfe-stores', createCustomElement(Stores, getApp(env, nf)));
};
