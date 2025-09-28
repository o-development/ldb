import * as CheckboxPrimitive from '@rn-primitives/checkbox';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';

function Checkbox({
  style,
  ...props
}: CheckboxPrimitive.RootProps & {
  ref?: React.RefObject<CheckboxPrimitive.RootRef>;
}) {
  const rootStyle = StyleSheet.flatten([
    styles.root,
    props.checked && styles.rootChecked,
    props.disabled && styles.rootDisabled,
    style,
  ]);

  return (
    <CheckboxPrimitive.Root style={rootStyle} {...props}>
      <CheckboxPrimitive.Indicator style={styles.indicator}>
        <Check
          size={12}
          strokeWidth={Platform.OS === 'web' ? 2.5 : 3.5}
          color="hsl(var(--primary-foreground))"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 16,
    width: 16,
    flexShrink: 0,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'hsl(var(--primary))',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rootChecked: {
    backgroundColor: 'hsl(var(--primary))',
  },
  rootDisabled: {
    opacity: 0.5,
  },
  indicator: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
});

export { Checkbox };
