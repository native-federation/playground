import {withNativeFederation, fromPackageJson} from '@angular-architects/native-federation/config';

export default withNativeFederation({

  name: 'mfe3',

  exposes: {
    './Component': './projects/mfe3/src/app/app.component.ts',
    './Bootstrap': './projects/mfe3/src/bootstrap.ts',
  },

  shared: fromPackageJson({ singleton: true, strictVersion: true, requiredVersion: 'auto', build: 'package' })
    .patch(['@angular/*'], {includeSecondaries: {keepAll: true}, pool: "ng-core"})
    .get(),

  skip: [
    // @angular/animations is not installed; see native-federation/native-federation-core#195
    '@angular/platform-browser/animations',
    '@angular/platform-browser/animations/async',
    'rxjs/ajax', 
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // Add further packages you don't need at runtime
  ],
  features: { 
    denseChunking: true,
    integrityHashes: true,
    denseExternals: true
  }
});
