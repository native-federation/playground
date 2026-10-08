import {withNativeFederation, fromPackageJson} from '@angular-architects/native-federation/config';

export default withNativeFederation({

  name: '@tractor-store/decide',
  exposes: {
    'mfe-product': './projects/decide/src/features/product/bootstrap.ts',
    'nav-contribution': './projects/decide/src/core/nav-contribution.ts',
  },
  shared: fromPackageJson({ singleton: true, strictVersion: true, requiredVersion: 'auto', build: 'package' })
    .patch(['@angular/core'], {includeSecondaries: {keepAll: true}})
    .get(),
  sharedMappings: ["@tractor-store/shared"],
  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
  ],

  features: {
    denseChunking: true,
    denseExternals: true,
    integrityHashes: true
  }
});
