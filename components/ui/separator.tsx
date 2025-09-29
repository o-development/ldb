import { useTheme } from '@react-navigation/native';
import * as SeparatorPrimitive from '@rn-primitives/separator';
import * as React from 'react';
import { StyleSheet } from 'react-native';

function Separator({
  style,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: SeparatorPrimitive.RootProps & {
  ref?: React.RefObject<SeparatorPrimitive.RootRef>;
}) {
  const { colors } = useTheme();
  return (
    <SeparatorPrimitive.Root
      decorative={decorative}
      orientation={orientation}
      style={StyleSheet.flatten([
        orientation === 'horizontal' ? styles.horizontal : styles.vertical,
        { backgroundColor: colors.border },
        style,
      ])}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  horizontal: {
    flexShrink: 0,
    height: 1,
    width: '100%',
  },
  vertical: {
    flexShrink: 0,
    height: '100%',
    width: 1,
  },
});

export { Separator };
