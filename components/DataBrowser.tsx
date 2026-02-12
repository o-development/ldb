import './solidFetchConfig';
import { useMemo } from 'react';
import { BrowserSolidLdoProvider } from '@ldo/solid-react';
import React, { FunctionComponent } from 'react';
import { Layout } from './nav/Layout';
import { PortalHost } from '@rn-primitives/portal';
import { TargetResourceProvider } from './TargetResourceProvider';
import { NotifierWrapper } from 'react-native-notifier';
import { Platform } from 'react-native';
import { ThemeProvider } from './ThemeProvider';
import {
  DataBrowserConfig,
  DataBrowserConfigContext,
  DataBrowserConfigProps,
} from './DataBrowserContext';

export const DataBrowser: FunctionComponent<DataBrowserConfigProps> = (
  props,
) => {
  const providerProps = useMemo<DataBrowserConfig>(() => {
    return {
      origin:
        Platform.OS === 'web' && !props.origin
          ? window.location.origin
          : undefined,
      defaultIssuer:
        props.mode === 'server-ui'
          ? window.location.origin
          : 'https://solidcommunity.net',
      ...props,
    };
  }, [props]);

  return (
    <ThemeProvider>
      <BrowserSolidLdoProvider>
        <NotifierWrapper>
          <DataBrowserConfigContext.Provider value={providerProps}>
            <TargetResourceProvider>
              <Layout />
              <PortalHost />
            </TargetResourceProvider>
          </DataBrowserConfigContext.Provider>
        </NotifierWrapper>
      </BrowserSolidLdoProvider>
    </ThemeProvider>
  );
};
