import React from 'react';
import { DataBrowser } from '../components/DataBrowser';
import { Text } from '../components/ui/text';
import { RawCodeConfig } from '../resourceViews/RawCode/RawCodeConfig';
import { ContainerConfig } from '../resourceViews/Container/ContainerConfig';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { ProfileConfig } from '../resourceViews/Profile/ProfileConfig';
import { registerRootComponent } from 'expo';

export function Screen() {
  const mode = process.env.EXPO_PUBLIC_IS_SERVER_HOSTED
    ? 'server-ui'
    : 'standalone-app';

  const defaultIssuer = process.env.EXPO_PUBLIC_DEFAULT_ISSUER;

  return (
    <SafeAreaProvider>
      <StatusBar />
      <DataBrowser
        views={[ProfileConfig, ContainerConfig, RawCodeConfig]}
        mode={mode}
        renderHomepage={() => <Text>Hopepage</Text>}
        renderLogo={() => <Text>Logo</Text>}
        defaultIssuer={defaultIssuer}
      />
    </SafeAreaProvider>
  );
}

// https://docs.expo.dev/router/reference/troubleshooting/#expo_router_app_root-not-defined

// Must be exported or Fast Refresh won't update the context
export function App() {
  return <Screen />;
}

registerRootComponent(App);
