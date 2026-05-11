# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A data browser UI for [Solid servers](https://solidproject.org/) — a React Native + Expo app that lets users browse, edit, and manage resources on Linked Data platforms. It ships as both a standalone app and a reusable npm library (`@o.team/linked-data-browser`).

## Commands

```bash
# Development
npm run dev:web              # Solid test server + Expo web
npm run dev:ios              # iOS simulator
npm run dev:android          # Android emulator
npm run solid-server         # community-solid-server with test data only

# Build
npm run build:ldo            # Regenerate TypeScript types from ShEx schemas (.shapes/ → .ldo/)
npm run build:standalone     # Web export → dist-standalone/
npm run build:server         # Server-hosted web export → dist-server/
npm run build:lib            # Library bundle (CJS+ESM+types) → dist-lib/
npm run build                # All three builds

# Code quality
npx eslint .
npx prettier --check .
```

There is no test suite.

## Architecture

### Component Tree

```
App.js
└─ DataBrowser (components/DataBrowser.tsx)
   ├─ ThemeProvider
   ├─ BrowserSolidLdoProvider  (@ldo/solid-react — Solid auth + LDO data graph)
   └─ DataBrowserConfigContext (runtime config: mode, views, creators)
      └─ TargetResourceProvider (current URI + resource + navigation)
         └─ Layout (nav/Layout.tsx)
            ├─ Header (auth, theme toggle, address bar, view switcher)
            └─ RenderView → active ResourceView plugin
```

### Plugin System

Two extension points, both registered via `DataBrowserConfig`:

- **ResourceViewConfig** — renders a resource (e.g. container, profile, image, raw RDF). Each view declares a `canViewResource(resource)` predicate; the first match wins.
- **ResourceCreatorConfig** — action for creating/uploading new resources inside a container.

Built-in views live in `resourceViews/`, built-in creators in `resourceCreators/`.

### Linked Data Layer (LDO)

All RDF data goes through the `@ldo/` suite:
- ShEx schemas in `.shapes/` define types → `npm run build:ldo` generates TypeScript types and LDO contexts into `.ldo/` (auto-generated, don't edit)
- `useResource()` / `useSolidAuth()` hooks from `@ldo/solid-react` handle auth and data access
- Solid OIDC auth via `@inrupt/solid-client-authn-browser`

### Components/UI

Components/ui is a list of reusable component used, not only for this project, but can be included in other parent projects that use the linked data browser as a dependency so that the parent application has access to the same building blocks and can maintain the same general style.

### Two Deployment Modes

Controlled by `EXPO_PUBLIC_IS_SERVER_HOSTED`:
- **standalone** — client-only SPA; target URI passed via `?uri=` query param
- **server-hosted** — URI in pathname/origin; server serves the app at resource URLs

### Key Contexts

| Context | File | Purpose |
|---|---|---|
| `DataBrowserConfigContext` | `components/DataBrowser.tsx` | Runtime config, registered views/creators |
| `TargetResourceContext` | `components/TargetResourceProvider.tsx` | Current URI, resource, `navigateTo()` |
| `ViewContext` | `components/ViewContextProvider.tsx` | Active view + available views |
| `ThemeContext` | `components/ThemeContext.tsx` | Light/dark mode |
| `DialogContext` | `components/DialogProvider.tsx` | Prompt/confirm dialogs |
| `SharingModalContext` | `components/sharing/` | WAC permission UI |

## Cross-Platform UI

Same React component tree targets web, iOS, and Android:
- **Web**: Radix UI primitives (`components/ui/`)
- **Mobile**: rn-primitives equivalents (same API, React Native backed)
- Theme colors defined in `lib/constants.ts` (`NAV_THEME` with `light`/`dark` variants)
- No Tailwind; styling via React Native `StyleSheet` + CVA for theme variants

## Import Rules

ESLint enforces **relative imports only** — no path aliases. Always use `./components/...`, `./lib/...`, `./resourceViews/...`, `./.ldo/...` etc. from the file's location.

## Environment Variables

```
EXPO_PUBLIC_IS_SERVER_HOSTED   # "true" for server-hosted mode
EXPO_PUBLIC_DEFAULT_ISSUER     # Default Solid OIDC issuer URL
```

## Library Publishing

Published to npm as an alpha: `npm publish --tag alpha`. The library entry point is `lib/index.js`. Component documentation is in `docs/components.md`.
