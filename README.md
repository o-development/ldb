# Linked Data Browser (LDB)

This codebase is for a data browser UI for Solid servers.

## Using as a library

Install the package:

```
npm install @o.team/linked-data-browser
```

### Expo / Metro setup (required)

Three steps are required for Expo/Metro. Vite and webpack 5 handle `import.meta.url`-based worker URLs automatically and need none of this.

#### 1. Serve `RefreshWorker.js`

`@ldo/solid-react` uses a `SharedWorker` for background token refresh (via `@uvdsl/solid-oidc-client-browser`). Metro cannot serve worker scripts automatically, so copy `RefreshWorker.js` into your project's `public/` folder:

```json
"postinstall": "mkdir -p public && cp node_modules/@uvdsl/solid-oidc-client-browser/dist/esm/web/RefreshWorker.js public/RefreshWorker.js"
```

Add `public/RefreshWorker.js` to your `.gitignore` — it's generated, not hand-authored.

#### 2. Enable `import.meta` transform in `babel.config.js`

`@uvdsl/solid-oidc-client-browser` uses `import.meta.url` to locate the worker script. Without this option, Metro bundles the syntax verbatim and the browser throws `SyntaxError: import.meta may only appear in a module`.

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { unstable_transformImportMeta: true }],
    ],
  };
};
```

#### 3. Polyfill `__ExpoImportMetaRegistry` in your app entry point

After the babel transform, `import.meta.url` becomes `globalThis.__ExpoImportMetaRegistry.url`. Expo's runtime sets this registry, but `getBundleUrl()` returns `null` on web. Add this polyfill at the top of your root `App.js` / `App.tsx` so the worker URL always resolves to `<server-root>/RefreshWorker.js`:

```js
if (typeof location !== 'undefined') {
  globalThis.__ExpoImportMetaRegistry = { url: location.origin + '/' };
}
```

This must run before any `@ldo` imports.

## Publishing

```
npm publish --tag alpha
```
