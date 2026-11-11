import { withNativeFederation, fromPackageJson } from '@angular-architects/native-federation-v4/config';

export default withNativeFederation({
  name: '@cinema/film',
  exposes: {
    'mfe-film-detail': './src/bootstrap.ts',
    'nav-contribution': './src/nav-contribution.ts',
  },
  // Angular 21 is shared only with other ng21 remotes, never with the shell's Angular 22.
  shareScope: 'ng21',
  shared: fromPackageJson({ singleton: true, strictVersion: true, requiredVersion: 'auto', build: 'package' })
    .patch(['@angular/*'], { includeSecondaries: { keepAll: true } })
    .get(),
  sharedMappings: [],
  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // node-only entry points that keepAll would otherwise bundle for the browser
    '@angular/cdk/schematics',
    '@angular/cdk/testing/selenium-webdriver',
  ],
  features: {
    denseExternals: true,
  },
});
