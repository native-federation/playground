import {
  createContext,
  StrictMode,
  useContext,
  type ComponentType,
} from 'react';
import { createRoot, type Root } from 'react-dom/client';
import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import type { EnvironmentConfig, RouteParams } from '@tractor-store/contracts';
import { createRemoteLoader, type LoadRemote } from './shared/remote-element';

export interface App {
  readonly env: EnvironmentConfig;
  readonly loadRemote: LoadRemote;
}

let app: App | undefined;

// Every element this remote exposes shares one App.
export const getApp = (env: EnvironmentConfig, nf: NativeFederationResult): App =>
  (app ??= { env, loadRemote: createRemoteLoader(env, nf) });

const AppContext = createContext<App | null>(null);
const ShadowRootContext = createContext<ShadowRoot | null>(null);

export const useApp = (): App => useContext(AppContext)!;

// Turns a CDN path like '/cdn/img/product/[size]/CL-01.webp' into a URL.
export const useCdn = () => {
  const cdnUrl = useApp().env.cdnUrl.replace(/\/+$/, '');
  const src = (path: string, size = 200) => cdnUrl + path.replace('[size]', String(size));
  const srcSet = (path: string, sizes: readonly number[]) =>
    sizes.map((size) => `${src(path, size)} ${size}w`).join(', ');
  return { src, srcSet };
};

const sheets = new Map<string, CSSStyleSheet>();

// Adopts `css` into the shadow root of the element the component renders in.
export const useStyles = (css: string): void => {
  const root = useContext(ShadowRootContext)!;
  let sheet = sheets.get(css);
  if (!sheet) {
    sheet = new CSSStyleSheet();
    sheet.replaceSync(css);
    sheets.set(css, sheet);
  }
  if (!root.adoptedStyleSheets.includes(sheet)) {
    root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
  }
};

// Renders `Component` in the element's shadow root. Props are the
// `routeParams` the host writes plus the listed attributes, as strings.
export const createCustomElement = <P,>(
  Component: ComponentType<P>,
  app: App,
  attributes: readonly string[] = [],
) =>
  class extends HTMLElement {
    static observedAttributes = attributes;

    #routeParams: RouteParams = {};
    #root?: Root;
    #mount?: HTMLElement;

    get routeParams(): RouteParams {
      return this.#routeParams;
    }

    set routeParams(value: RouteParams) {
      this.#routeParams = value;
      this.#render();
    }

    connectedCallback(): void {
      const shadow = this.shadowRoot ?? this.attachShadow({ mode: 'open' });
      shadow.adoptedStyleSheets = [hostStyles];
      this.#mount = shadow.appendChild(document.createElement('div'));
      this.#root = createRoot(this.#mount);
      this.#render();
    }

    disconnectedCallback(): void {
      const root = this.#root;
      const mount = this.#mount;
      this.#root = this.#mount = undefined;
      // The host removes elements while React is committing, and React can't
      // unmount a root in the middle of that.
      queueMicrotask(() => {
        root?.unmount();
        mount?.remove();
      });
    }

    attributeChangedCallback(): void {
      this.#render();
    }

    #render(): void {
      if (!this.#root) return;
      const props = { routeParams: this.#routeParams } as Record<string, unknown>;
      for (const name of attributes) {
        const value = this.getAttribute(name);
        if (value !== null) props[name] = value;
      }
      this.#root.render(
        <StrictMode>
          <AppContext.Provider value={app}>
            <ShadowRootContext.Provider value={this.shadowRoot}>
              <Component {...(props as P & JSX.IntrinsicAttributes)} />
            </ShadowRootContext.Provider>
          </AppContext.Provider>
        </StrictMode>,
      );
    }
  };

// Custom elements are inline by default.
const hostStyles = new CSSStyleSheet();
hostStyles.replaceSync(':host { display: block; }');
