import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
} from 'react';
import { SolidLeaf, SolidContainer } from '@ldo/connected-solid';
import { InvalidIdentifierResource } from '@ldo/connected';
import { useDataBrowserConfig } from './DataBrowser';
import { useResource } from '@ldo/solid-react';
import { Platform } from 'react-native';

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
  const { mode, origin } = useDataBrowserConfig();

  /**
   * URL Management
   */
  const [currentUrl, setCurrentUrl] = useState<URL>(() => {
    return Platform.OS === 'web' ? new URL(window.location.href) : new URL('');
  });

  // Sync with addressbar
  const handleUrlChange = useCallback(() => {
    setCurrentUrl(new URL(window.location.href));
  }, []);
  useEffect(() => {
    if (Platform.OS === 'web') {
      // 1. Listen for 'popstate' events (triggered by browser back/forward buttons, or history.go())
      window.addEventListener('popstate', handleUrlChange);

      // 2. Patch history methods to also trigger our handler
      // This ensures our hook reacts when the app itself changes the URL programmatically.
      const originalPushState = history.pushState;
      const originalReplaceState = history.replaceState;

      history.pushState = function (...args) {
        originalPushState.apply(history, args);
        handleUrlChange(); // Trigger update after pushState
      };

      history.replaceState = function (...args) {
        originalReplaceState.apply(history, args);
        handleUrlChange(); // Trigger update after replaceState
      };

      // Cleanup: Remove event listener and restore original history methods on unmount
      return () => {
        window.removeEventListener('popstate', handleUrlChange);
        history.pushState = originalPushState;
        history.replaceState = originalReplaceState;
      };
    }
  }, [handleUrlChange]);

  const navigateTo = useCallback(
    (newRoute: string) => {
      const newUrl = new URL(newRoute);
      let finalUrl: string;
      if (mode === 'server-ui' && newUrl.origin === origin) {
        finalUrl = newRoute;
      } else {
        finalUrl = `${origin}?uri=${encodeURIComponent(newRoute)}`;
      }
      setCurrentUrl(new URL(finalUrl));
      if (Platform.OS === 'web') {
        window.history.pushState(null, '', finalUrl);
      }
    },
    [origin, mode],
  );

  /**
   * Target Resource Management
   */
  const targetUri = useMemo<string | undefined>(() => {
    const searchParams = currentUrl.searchParams.get('uri');
    if (searchParams) return searchParams;
    // If we're a standalone app and the uri isn't provided in the search params, it's undefined
    if (mode === 'standalone-app') return undefined;
    // Must be in web if this is server-hosted
    const curOrigin = currentUrl.origin;
    const curPathname = currentUrl.pathname;
    return `${curOrigin}${curPathname}`;
  }, [currentUrl, mode]);

  const targetResource = useResource(targetUri);

  const refresh = useCallback(async () => {
    if (targetResource) {
      await targetResource?.read();
    }
  }, [targetResource]);

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
