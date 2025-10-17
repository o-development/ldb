import React from 'react';
import { Screen } from './app/index';

// https://docs.expo.dev/router/reference/troubleshooting/#expo_router_app_root-not-defined

// Must be exported or Fast Refresh won't update the context
export default function App() {
  return <Screen />;
}
