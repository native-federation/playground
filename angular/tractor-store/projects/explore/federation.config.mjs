import {withNativeFederation, fromPackageJson} from '@angular-architects/native-federation/config';

export default withNativeFederation({

  name: '@tractor-store/explore',
  exposes: {
    'mfe-home': './projects/explore/src/features/home/bootstrap.ts',
    'mfe-category': './projects/explore/src/features/category/bootstrap.ts',
    'mfe-stores': './projects/explore/src/features/stores/bootstrap.ts',
    'mfe-header': './projects/explore/src/features/header/bootstrap.ts',
    'mfe-footer': './projects/explore/src/features/footer/bootstrap.ts',
    'mfe-recommendations': './projects/explore/src/features/recommendations/bootstrap.ts',
    'mfe-store-picker': './projects/explore/src/features/store-picker/bootstrap.ts',
    'nav-contribution':  './projects/explore/src/core/nav-contribution.ts',
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
