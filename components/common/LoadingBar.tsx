import React from 'react';
import { useTheme } from '@react-navigation/native';
import { FunctionComponent } from 'react';
import { Bar } from 'react-native-progress';
import { StyleSheet } from 'react-native';

interface LoadingBarProps {
  isLoading: boolean;
}

export const LoadingBar: FunctionComponent<LoadingBarProps> = ({
  isLoading,
}) => {
  const { colors } = useTheme();

  if (!isLoading) return <></>;

  return (
    <Bar
      color={colors.primary}
      indeterminate
      borderWidth={0}
      borderRadius={0}
      width={null}
      style={styles.bar}
    />
  );
};

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
