import {withNativeFederation, fromPackageJson} from '@angular-architects/native-federation/config';

export default withNativeFederation({

  name: 'mfe2',

  exposes: {
    './Component': './projects/mfe2/src/app/insights/insights.ts',
  },

  shared: fromPackageJson({ singleton: true, strictVersion: true, requiredVersion: 'auto', build: 'package' })
    .patch(['@angular/*'], { includeSecondaries: { keepAll: true } })
    .get(),

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
  ],

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0

  features: {
    ignoreUnusedDeps: true,
    denseExternals: true
  }
});
