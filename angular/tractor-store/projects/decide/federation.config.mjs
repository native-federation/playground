import {withNativeFederation, shareAll} from '@angular-architects/native-federation-v4/config';

export default withNativeFederation({

  name: '@tractor-store/decide',
  exposes: {
    'mfe-product': './projects/decide/src/features/product/bootstrap.ts',
    'nav-contribution': './projects/decide/src/core/nav-contribution.ts',
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
  sharedMappings: ["@internal/event-bus", "@internal/navigation", "@internal/url"],
  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
  ],

  features: {
    denseChunking: true,
    integrityHashes: true
  }
});
