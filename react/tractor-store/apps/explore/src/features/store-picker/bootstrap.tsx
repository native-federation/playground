import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import type { EnvironmentConfig } from '@tractor-store/contracts';
import { createCustomElement, getApp } from '../../app';
import { StorePicker } from './StorePicker';

export const bootstrap = async (
  env: EnvironmentConfig,
  nf: NativeFederationResult,
): Promise<void> => {
  if (customElements.get('mfe-store-picker')) return;
  customElements.define('mfe-store-picker', createCustomElement(StorePicker, getApp(env, nf)));
};
