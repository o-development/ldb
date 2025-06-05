import React, { useCallback, useMemo } from 'react';
import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
} from 'react';
import { SolidLeaf, SolidContainer } from '@ldo/connected-solid';
import { InvalidIdentifierResource } from '@ldo/connected';
import { useDataBrowserConfig } from './DataBrowser';
import {
  Href,
  useGlobalSearchParams,
  usePathname,
  useRouter,
} from 'expo-router';
import { useResource } from '@ldo/solid-react';

interface UseTargetResourceContext {
  targetUri?: string;
  targetResource?: SolidLeaf | SolidContainer | InvalidIdentifierResource;
  refresh: () => void;
  navigateTo: (uri: string) => void;
}

// @ts-ignore The default value will be filled in upon mount
const TargetResourceContext = createContext<UseTargetResourceContext>({});

export function useTargetResource() {
  return useContext(TargetResourceContext);
}

export const TargetResourceProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { mode, host } = useDataBrowserConfig();
  const pathname = usePathname();
  const globalSearchParams = useGlobalSearchParams();
  const router = useRouter();

  const targetUri = useMemo<string | undefined>(() => {
    if (globalSearchParams.uri)
      return Array.isArray(globalSearchParams.uri)
        ? globalSearchParams.uri[0]
        : globalSearchParams.uri;
    // If we're a standalone app and the uri isn't provided in the search params, it's undefined
    if (mode === 'standalone-app') return undefined;
    // Must be in web if this is server-hosted
    const origin = window.location.origin;
    return `${origin}${pathname}`;
  }, [globalSearchParams.uri, mode, pathname]);

  const targetResource = useResource(targetUri);

  const refresh = useCallback(async () => {
    if (targetResource) {
      await targetResource?.read();
    }
  }, [targetResource]);

  const navigateTo = useCallback(
    (newRoute: string) => {
      const newUrl = new URL(newRoute);
      if (mode === 'server-ui' && newUrl.host === host) {
        router.navigate(`${newUrl.pathname}${newUrl.hash}` as Href);
      }
      router.navigate(`/?uri=${encodeURIComponent(newRoute)}`);
    },
    [host, mode, router],
  );

  const context = useMemo(
    () => ({
      targetUri,
      targetResource,
      refresh,
      navigateTo,
    }),
    [targetUri, targetResource, refresh, navigateTo],
  );

  return (
    <TargetResourceContext.Provider value={context}>
      {children}
    </TargetResourceContext.Provider>
  );
};
