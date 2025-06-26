import React from 'react';
import { Text } from 'react-native';
import {
  DataBrowser,
  RawCodeConfig,
  ContainerConfig,
} from '@linked-data-browser/component';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

export function Screen() {
  const mode = process.env.EXPO_PUBLIC_IS_SERVER_HOSTED
    ? 'server-ui'
    : 'standalone-app';

  return (
    <SafeAreaProvider>
      <StatusBar />
      <DataBrowser
        views={[ContainerConfig, RawCodeConfig]}
        mode={mode}
        renderHomepage={() => <Text>Hopepage</Text>}
        renderLogo={() => <Text>Logo</Text>}
      />
    </SafeAreaProvider>
  );
}
