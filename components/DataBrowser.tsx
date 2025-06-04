import { createContext, ReactNode, useContext } from 'react';
import { BrowserSolidLdoProvider } from '@ldo/solid-react';
import React, { FunctionComponent } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { Header } from './nav/Header';
import { RenderView } from './RenderView';
import { PortalHost } from '@rn-primitives/portal';

export interface DataBrowserConfig {
  views: string[];
  mode: 'standalone-app' | 'server-ui';
  defaultIssuer: string;
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
      <ThemeProvider>
        <DataBrowserConfigContext.Provider value={props}>
          <Header />
          <RenderView />
          <PortalHost />
        </DataBrowserConfigContext.Provider>
      </ThemeProvider>
    </BrowserSolidLdoProvider>
  );
};
