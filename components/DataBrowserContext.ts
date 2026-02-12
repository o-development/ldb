import { createContext, ReactNode, useContext } from 'react';
import { ResourceViewConfig } from './ResourceView';
import { ResourceCreatorConfig } from './ResourceCreator';

export interface DataBrowserConfigProps {
  views: ResourceViewConfig[];
  resourceCreators?: ResourceCreatorConfig[];
  mode: 'standalone-app' | 'server-ui';
  defaultIssuer?: string;
  origin?: string;
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
