import { withNativeFederation, fromPackageJson } from '@softarc/native-federation/config';

export default withNativeFederation({
  name: 'host',

  shared: fromPackageJson({ singleton: true, strictVersion: true, requiredVersion: 'auto', build: 'package' })
    .patch(['react', 'react-dom'], { includeSecondaries: { keepAll: true } })
    .get(),
  sharedMappings: [],
  skip: [
    'react-dom/server',
    'react-dom/server.node',
    'react-dom/server.browser',
    'react-dom/test-utils',
    // Bundled into every app instead of shared: each copy finds the page's one bus on globalThis.__NF_BUS__.
    // A regex, because a string skips only the root entry and would leave /install shared.
    /^@softarc\/native-federation-communication(\/|$)/,
  ],

  features: {
    denseChunking: true,
    denseExternals: true,
    integrityHashes: true,
  },
});
