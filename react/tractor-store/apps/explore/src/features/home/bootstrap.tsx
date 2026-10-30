import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import type { EnvironmentConfig } from '@tractor-store/contracts';
import { createCustomElement, getApp } from '../../app';
import { Home } from './Home';

export const bootstrap = async (
  env: EnvironmentConfig,
  nf: NativeFederationResult,
): Promise<void> => {
  if (customElements.get('mfe-home')) return;
  customElements.define('mfe-home', createCustomElement(Home, getApp(env, nf)));
};
