import React, {
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
} from 'react';
import { ResourceViewConfig } from '../ResourceView';

import { Header } from './header/Header';
import { View, StyleSheet } from 'react-native';
import { useViewContext, ViewContextProvider } from '../useViewContext';
import { DialogProvider } from './DialogProvider';
import { useSolidAuth } from '@ldo/solid-react';
import { SharingModalProvider } from '../sharing/SharingModal';
import { useTheme } from '@react-navigation/native';

export const ValidViewContext = createContext<{
  validViews: ResourceViewConfig[];
  curViewConfig: ResourceViewConfig;
  setCurViewConfig: Dispatch<SetStateAction<ResourceViewConfig>>;
  // @ts-ignore This will be filled in later
}>({});

export const Layout: FunctionComponent = () => {
  const { ranInitialAuthCheck } = useSolidAuth();
  const { colors } = useTheme();

  if (!ranInitialAuthCheck) {
    return <></>;
  }

  return (
    <DialogProvider>
      <ViewContextProvider>
        <SharingModalProvider>
          <View
            style={[styles.container, { backgroundColor: colors.background }]}
          >
            <Header />
            <View style={styles.contentView}>
              <RenderView />
            </View>
          </View>
        </SharingModalProvider>
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
  const { curViewConfig, validViews, targetResource } = useViewContext();

  // Don't render any view until data is loaded and canDisplays have been calculated.
  // curViewConfig is state updated in useEffect, so it can lag one render behind
  // validViews after navigation—avoid rendering a view that can't display the current resource.
  const isCurrentViewValid = validViews.some(
    (v) => v.name === curViewConfig.name,
  );
  const viewToRender = isCurrentViewValid ? curViewConfig : validViews[0];

  if (targetResource?.isDoingInitialFetch()) return <></>;

  const CurView = viewToRender.view;
  return <CurView />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentView: {
    flex: 1,
    zIndex: 0,
  },
});
