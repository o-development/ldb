import * as TogglePrimitive from '@rn-primitives/toggle';
import type { LucideIcon } from 'lucide-react-native';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TextStyleProvider } from '../ui/text';

// Define toggle variants locally since we're converting away from class-variance-authority
const toggleVariants = {
  default: {
    backgroundColor: 'transparent',
  },
  outline: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
};

const toggleTextVariants = {
  default: {},
  outline: {},
};

function Toggle({
  style,
  variant = 'default',
  size = 'default',
  ...props
}: TogglePrimitive.RootProps & {
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  ref?: React.RefObject<TogglePrimitive.RootRef>;
}) {
  const { colors } = useTheme();

  const textStyles = {
    fontSize: size === 'sm' ? 14 : size === 'lg' ? 16 : 14,
    fontWeight: '500' as const,
    color: props.pressed ? colors.text : colors.text,
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return styles.smSize;
      case 'lg':
        return styles.lgSize;
      default:
        return styles.defaultSize;
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'outline':
        return styles.outlineVariant;
      default:
        return styles.defaultVariant;
    }
  };

  const toggleStyles = StyleSheet.flatten([
    styles.toggle,
    getVariantStyles(),
    getSizeStyles(),
    {
      backgroundColor: props.pressed ? colors.border : 'transparent',
      borderColor: variant === 'outline' ? colors.border : 'transparent',
      opacity: props.disabled ? 0.5 : 1,
    },
    style,
  ]);

  return (
    <TextStyleProvider style={textStyles}>
      <TogglePrimitive.Root style={toggleStyles} {...props} />
    </TextStyleProvider>
  );
}

function ToggleIcon({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<LucideIcon> & {
  icon: LucideIcon;
}) {
  const { colors } = useTheme();

  return <Icon color={colors.text} {...props} />;
}

const styles = StyleSheet.create({
  toggle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  defaultVariant: {
    backgroundColor: 'transparent',
  },
  outlineVariant: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  defaultSize: {
    height: 40,
    paddingHorizontal: 12,
  },
  smSize: {
    height: 36,
    paddingHorizontal: 10,
  },
  lgSize: {
    height: 44,
    paddingHorizontal: 20,
  },
});

export { Toggle, ToggleIcon, toggleTextVariants, toggleVariants };
