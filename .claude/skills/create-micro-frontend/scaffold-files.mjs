#!/usr/bin/env node
// Usage: node scaffold-files.mjs <PROJECT> [PORT]
//
// Scaffolds (or replaces) the static native-federation files for a new
// micro frontend. Also automates SKILL.md steps 1 (derive WORKSPACE/PORT),
// 6 (rewrite index.html), 7 (add lint script), and 9.2 (smoke spec).

import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(scriptDir, '..', '..', '..');

// ---------------------------------------------------------------------------
// 1. Parse args and derive values
// ---------------------------------------------------------------------------

const [, , WORKSPACE_ARG, PROJECT_ARG, PORT_ARG] = process.argv;

if (!PROJECT_ARG) {
  console.error('Usage: node scaffold-files.mjs <PROJECT> [PORT]');
  process.exit(1);
}

const WORKSPACE = WORKSPACE_ARG.toLowerCase();
if (!/^[a-z]+(-[a-z]+)*$/.test(WORKSPACE)) {
  console.error(
    `Error: invalid WORKSPACE '${WORKSPACE_ARG}'. Must contain only letters and single dashes (e.g. 'my-pilet').`,
  );
  process.exit(1);
}

const PROJECT = PROJECT_ARG.toLowerCase();
if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(PROJECT)) {
  console.error(
    `Error: invalid PROJECT '${PROJECT_ARG}'. Must start with a letter and contain only letters, numbers, and single dashes (e.g. 'my-pilet2').`,
  );
  process.exit(1);
}
if (PROJECT !== PROJECT_ARG) {
  console.warn(`Note: normalized project name '${PROJECT_ARG}' to '${PROJECT}'.`);
}

const PROJECT_DIR = join(ROOT, WORKSPACE, 'projects', PROJECT);
if (!existsSync(join(PROJECT_DIR, 'src', 'app'))) {
  console.error(
    `Error: ${PROJECT_DIR}/src/app does not exist. Run 'pnpm ng g application ${PROJECT}' first.`,
  );
  process.exit(1);
}

const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
const writeJson = (path, data) =>
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n');

const angularJsonPath = join(ROOT, WORKSPACE, 'angular.json');
const angularJson = readJson(angularJsonPath);
// Prefer `serve-original.options.port` (federation projects), fall back to
// plain `serve.options.port` for projects that don't have a federation
// wrapper yet.
const usedPorts = Object.values(angularJson.projects ?? {})
  .map((proj) => {
    const architect = proj?.architect ?? {};
    return (
      architect['serve-original']?.options?.port ??
      architect.serve?.options?.port
    );
  })
  .filter((port) => typeof port === 'number' && port > 0);

const PORT = PORT_ARG
  ? Number(PORT_ARG)
  : usedPorts.length
    ? Math.max(...usedPorts) + 1
    : 4201;

if (Number.isNaN(PORT)) {
  console.error(`Error: invalid PORT '${PORT_ARG}'`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const writeFile = (relPath, contents) => {
  const full = join(PROJECT_DIR, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, contents);
  return full;
};

const created = [];

// ---------------------------------------------------------------------------
// 5. Scaffold federation files
// ---------------------------------------------------------------------------

created.push(
  writeFile(
    'src/main.ts',
    `import { initFederation } from '@softarc/native-federation-orchestrator';
import {
  useShimImportMap,
  consoleLogger,
  globalThisStorageEntry,
} from '@softarc/native-federation-orchestrator/options';

let showErrors = false;

fetch('./env.config.json')
  .then((resp) => resp.json())
  .then(async (cfg) => {
    showErrors = !cfg.production;
    await initFederation(
      {},
      {
        ...useShimImportMap({ shimMode: true }),
        logger: consoleLogger,
        storage: globalThisStorageEntry,
        hostRemoteEntry: './remoteEntry.json',
        logLevel: 'debug',
      },
    );
    return import('./app/bootstrap').then((m: any) => m.bootstrap(cfg));
  })

  .catch((err) => {
    console.error('Failed to load app!');
    if (showErrors) console.error(err);
  });
`,
  ),
);

created.push(
  writeFile(
    'src/app/bootstrap.ts',
    `import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { App } from './app';
import { appConfig } from './app.config';
import { EnvironmentConfig } from '../env.config';
import { Router } from '@angular/router';

export async function bootstrap(env: EnvironmentConfig): Promise<void> {
  await createApplication(appConfig(env)).then(({ injector }) => {
    customElements.define(
      'mfe-${PROJECT}',
      createCustomElement(App, { injector }),
    );

    // Enable when you use routing
    // const router = injector.get(Router);
    // router.initialNavigation();
  });
}
`,
  ),
);

created.push(
  writeFile(
    'federation.config.js',
    `import {withNativeFederation, shareAll} from '@angular-architects/native-federation-v4/config';

export default withNativeFederation({

  name: '@${WORKSPACE}/${PROJECT}',
  exposes: {
    './Component': './projects/${PROJECT}/src/app/bootstrap.ts',
  },
  shared: {
    ...shareAll(
      { singleton: true, strictVersion: true, requiredVersion: 'auto', build: 'package' },
      {
        overrides: {
          '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto', build: 'package', includeSecondaries: {keepAll: true}},
        }
      }
    ),
  },
  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
  ],

  features: {
    denseChunking: true
  }
});
`,
  ),
);

created.push(
  writeFile(
    'src/env.config.ts',
    `import { InjectionToken } from '@angular/core';

export const ENV = new InjectionToken<EnvironmentConfig>('ENV');

export interface EnvironmentConfig {
  production: boolean;
  apiUrl: string;
  scope: string;
}
`,
  ),
);

created.push(
  writeFile(
    'public/env.config.json',
    `{
  "production": false,
  "apiUrl": "<<The url to the backend>>",
  "scope": "http://localhost:${PORT}"
}
`,
  ),
);

created.push(
  writeFile(
    'src/app/app.config.ts',
    `import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { getRoutes } from './app.routes';
import { ENV, EnvironmentConfig } from './../env.config';

export const appConfig = (env: EnvironmentConfig): ApplicationConfig => ({
  providers: [
    { provide: ENV, useValue: env },
    provideHttpClient(withFetch()),
    provideZonelessChangeDetection(),
    provideRouter(getRoutes()),
  ],
});
`,
  ),
);

created.push(
  writeFile(
    'src/app/app.routes.ts',
    `import { Routes } from '@angular/router';

export const getRoutes = (): Routes => [];
`,
  ),
);

created.push(
  writeFile(
    'tsconfig.federation.json',
    `{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "../../out-tsc/app",
    "types": []
  },
  "files": [
    "src/main.ts"
  ],
  "include": [
    "src/**/*.d.ts"
  ]
}
`,
  ),
);

created.push(
  writeFile(
    'src/styles/_app.scss',
`

*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  text-size-adjust: 100%;
  font-size: 100%; /* percentage of user given font-size (REM), 100% is 16px  */
  font-family: sans-serif;
}

.container {
  margin-right: auto;
  margin-left: auto;
  max-width: 92vw;
  padding-bottom: 1rem;
  margin-top: 1.5rem;

  @media only screen and (width >= 48em) {
    max-width: 45em;
  }

  @media only screen and (width >= 62em) {
    max-width: 60em;
  }

  @media only screen and (width <= 36em) {
    margin-bottom: 3rem;
  }
}
`,
  ),
);

// ---------------------------------------------------------------------------
// 5b. Remove stale src/bootstrap.ts left by the federation-v4 init schematic.
//     Nothing imports it (main.ts uses ./app/bootstrap) and it fails to
//     type-check against the rewritten app.config.ts (appConfig is a factory
//     here, not a plain ApplicationConfig).
// ---------------------------------------------------------------------------

const staleBootstrap = join(PROJECT_DIR, 'src', 'bootstrap.ts');
if (existsSync(staleBootstrap)) {
  unlinkSync(staleBootstrap);
  created.push(`${staleBootstrap} (removed stale federation-init file)`);
}

// ---------------------------------------------------------------------------
// 5c. Patch angular.json — the federation-v4 init schematic registers the
//     `test` architect but omits the `buildTarget` option, so `ng test` fails
//     until it is set to the esbuild target.
// ---------------------------------------------------------------------------

const projectArchitect = angularJson.projects?.[PROJECT]?.architect;
if (projectArchitect?.test) {
  const expected = `${PROJECT}:esbuild:development`;
  const options = projectArchitect.test.options ?? {};
  if (options.buildTarget !== expected) {
    projectArchitect.test.options = { ...options, buildTarget: expected };
    writeJson(angularJsonPath, angularJson);
    created.push(`${angularJsonPath} (set test buildTarget to '${expected}')`);
  }
}

// ---------------------------------------------------------------------------
// 6. Update index.html — replace <app-root> with custom element
// ---------------------------------------------------------------------------

const indexPath = join(PROJECT_DIR, 'src', 'index.html');
if (existsSync(indexPath)) {
  let indexHtml = readFileSync(indexPath, 'utf8');
  indexHtml = indexHtml
    .replace(
      /<app-root\s*><\/app-root>/g,
      `<mfe-${PROJECT}></mfe-${PROJECT}>`,
    )
    .replace(
      /<app-root\s*\/>/g,
      `<mfe-${PROJECT}></mfe-${PROJECT}>`,
    );
  writeFileSync(indexPath, indexHtml);
  created.push(indexPath);
}

// ---------------------------------------------------------------------------
// 9.2 Smoke test — bootstrap scaffold replaces app.ts, so overwrite app.spec.ts
// ---------------------------------------------------------------------------

created.push(
  writeFile(
    'src/app/app.spec.ts',
    `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
    fixture = TestBed.createComponent(App);
  });

  it('should create the app', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
`,
  ),
);

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------

console.log(
  `Scaffolded federation files for '${PROJECT}' (workspace='${WORKSPACE}', port=${PORT}):`,
);
for (const path of created) {
  console.log(`  - ${path}`);
}
