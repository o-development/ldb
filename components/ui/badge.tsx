import React from 'react';
import * as Slot from '@rn-primitives/slot';
import { View, ViewProps, StyleSheet } from 'react-native';
import { TextStyleContext } from '../ui/text';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

type BadgeProps = ViewProps & {
  asChild?: boolean;
  variant?: BadgeVariant;
};

function Badge({ style, variant = 'default', asChild, ...props }: BadgeProps) {
  const Component = asChild ? Slot.View : View;

  const badgeStyle = StyleSheet.flatten([styles.base, styles[variant], style]);

  const textStyle = StyleSheet.flatten([textStyles.base, textStyles[variant]]);

  return (
    <TextStyleContext.Provider value={{ style: textStyle }}>
      <Component style={badgeStyle} {...props} />
    </TextStyleContext.Provider>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  default: {
    borderColor: 'transparent',
    backgroundColor: 'hsl(var(--primary))',
  },
  secondary: {
    borderColor: 'transparent',
    backgroundColor: 'hsl(var(--secondary))',
  },
  destructive: {
    borderColor: 'transparent',
    backgroundColor: 'hsl(var(--destructive))',
  },
  outline: {
    borderColor: 'hsl(var(--border))',
    backgroundColor: 'transparent',
  },
});

const textStyles = StyleSheet.create({
  base: {
    fontSize: 12,
    fontWeight: '600',
  },
  default: {
    color: 'hsl(var(--primary-foreground))',
  },
  secondary: {
    color: 'hsl(var(--secondary-foreground))',
  },
  destructive: {
    color: 'hsl(var(--destructive-foreground))',
  },
  outline: {
    color: 'hsl(var(--foreground))',
  },
});

export { Badge };
export type { BadgeProps, BadgeVariant };
