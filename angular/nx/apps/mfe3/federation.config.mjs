import {withNativeFederation, fromPackageJson} from '@angular-architects/native-federation/config';

export default withNativeFederation({

  name: 'mfe3',

  exposes: {
    './Component': './apps/mfe3/src/app/app.component.ts',
    './Bootstrap': './apps/mfe3/src/bootstrap.ts',
  },

  shared: fromPackageJson({ singleton: true, strictVersion: true, requiredVersion: 'auto', build: 'package' })
    .patch(['@angular/*'], {includeSecondaries: {keepAll: true}, pool: "ng-core"})
    .get(),

  skip: [
    'rxjs/ajax', 
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // Add further packages you don't need at runtime
  ],
  sharedMappings: [],
  features: { 
    denseChunking: true,
    integrityHashes: true,
    denseExternals: true
  }
});
