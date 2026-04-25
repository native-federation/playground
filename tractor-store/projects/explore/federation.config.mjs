import {withNativeFederation, shareAll} from '@angular-architects/native-federation-v4/config';

export default withNativeFederation({

  name: '@tractor-store/explore',
  exposes: {
    './Component': './projects/explore/src/app/bootstrap.ts',
    './Header': './projects/explore/src/app/components/header/bootstrap.ts',
    './Footer': './projects/explore/src/app/components/footer/bootstrap.ts',
    './Recommendations': './projects/explore/src/app/components/recommendations/bootstrap.ts',
    './StorePicker': './projects/explore/src/app/components/store-picker/bootstrap.ts',
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
  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
  ],

  features: {
    mappingVersion: true,
    denseChunking: true
  }
});
