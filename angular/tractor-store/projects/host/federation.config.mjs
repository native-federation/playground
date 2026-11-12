import {withNativeFederation, fromPackageJson} from '@angular-architects/native-federation/config';

export default withNativeFederation({

  name: 'host',
  shared: fromPackageJson({ singleton: true, strictVersion: true, requiredVersion: 'auto', build: 'package' })
    .patch(['@angular/*'], {includeSecondaries: {keepAll: true}})
    .get(),
  sharedMappings: [],
  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // Bundled into every app instead of shared: each copy finds the page's one bus on globalThis.__NF_BUS__.
    '@softarc/native-federation-communication',
  ],

  features: {
    denseChunking: true,
    denseExternals: true,
    integrityHashes: true
  }
});
