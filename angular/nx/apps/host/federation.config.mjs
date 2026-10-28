import {withNativeFederation, fromPackageJson} from '@angular-architects/native-federation/config';

export default withNativeFederation({
  name: "host",
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
    ignoreUnusedDeps: true, // by default now
    mappingVersion: true,  // by default now
    denseChunking: true,
    denseExternals: true,
    integrityHashes: true
  }
});
