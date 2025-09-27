import { createContext, ReactNode, useContext } from 'react';
import { ResourceViewConfig } from './ResourceView';

export interface DataBrowserConfigProps {
  views: ResourceViewConfig[];
  mode: 'standalone-app' | 'server-ui';
  defaultIssuer?: string;
  origin?: string;
  renderHomepage?: () => ReactNode;
  renderLogo?: () => ReactNode;
}

export interface DataBrowserConfig extends DataBrowserConfigProps {
  defaultIssuer: string;
}

export const DataBrowserConfigContext = createContext<DataBrowserConfig>(
  // @ts-ignore This will be filled in once the component mounts
  {},
);

export function useDataBrowserConfig() {
  return useContext(DataBrowserConfigContext);
}
