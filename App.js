import React from 'react';
import { Screen } from './app/index';

// Expo's getBundleUrl() returns null on web, making import.meta.url null after babel transforms it
// to globalThis.__ExpoImportMetaRegistry.url. Use location.origin so that packages like
// @uvdsl/solid-oidc-client-browser resolve RefreshWorker.js relative to the server root,
// not the current page path (which varies per-resource in server-hosted mode).
if (typeof location !== 'undefined') {
  globalThis.__ExpoImportMetaRegistry = { url: location.origin + '/' };
}

// https://docs.expo.dev/router/reference/troubleshooting/#expo_router_app_root-not-defined

// Must be exported or Fast Refresh won't update the context
export default function App() {
  return <Screen />;
}
