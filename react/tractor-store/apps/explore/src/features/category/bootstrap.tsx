import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import type { EnvironmentConfig } from '@tractor-store/contracts';
import { createCustomElement, getApp } from '../../app';
import { Category } from './Category';

export const bootstrap = async (
  env: EnvironmentConfig,
  nf: NativeFederationResult,
): Promise<void> => {
  if (customElements.get('mfe-category')) return;
  customElements.define('mfe-category', createCustomElement(Category, getApp(env, nf)));
};
