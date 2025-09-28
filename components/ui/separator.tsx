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
  return (
    <SeparatorPrimitive.Root
      decorative={decorative}
      orientation={orientation}
      style={StyleSheet.flatten([
        orientation === 'horizontal' ? styles.horizontal : styles.vertical,
        style,
      ])}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  horizontal: {
    flexShrink: 0,
    backgroundColor: 'hsl(var(--border))',
    height: 1,
    width: '100%',
  },
  vertical: {
    flexShrink: 0,
    backgroundColor: 'hsl(var(--border))',
    height: '100%',
    width: 1,
  },
});

export { Separator };
