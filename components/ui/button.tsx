import * as React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Text } from '../ui/text';
import { CircleSnail } from 'react-native-progress';
import { useTheme } from '@react-navigation/native';

// Base styles that don't depend on theme
const baseButtonStyles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  // Size styles
  sizeDefault: {
    height: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sizeSm: {
    height: 36,
    borderRadius: 6,
    paddingHorizontal: 12,
  },
  sizeLg: {
    height: 44,
    borderRadius: 6,
    paddingHorizontal: 32,
  },
  sizeIcon: {
    height: 40,
    width: 40,
  },
});

const baseTextStyles = StyleSheet.create({
  base: {
    fontSize: 14,
    fontWeight: '500',
  },
  // Size text styles
  textSizeDefault: {
    fontSize: 14,
  },
  textSizeSm: {
    fontSize: 14,
  },
  textSizeLg: {
    fontSize: 16,
  },
  textSizeIcon: {
    fontSize: 14,
  },
});

// Function to create theme-dependent styles
const createButtonStyles = (theme: any) => ({
  // Variant styles
  default: {
    backgroundColor: theme.colors.primary,
  },
  destructive: {
    backgroundColor: theme.colors.notification, // Using notification color for destructive
  },
  outline: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: 'transparent',
  },
  secondary: {
    backgroundColor: theme.colors.card,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  link: {
    backgroundColor: 'transparent',
  },
  // Hover styles
  defaultHover: {
    backgroundColor: theme.colors.primary,
    opacity: 0.9,
  },
  destructiveHover: {
    backgroundColor: theme.colors.notification,
    opacity: 0.9,
  },
  outlineHover: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
  },
  secondaryHover: {
    backgroundColor: theme.colors.card,
    opacity: 0.8,
  },
  ghostHover: {
    backgroundColor: theme.colors.card,
  },
  linkHover: {
    backgroundColor: 'transparent',
    textDecorationLine: 'underline',
  },
});

const createTextStyles = (theme: any) => ({
  base: {
    color: theme.colors.text,
  },
  // Variant text styles
  textDefault: {
    color: theme.colors.background, // Assuming primary buttons have light text
  },
  textDestructive: {
    color: theme.colors.background, // Assuming destructive buttons have light text
  },
  textOutline: {
    color: theme.colors.text,
  },
  textSecondary: {
    color: theme.colors.text,
  },
  textGhost: {
    color: theme.colors.text,
  },
  textLink: {
    color: theme.colors.primary,
  },
  // Hover text styles
  textOutlineHover: {
    color: theme.colors.text,
  },
  textGhostHover: {
    color: theme.colors.text,
  },
  textLinkHover: {
    color: theme.colors.primary,
    textDecorationLine: 'underline',
  },
});

type ButtonProps = React.ComponentProps<typeof Pressable> & {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  isLoading?: boolean;
  text?: string;
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
  style,
  ...props
}: ButtonProps) {
  const theme = useTheme();

  const loadColor =
    !variant || variant === 'default'
      ? theme.colors.background
      : theme.colors.primary;

  // Create theme-dependent styles
  const buttonVariantStyles = createButtonStyles(theme);
  const textVariantStyles = createTextStyles(theme);

  // Helper functions to get style keys
  const getVariantStyle = (variantName: string, hovered: boolean = false) => {
    if (hovered) {
      const hoverKey =
        `${variantName}Hover` as keyof typeof buttonVariantStyles;
      return (
        buttonVariantStyles[hoverKey] ||
        buttonVariantStyles[variantName as keyof typeof buttonVariantStyles]
      );
    }
    return buttonVariantStyles[variantName as keyof typeof buttonVariantStyles];
  };

  const getSizeStyle = (sizeName: string) => {
    const sizeKey =
      `size${sizeName.charAt(0).toUpperCase() + sizeName.slice(1)}` as keyof typeof baseButtonStyles;
    return baseButtonStyles[sizeKey];
  };

  const getTextVariantStyle = (
    variantName: string,
    hovered: boolean = false,
  ) => {
    if (hovered) {
      const textHoverKey =
        `text${variantName.charAt(0).toUpperCase() + variantName.slice(1)}Hover` as keyof typeof textVariantStyles;
      return (
        textVariantStyles[textHoverKey] ||
        textVariantStyles[
          `text${variantName.charAt(0).toUpperCase() + variantName.slice(1)}` as keyof typeof textVariantStyles
        ]
      );
    }
    const textVariantKey =
      `text${variantName.charAt(0).toUpperCase() + variantName.slice(1)}` as keyof typeof textVariantStyles;
    return textVariantStyles[textVariantKey];
  };

  const getTextSizeStyle = (sizeName: string) => {
    const textSizeKey =
      `textSize${sizeName.charAt(0).toUpperCase() + sizeName.slice(1)}` as keyof typeof baseTextStyles;
    return baseTextStyles[textSizeKey];
  };

  return (
    <Pressable
      style={({ hovered, pressed }) => {
        const baseStyles = [
          baseButtonStyles.base,
          getVariantStyle(variant, hovered),
          getSizeStyle(size),
          props.disabled && { opacity: 0.5 },
        ];

        console.log(StyleSheet.flatten([...baseStyles, style]));

        // Handle style prop - it could be a function or object
        if (typeof style === 'function') {
          return StyleSheet.flatten([
            ...baseStyles,
            style({ hovered, pressed }),
          ]);
        } else {
          return StyleSheet.flatten([...baseStyles, style]);
        }
      }}
      ref={ref}
      role="button"
      {...props}
    >
      {({ hovered }) => {
        const textStyle = StyleSheet.flatten([
          baseTextStyles.base,
          textVariantStyles.base,
          getTextVariantStyle(variant, hovered),
          getTextSizeStyle(size),
        ]);

        return (
          <>
            {isLoading ? (
              <View>
                <CircleSnail size={20} color={loadColor} />
              </View>
            ) : iconLeft ? (
              <Text style={textStyle}>
                {React.cloneElement(iconLeft, {
                  size: (iconLeft.props as any).size || 16,
                } as any)}
              </Text>
            ) : undefined}
            {text ? (
              <Text style={textStyle}>{text}</Text>
            ) : (
              (children as React.ReactNode)
            )}
            {iconRight ? (
              <Text style={textStyle}>
                {React.cloneElement(iconRight, {
                  size: (iconRight.props as any).size || 16,
                } as any)}
              </Text>
            ) : undefined}
          </>
        );
      }}
    </Pressable>
  );
}

export {
  Button,
  baseButtonStyles,
  baseTextStyles,
  createButtonStyles,
  createTextStyles,
};
export type { ButtonProps };
