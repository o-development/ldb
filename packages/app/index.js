import React from 'react';
import { registerRootComponent } from 'expo';
import { Screen } from './app/index';

// https://docs.expo.dev/router/reference/troubleshooting/#expo_router_app_root-not-defined

// Must be exported or Fast Refresh won't update the context
export function App() {
  return <Screen />;
}

registerRootComponent(App);
