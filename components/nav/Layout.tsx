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
            <View style={styles.contentView}>{/* <RenderView /> */}</View>
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
  const { curViewConfig, targetResource } = useViewContext();

  if (targetResource?.isDoingInitialFetch()) return <></>;

  const CurView = curViewConfig.view;
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
