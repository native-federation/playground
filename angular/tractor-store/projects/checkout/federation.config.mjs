import {withNativeFederation, shareAll} from '@angular-architects/native-federation-v4/config';

export default withNativeFederation({

  name: '@tractor-store/checkout',
  exposes: {
    'mfe-cart': './projects/checkout/src/features/cart/bootstrap.ts',
    'mfe-checkout': './projects/checkout/src/features/checkout/bootstrap.ts',
    'mfe-thanks': './projects/checkout/src/features/thanks/bootstrap.ts',
    'mfe-mini-cart': './projects/checkout/src/features/mini-cart/bootstrap.ts',
    'mfe-add-to-cart': './projects/checkout/src/features/add-to-cart/bootstrap.ts',
    'nav-contribution': './projects/checkout/src/core/nav-contribution.ts',
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
  sharedMappings: ["@internal/event-bus", "@internal/navigation", "@internal/url", "@internal/ui"],
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
