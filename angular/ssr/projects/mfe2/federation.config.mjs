import {withNativeFederation, shareAll} from '@angular-architects/native-federation/config';

export default withNativeFederation({

  name: 'mfe2',

  exposes: {
    './Component': './projects/mfe2/src/app/insights/insights.ts',
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
