import * as LabelPrimitive from '@rn-primitives/label';
import * as React from 'react';
import { StyleSheet } from 'react-native';

function Label({
  style,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  ...props
}: LabelPrimitive.TextProps & {
  ref?: React.RefObject<LabelPrimitive.TextRef>;
}) {
  return (
    <LabelPrimitive.Root
      style={styles.root}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <LabelPrimitive.Text
        style={StyleSheet.flatten([styles.text, style])}
        {...props}
      />
    </LabelPrimitive.Root>
  );
}

const styles = StyleSheet.create({
  root: {
    // web:cursor-default - handled by platform
  },
  text: {
    fontSize: 14, // text-sm
    color: 'hsl(var(--foreground))',
    fontWeight: '500',
    lineHeight: 14, // leading-none
  },
});

export { Label };
