import { ApplicationRef, Component, inject } from '@angular/core';
import { describe, expect, it, vi } from 'vitest';
import { ENV, type EnvironmentConfig } from './env';
import { defineRemoteApp } from './remote-app';
import { LOAD_REMOTE, type LoadRemote } from './remote-loader';

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
    const loadRemote = vi.fn<LoadRemote>();
    await bootstrap(env, loadRemote);
    await bootstrap(env, loadRemote);
    expect(customElements.get('mfe-probe-once')).toBeDefined();
  });

  it('provides ENV and LOAD_REMOTE to the exposed components', async () => {
    const loadRemote = vi.fn<LoadRemote>();
    await defineRemoteApp().expose('mfe-probe-di', ProbeComponent)(
      env,
      loadRemote,
    );
    document.body.appendChild(document.createElement('mfe-probe-di'));
    expect(seen?.env).toBe(env);
    expect(seen?.loadRemote).toBe(loadRemote);
  });

  it('shares one application between the elements of a remote', async () => {
    const app = defineRemoteApp();
    await app.expose('mfe-probe-a', ProbeComponent)(env, vi.fn());
    await app.expose('mfe-probe-b', ProbeComponent)(env, vi.fn());
    document.body.appendChild(document.createElement('mfe-probe-a'));
    const first = seen?.app;
    document.body.appendChild(document.createElement('mfe-probe-b'));
    expect(seen?.app).toBe(first);
  });
});
