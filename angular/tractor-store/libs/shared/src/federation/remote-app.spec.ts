import { ApplicationRef, Component, inject } from '@angular/core';
import { describe, expect, it } from 'vitest';
import { ENV, type EnvironmentConfig } from './env';
import { defineRemoteApp } from './remote-app';
import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import { LOAD_REMOTE, type LoadRemote } from './remote-loader';

const nf = {} as NativeFederationResult;
const env: EnvironmentConfig = {
  production: false,
  apiUrl: '',
  cdnUrl: 'http://cdn.test',
};

let seen:
  | { env: EnvironmentConfig; loadRemote: LoadRemote; app: ApplicationRef }
  | undefined;

@Component({ selector: 'app-probe', template: '' })
class ProbeComponent {
  constructor() {
    seen = {
      env: inject(ENV),
      loadRemote: inject(LOAD_REMOTE),
      app: inject(ApplicationRef),
    };
  }
}

// Tag names must be unique per test file: customElements cannot be redefined.
describe('defineRemoteApp', () => {
  it('defines the custom element once', async () => {
    const bootstrap = defineRemoteApp().expose(
      'mfe-probe-once',
      ProbeComponent,
    );
    await bootstrap(env, nf);
    await bootstrap(env, nf);
    expect(customElements.get('mfe-probe-once')).toBeDefined();
  });

  it('provides ENV and a remote loader to the exposed components', async () => {
    await defineRemoteApp().expose('mfe-probe-di', ProbeComponent)(env, nf);
    document.body.appendChild(document.createElement('mfe-probe-di'));
    expect(seen?.env).toBe(env);
    expect(seen?.loadRemote).toBeTypeOf('function');
  });

  it('shares one application between the elements of a remote', async () => {
    const app = defineRemoteApp();
    await app.expose('mfe-probe-a', ProbeComponent)(env, nf);
    await app.expose('mfe-probe-b', ProbeComponent)(env, nf);
    document.body.appendChild(document.createElement('mfe-probe-a'));
    const first = seen?.app;
    document.body.appendChild(document.createElement('mfe-probe-b'));
    expect(seen?.app).toBe(first);
  });
});
