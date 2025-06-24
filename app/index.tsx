import React from 'react';
import { DataBrowser } from '~/components/DataBrowser';
import { Text } from '~/components/ui/text';
import { RawCodeConfig } from '~/resourceViews/RawCode/RawCodeConfig';
import { ContainerConfig } from '~/resourceViews/Container/ContainerConfig';
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
