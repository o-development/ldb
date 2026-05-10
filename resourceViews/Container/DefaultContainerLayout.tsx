import React, { FunctionComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ContainerLayoutProps } from './ContainerView';

export const DefaultContainerLayout: FunctionComponent<
  ContainerLayoutProps
> = ({ sideMenu, content }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.leftPanel}>{sideMenu}</View>
      <View style={[styles.rightPanel, { backgroundColor: colors.background }]}>
        {content}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 16,
  },
  leftPanel: {
    maxWidth: 220,
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  rightPanel: {
    flex: 3,
    borderTopLeftRadius: 12,
  },
});
