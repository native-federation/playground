import { withNativeFederation, fromPackageJson } from '@softarc/native-federation/config';

export default withNativeFederation({
  name: '@tractor-store/checkout',

  exposes: {
    'mfe-cart': './src/features/cart/bootstrap.tsx',
    'mfe-checkout': './src/features/checkout/bootstrap.tsx',
    'mfe-thanks': './src/features/thanks/bootstrap.tsx',
    'mfe-mini-cart': './src/features/mini-cart/bootstrap.tsx',
    'mfe-add-to-cart': './src/features/add-to-cart/bootstrap.tsx',
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
