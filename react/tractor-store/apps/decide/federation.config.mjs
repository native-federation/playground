import { withNativeFederation, fromPackageJson } from '@softarc/native-federation/config';

export default withNativeFederation({
  name: '@tractor-store/decide',

  exposes: {
    'mfe-product': './src/features/product/bootstrap.tsx',
    'nav-contribution': './src/nav-contribution.ts',
  },

  shared: fromPackageJson({ singleton: true, strictVersion: true, requiredVersion: 'auto', build: 'package' })
    .patch(['react', 'react-dom'], { includeSecondaries: { keepAll: true } })
    .get(),
  sharedMappings: [],
  skip: [
    'react-dom/server',
    'react-dom/server.node',
    'react-dom/server.browser',
    'react-dom/test-utils',
  ],

  features: {
    ignoreUnusedDeps: true,
    denseChunking: true,
    denseExternals: true,
    integrityHashes: true,
  },
});
