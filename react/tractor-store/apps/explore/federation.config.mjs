import { withNativeFederation, fromPackageJson } from '@softarc/native-federation/config';

export default withNativeFederation({
  name: '@tractor-store/explore',

  exposes: {
    'mfe-home': './src/features/home/bootstrap.tsx',
    'mfe-category': './src/features/category/bootstrap.tsx',
    'mfe-stores': './src/features/stores/bootstrap.tsx',
    'mfe-header': './src/features/header/bootstrap.tsx',
    'mfe-footer': './src/features/footer/bootstrap.tsx',
    'mfe-recommendations': './src/features/recommendations/bootstrap.tsx',
    'mfe-store-picker': './src/features/store-picker/bootstrap.tsx',
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
