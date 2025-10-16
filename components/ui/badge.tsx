import React from 'react';
import * as Slot from '@rn-primitives/slot';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TextStyleProvider } from '../ui/text';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

type BadgeProps = ViewProps & {
  asChild?: boolean;
  variant?: BadgeVariant;
};

function Badge({ style, variant = 'default', asChild, ...props }: BadgeProps) {
  const { colors } = useTheme();
  const Component = asChild ? Slot.View : View;

  const getVariantStyles = () => {
    switch (variant) {
      case 'default':
        return { backgroundColor: colors.primary, borderColor: 'transparent' };
      case 'secondary':
        return { backgroundColor: colors.border, borderColor: 'transparent' };
      case 'destructive':
        return {
          backgroundColor: colors.notification,
          borderColor: 'transparent',
        };
      case 'outline':
        return { backgroundColor: 'transparent', borderColor: colors.border };
      default:
        return { backgroundColor: colors.primary, borderColor: 'transparent' };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'default':
        return colors.background;
      case 'secondary':
        return colors.text;
      case 'destructive':
        return colors.background;
      case 'outline':
        return colors.text;
      default:
        return colors.background;
    }
  };

  const badgeStyle = StyleSheet.flatten([
    styles.base,
    getVariantStyles(),
    style,
  ]);
  const textStyle = StyleSheet.flatten([
    textStyles.base,
    { color: getTextColor() },
  ]);

  return (
    <TextStyleProvider style={textStyle}>
      <Component style={badgeStyle} {...props} />
    </TextStyleProvider>
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
});

const textStyles = StyleSheet.create({
  base: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export { Badge };
export type { BadgeProps, BadgeVariant };
