import { createContext, ReactNode, useContext, useMemo } from 'react';
import { BrowserSolidLdoProvider } from '@ldo/solid-react';
import React, { FunctionComponent } from 'react';
import { Layout } from './nav/Layout';
import { PortalHost } from '@rn-primitives/portal';
import { TargetResourceProvider } from './TargetResourceProvider';
import { ResourceViewConfig } from './ResourceView';
import { NotifierWrapper } from 'react-native-notifier';
import { Platform } from 'react-native';
import { ThemeProvider } from '~/components/ThemeProvider';

export interface DataBrowserConfig {
  views: ResourceViewConfig[];
  mode: 'standalone-app' | 'server-ui';
  defaultIssuer?: string;
  origin?: string;
  renderHomepage?: () => ReactNode;
  renderLogo?: () => ReactNode;
}

// @ts-ignore This will be filled in once the component mounts
export const DataBrowserConfigContext = createContext<DataBrowserConfig>({});

export function useDataBrowserConfig() {
  return useContext(DataBrowserConfigContext);
}

export const DataBrowser: FunctionComponent<DataBrowserConfig> = (props) => {
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
