import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import type { EnvironmentConfig } from '@tractor-store/contracts';
import { createCustomElement, getApp } from '../../app';
import { Recommendations } from './Recommendations';

export const bootstrap = async (
  env: EnvironmentConfig,
  nf: NativeFederationResult,
): Promise<void> => {
  if (customElements.get('mfe-recommendations')) return;
  customElements.define('mfe-recommendations', createCustomElement(Recommendations, getApp(env, nf), ['skus']));
};
