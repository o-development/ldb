import React from 'react';
import { DataBrowser } from '../components/DataBrowser';
import { Text } from '../components/ui/text';
import { RawCodeConfig } from '../resourceViews/RawCode/RawCodeConfig';
import { ContainerConfig } from '../resourceViews/Container/ContainerConfig';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { ProfileConfig } from '../resourceViews/Profile/ProfileConfig';
import {
  createContainerResourceCreator,
  createRdfResourceCreator,
  uploadFileResourceCreator,
} from '../resourceCreators';

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
        resourceCreators={[
          createContainerResourceCreator,
          createRdfResourceCreator,
          uploadFileResourceCreator,
        ]}
        mode={mode}
        renderLogo={() => <Text>LDB</Text>}
        defaultIssuer={defaultIssuer}
      />
    </SafeAreaProvider>
  );
}
