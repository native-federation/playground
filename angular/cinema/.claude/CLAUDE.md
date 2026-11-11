You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- Make sure that the components have the correct ARIA tags.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components (only when component html is less then 10 lines).
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.
- Do not write arrow functions in templates (they are not supported).

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

## Testing

- Write tests for the components, services and other classes that you create. Make sure the code is written in a way that it's unit testable.
- Use **Vitest** for all unit tests and component tests — do NOT use Jasmine, Jest, or Karma
- After every new class, pipe, service and/or component, write unit tests and component tests.
- Test files use the `*.spec.ts` naming convention
- Tests are located alongside source files in `projects/`
- Use `jsdom` as the test environment (configured in `vitest.config.js`)
- Run tests with `ng test <project> --watch false` from the workspace root

## Tool & Skill Usage Requirements

### Angular CLI MCP

- Before generating or modifying Angular code, call `mcp__angular-cli__get_best_practices` to get version-specific standards.
- Use `mcp__angular-cli__list_projects` to discover workspace structure before making changes.
- Use `mcp__angular-cli__search_documentation` for Angular concept questions.

### Requirements

- The bootstrap module registers the app as a custom element (`mfe-<project>`) via `@angular/elements`.
