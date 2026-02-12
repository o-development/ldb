import React from 'react';
import { DataBrowser } from '../components/DataBrowser';
import { Text } from '../components/ui/text';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import {
  ContainerResourceCreator,
  FileUploadResourceCreator,
  RdfResourceCreator,
} from '../resourceCreators';
import {
  ProfileResourceView,
  ContainerResourceView,
  RawCodeResourceView,
} from '../resourceViews';

export function Screen() {
  const mode = process.env.EXPO_PUBLIC_IS_SERVER_HOSTED
    ? 'server-ui'
    : 'standalone-app';

  const defaultIssuer = process.env.EXPO_PUBLIC_DEFAULT_ISSUER;

  return (
    <SafeAreaProvider>
      <StatusBar />
      <DataBrowser
        resourceViews={[
          ProfileResourceView,
          ContainerResourceView,
          RawCodeResourceView,
        ]}
        resourceCreators={[
          ContainerResourceCreator,
          RdfResourceCreator,
          FileUploadResourceCreator,
        ]}
        mode={mode}
        renderLogo={() => (
          <Text bold size="lg">
            LDB
          </Text>
        )}
        defaultIssuer={defaultIssuer}
      />
    </SafeAreaProvider>
  );
}
