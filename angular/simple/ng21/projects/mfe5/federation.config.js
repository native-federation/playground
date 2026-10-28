import {withNativeFederation, fromPackageJson} from '@angular-architects/native-federation-v4/config';

export default withNativeFederation({

  name: 'mfe5',

  exposes: {
    './Component': './projects/mfe5/src/app/app.component.ts',
    './Bootstrap': './projects/mfe5/src/bootstrap.ts',
  },

  // Ensures scoping of all dependencies on different "ng21" scope. 
  shareScope: "ng21",
  shared: fromPackageJson({ singleton: true, strictVersion: true, requiredVersion: 'auto', build: 'package' })
    .patch(['@angular/*'], {includeSecondaries: {keepAll: true}})
    .get(),
  skip: [
    'rxjs/ajax', 
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // Add further packages you don't need at runtime
  ],

  features: { 
    ignoreUnusedDeps: true, // by default now
    denseChunking: true,
    denseExternals: true,
    integrityHashes: true
  }
});
