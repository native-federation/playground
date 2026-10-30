import { withNativeFederation, fromPackageJson } from "@softarc/native-federation/config";

export default withNativeFederation({
  name: "@team/mfe1",

  exposes: {
    "./Bootstrap": "./src/bootstrap.tsx"
  },

  shared: fromPackageJson({ singleton: true, strictVersion: true, requiredVersion: "auto", build: "package" })
    .patch(["react", "react-dom"], { includeSecondaries: { keepAll: true } })
    .get(),

  features: {
    ignoreUnusedDeps: true,
    denseChunking: true,
    denseExternals: true,
    integrityHashes: true
  },
  skip: [
    'react-dom/server',
    'react-dom/server.node',
    'react-dom/server.browser',
    'react-dom/test-utils'
  ]
});
