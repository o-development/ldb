import React, {
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
} from 'react';
import { ResourceViewConfig } from '../ResourceView';

import { Header } from './header/Header';
import { View } from 'react-native';
import { useViewContext, ViewContextProvider } from './useViewContext';
import { DialogProvider } from './DialogProvider';
import { useSolidAuth } from '@ldo/solid-react';

export const ValidViewContext = createContext<{
  validViews: ResourceViewConfig[];
  curViewConfig: ResourceViewConfig;
  setCurViewConfig: Dispatch<SetStateAction<ResourceViewConfig>>;
  // @ts-ignore This will be filled in later
}>({});

export const Layout: FunctionComponent = () => {
  const { ranInitialAuthCheck } = useSolidAuth();

  if (!ranInitialAuthCheck) {
    return <></>;
  }

  return (
    <DialogProvider>
      <ViewContextProvider>
        <Header />
        <View className="flex-1 z-0">
          <RenderView />
        </View>
      </ViewContextProvider>
    </DialogProvider>
  );
};

/**
 * =============================================================================
 * Render View
 * =============================================================================
 */

export const RenderView: FunctionComponent = () => {
  const { curViewConfig, targetResource } = useViewContext();

  if (targetResource?.isDoingInitialFetch()) return <></>;

  const CurView = curViewConfig.view;
  return <CurView />;
};
