import * as React from 'react';
import { Pressable, View, Platform, TextStyle } from 'react-native';
import {
  Text,
  TextStyleProps,
  TextStyleProvider,
  useTextStyles,
} from '../ui/text';
import { CircleSnail } from 'react-native-progress';
import { useTheme } from '@react-navigation/native';
import { LucideIcon } from 'lucide-react-native';
import { Icon } from './icon';

// Button variant types
type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

// Style generation functions
const getButtonStyles = (
  variant: ButtonVariant = 'default',
  size: ButtonSize = 'default',
  isPressed: boolean = false,
  isHovered: boolean = false,
  isDisabled: boolean = false,
  theme: any,
) => {
  const baseStyles = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderRadius: 6,
    opacity: isDisabled ? 0.5 : 1,
  };

  // Size styles
  const sizeStyles = {
    default: {
      height: Platform.OS === 'web' ? 40 : 48,
      paddingHorizontal: Platform.OS === 'web' ? 16 : 20,
      paddingVertical: Platform.OS === 'web' ? 8 : 12,
    },
    sm: {
      height: 36,
      borderRadius: 6,
      paddingHorizontal: 12,
    },
    lg: {
      height: Platform.OS === 'web' ? 44 : 56,
      borderRadius: 6,
      paddingHorizontal: 32,
    },
    icon: {
      height: 40,
      width: 40,
    },
  };

  // Variant styles
  const variantStyles = {
    default: {
      backgroundColor: theme.colors.primary,
      opacity: isPressed || isHovered ? 0.9 : 1,
    },
    destructive: {
      backgroundColor: theme.colors.notification,
      opacity: isPressed || isHovered ? 0.9 : 1,
    },
    outline: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor:
        isPressed || isHovered ? theme.colors.border : theme.colors.background,
    },
    secondary: {
      backgroundColor: theme.colors.border,
      opacity: isPressed || isHovered ? 0.8 : 1,
    },
    ghost: {
      backgroundColor:
        isPressed || isHovered ? theme.colors.border : 'transparent',
    },
    link: {
      backgroundColor: 'transparent',
      textDecorationLine:
        isPressed || isHovered ? ('underline' as const) : ('none' as const),
    },
  };

  return {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };
};

const getButtonTextStyles = (
  variant: ButtonVariant = 'default',
  size: ButtonSize = 'default',
  isPressed: boolean = false,
  theme: any,
) => {
  const baseStyles = {
    fontSize: Platform.OS === 'web' ? 14 : 16,
    fontWeight: '500' as const,
    color: theme.colors.text,
  };

  // Size-specific text styles
  const sizeStyles = {
    default: {},
    sm: {},
    lg: {
      fontSize: Platform.OS === 'web' ? 14 : 18,
    },
    icon: {},
  };

  // Variant-specific text styles
  const variantStyles = {
    default: {
      color: theme.colors.background,
    },
    destructive: {
      color: theme.colors.background,
    },
    outline: {
      color: isPressed ? theme.colors.text : theme.colors.text,
    },
    secondary: {
      color: theme.colors.text,
    },
    ghost: {
      color: isPressed ? theme.colors.text : theme.colors.text,
    },
    link: {
      color: theme.colors.primary,
      textDecorationLine: isPressed
        ? ('underline' as const)
        : ('none' as const),
    },
  };

  return {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };
};

type ButtonProps = React.ComponentProps<typeof Pressable> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  isLoading?: boolean;
  text?: string;
  textStyle?: TextStyle;
};

function Button({
  ref,
  variant = 'default',
  size = 'default',
  children,
  iconLeft,
  iconRight,
  isLoading,
  text,
  textStyle,
  disabled,
  ...props
}: ButtonProps) {
  const theme = useTheme();

  // Icon spacing styles
  const iconLeftStyle = { marginRight: children ? 8 : 0 };
  const iconRightStyle = { marginLeft: children ? 8 : 0 };

  const loadColor =
    !variant || variant === 'default'
      ? theme.colors.background
      : theme.colors.primary;

  return (
    <Pressable ref={ref} role="button" disabled={disabled} {...props}>
      {({ pressed, hovered }) => {
        // Use Pressable's callback state for all styling
        const buttonStyles = getButtonStyles(
          variant,
          size,
          pressed,
          hovered,
          disabled ?? false,
          theme,
        );

        const buttonTextStyles = getButtonTextStyles(
          variant,
          size,
          pressed,
          theme,
        );

        // Merge textStyleProps to override default styles
        const finalTextStyles = textStyle
          ? { ...buttonTextStyles, ...textStyle }
          : buttonTextStyles;

        return (
          <TextStyleProvider style={finalTextStyles}>
            <View style={buttonStyles}>
              {isLoading ? (
                <View>
                  <CircleSnail size={20} color={loadColor} />
                </View>
              ) : iconLeft ? (
                <View style={iconLeftStyle}>
                  <Icon icon={iconLeft} />
                </View>
              ) : undefined}
              {text ? (
                <Text>{text}</Text>
              ) : (
                <Text>{children as React.ReactNode}</Text>
              )}
              {iconRight ? (
                <View style={iconRightStyle}>
                  <Icon icon={iconRight} />
                </View>
              ) : undefined}
            </View>
          </TextStyleProvider>
        );
      }}
    </Pressable>
  );
}

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
