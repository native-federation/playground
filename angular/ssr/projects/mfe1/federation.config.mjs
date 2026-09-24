import {withNativeFederation, shareAll} from '@angular-architects/native-federation/config';

export default withNativeFederation({

  name: 'mfe1',



  exposes: {
    // The host mounts these under its own `/todos` route shape via
    // `loadComponent` (see projects/host/src/app/app.routes.ts). mfe1 owns the
    // components; the host owns the route paths so SSR deep-links land in the
    // route manifest. See the README, "Federated routes under SSR".
    './List': './projects/mfe1/src/app/todos/todo-list.ts',
    './Detail': './projects/mfe1/src/app/todos/todo-detail.ts',
  },

  shared: {
    ...shareAll(
      { singleton: true, strictVersion: true, requiredVersion: 'auto', build: 'package' },
      {
        overrides: {
          '@angular/core': {
            singleton: true,
            strictVersion: true,
            requiredVersion: 'auto',
            build: 'package',
            includeSecondaries: { keepAll: true },
          },
        },
      },
    ),
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
  ],

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0

  features: {
    ignoreUnusedDeps: true,
    denseExternals: true
  }
});
