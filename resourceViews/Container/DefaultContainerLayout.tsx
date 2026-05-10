import React, { FunctionComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ContainerLayoutProps } from './ContainerView';

export const DefaultContainerLayout: FunctionComponent<
  ContainerLayoutProps
> = ({ sideMenu, content }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.leftPanel}>{sideMenu}</View>
      <View
        style={[
          styles.rightPanel,
          { borderLeftWidth: 1, borderLeftColor: colors.border },
        ]}
      >
        {content}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftPanel: {
    maxWidth: 220,
    flex: 1,
    padding: 16,
    paddingRight: 12,
  },
  rightPanel: {
    flex: 3,
  },
});
