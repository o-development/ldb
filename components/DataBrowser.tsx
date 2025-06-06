import { createContext, ReactNode, useContext } from 'react';
import { BrowserSolidLdoProvider } from '@ldo/solid-react';
import React, { FunctionComponent } from 'react';
import { Layout } from './nav/Layout';
import { PortalHost } from '@rn-primitives/portal';
import { TargetResourceProvider } from './TargetResourceProvider';
import { ResourceViewConfig } from './ResourceView';
import { NotifierWrapper } from 'react-native-notifier';

export interface DataBrowserConfig {
  views: ResourceViewConfig[];
  mode: 'standalone-app' | 'server-ui';
  defaultIssuer: string;
  host: string;
  renderHomepage?: () => ReactNode;
  renderLogo?: () => ReactNode;
}

// @ts-ignore This will be filled in once the component mounts
export const DataBrowserConfigContext = createContext<DataBrowserConfig>({});

export function useDataBrowserConfig() {
  return useContext(DataBrowserConfigContext);
}

export const DataBrowser: FunctionComponent<DataBrowserConfig> = (props) => {
  return (
    <BrowserSolidLdoProvider>
      <NotifierWrapper>
        <DataBrowserConfigContext.Provider value={props}>
          <TargetResourceProvider>
            <Layout />
            <PortalHost />
          </TargetResourceProvider>
        </DataBrowserConfigContext.Provider>
      </NotifierWrapper>
    </BrowserSolidLdoProvider>
  );
};
