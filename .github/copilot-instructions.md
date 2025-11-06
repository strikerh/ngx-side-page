## Purpose

Short, focused instructions to help AI coding agents be immediately productive in this repository (an Angular library + demo). Reference files and idiomatic patterns below.

## Big picture

- This repo contains an Angular workspace with two main projects:
  - `projects/ngx-side-page` — the library (library entry in `angular.json`). Key source: `projects/ngx-side-page/src/lib/`.
  - `projects/ngx-side-page-demo` — a demo application used for manual testing and development.
- The library implements a service-driven slide-out panel system. The central service is `SidePageService` (`projects/ngx-side-page/src/lib/side-page.service.ts`). It maintains an in-memory stack (`sidePages`) and exposes a BehaviorSubject that the UI component consumes.
- UI bootstrap: `SidePageService.addComponentToBody()` creates a singleton `SidePageComponent` via `createComponent(..)` and appends it to `document.body`. Expect imperative DOM/attachView patterns and change-detection coupling.

## Key files to reference

- API & exports: `projects/ngx-side-page/src/public-api.ts`
- Service & ref API: `projects/ngx-side-page/src/lib/side-page.service.ts` (openSidePage, SidePageRef, events like afterClosed())
- Token & providers: `SIDE_PAGE_DATA`, `SIDE_PAGE_REF`, `SIDE_PAGE_CONFIG` in `src/lib/*` (`side-page-data.token.ts`, `side-page-config.token.ts`, `side-page.providers.ts`)
- Visual: `projects/ngx-side-page/src/lib/side-page.component.ts` and `side-page.component.html` + `animation.ts` for RTL-aware slide animations
- Page wrapper: `projects/ngx-side-page/src/lib/page/page.component.ts` - handles dynamic component creation with dependency injection
- Demo + examples: `projects/ngx-side-page-demo/src/app` and README in `projects/ngx-side-page/README.md` for usage examples

## Patterns and conventions (concrete)

- Singleton visual host: the service creates and appends a single `SidePageComponent` to body on first open. Do not attempt to bootstrap multiple host components; use the existing service flow.
- Dynamic component creation: `PageComponent` uses `ViewContainerRef.createComponent()` with custom injector to provide `SIDE_PAGE_DATA` and `SIDE_PAGE_REF` tokens.
- Data passing: components opened via `openSidePage(key, Component, {data})` expect to inject `SIDE_PAGE_DATA` and `SIDE_PAGE_REF` (see demo examples in `projects/ngx-side-page/README.md`). Keep API changes backwards-compatible.
- Animation/timing: open/close events use setTimeout with 300ms (see `SidePageService.closeLastSidePage()` / `openSidePage()`); coordinate unit tests and DOM timeouts with this value. Animations use 150ms for enter/leave transitions.
- RTL support: `animation.ts` detects RTL via `getComputedStyle(document.documentElement).direction` and reverses slide directions automatically.
- Standalone components: examples and library use Angular standalone components. Prefer providing standalone components or adapting wrappers when adding examples.
- Public API surface: exports are controlled by `public-api.ts`. When adding a new token/service/component to the public API, add an export here and ensure `ng-packagr` packaging picks it up. Note: `side-page.providers.ts` is NOT currently exported.

## Build / run / test workflows (explicit)

- Development demo server (run from repo root):

```pwsh
npm start
# or
# ng serve
```

- Build the library for publishing (pack and publish):

```pwsh
# build library
ng build ngx-side-page

# publish from dist
cd dist/ngx-side-page
npm publish
```

- Useful npm scripts in `package.json`: `start`, `build`, `watch`, `test`, `publish-lib`, `watch-lib`, `create-link`, `install-link`.
- Unit tests: `ng test` (Karma) — library and demo have their own tsconfig/test configs in `projects/*/tsconfig.spec.json`.

## Testing notes

- Tests and manual verifications that exercise animations or DOM append/remove should account for the 300ms timing used by the service.
- When running tests that rely on the created host component, ensure `document.body` is cleaned up between tests to avoid cross-test leakage.
- Animation timing: enter/leave animations use 150ms, but service events use 300ms timeouts.
- The library creates global DOM elements (`document.body.appendChild`) and modifies `document.body.style.overflow` - mock or reset these in tests.

## How to change public behavior safely

- If you change SidePageService internals (stack semantics, emitted events), update:
  1) `projects/ngx-side-page/src/lib/side-page.service.ts`
  2) consumer examples in `projects/ngx-side-page/README.md`
  3) unit tests in `projects/ngx-side-page/src/lib/*.spec.ts`
- If adding exports, update `projects/ngx-side-page/src/public-api.ts` and confirm `ng build ngx-side-page` succeeds.

## Quick examples (copyable references)

- Open a side page (see README example):

```ts
const ref = sidePageService.openSidePage('key', MyComponent, { width: '400px', data: {foo:1} });
ref.afterClosed().subscribe(result => { /* handle */ });
```

## When you're unsure

- Prefer reading `projects/ngx-side-page/src/lib/*` and the library README first; the repo uses a simple service + host-component architecture and many patterns are implemented there.
- If a change affects packaging, run `ng build ngx-side-page` locally and check `dist/ngx-side-page` contents.

---
If anything is unclear or you want more examples (tests to add, CI steps, or release workflow automation), say which area to expand and I will iterate.
