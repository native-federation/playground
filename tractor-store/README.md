# Native Federation v4 Demo

> [!WARNING]
> This is a demo for native-federation v4 which is currently in beta. For upgrading from v3 to v4, please refer to our [Migration Guide](https://github.com/native-federation/angular-adapter/blob/main/MIGRATION_GUIDE.md).

## What is Native Federation?

Native Federation is a framework-agnostic implementation of the Module Federation concept, allowing you to build micro-frontends that can be loaded dynamically at runtime. Version 4 brings improved performance and better developer experience.

## Project Structure

This workspace contains multiple micro-frontends:

- **host** - Host applications that load remote micro-frontends
- **mfe1**, **mfe2**, **mfe3** - Remote micro-frontend applications
- **ng20/** - A separate Angular 20 workspace with `mfe4` to demonstrate cross-version compatibility

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Start the development servers

```bash
pnpm start
```

For cross-Angular version testing (loading mfe4 from Angular 20):

```bash
cd ng20
pnpm install
pnpm start
```

Open your browser at `http://localhost:4200/`.

## Key Configuration

Each micro-frontend has a `federation.config.js` that defines:

- **name** - Unique identifier for the remote
- **exposes** - Modules/components available for other apps to consume
- **shared** - Dependencies shared between host and remotes

Example from a remote (`mfe1`):

```javascript
export default withNativeFederation({
  name: "team/mfe1",
  exposes: {
    "./Bootstrap": "./projects/mfe1/src/bootstrap.ts",
    "./Component": "./projects/mfe1/src/app/app.component.ts",
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: "auto" }),
  },
});
```

## Learn More

- [Native Federation Documentation](https://www.npmjs.com/package/@softarc/native-federation)
- [@angular-architects/native-federation](https://www.npmjs.com/package/@angular-architects/native-federation)
