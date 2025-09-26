import { useTheme } from '@react-navigation/native';
import * as Slot from '@rn-primitives/slot';
import React, {
  PropsWithChildren,
  FunctionComponent,
  ComponentProps,
  createContext,
  useContext,
  RefObject,
} from 'react';
import { Text as RNText, StyleSheet, TextStyle } from 'react-native';

interface TextStyleProps {
  style?: TextStyle;
  variant?: TextVariant;
  size?: TextSize;
  muted?: boolean;
  bold?: boolean;
}

interface TextStyleContextValue extends TextStyleProps {}

const TextStyleContext = createContext<TextStyleContextValue | undefined>(
  undefined,
);

interface TextStyleProviderProps extends PropsWithChildren, TextStyleProps {}

const TextStyleProvider: FunctionComponent<TextStyleProviderProps> = ({
  children,
  style,
  variant,
  size,
  muted,
  bold,
}) => {
  const contextValue: TextStyleContextValue = {
    style,
    variant,
    size,
    muted,
    bold,
  };

  console.log('TextStyleProvider');
  console.log(contextValue);

  return (
    <TextStyleContext.Provider value={contextValue}>
      {children}
    </TextStyleContext.Provider>
  );
};

export type TextVariant = 'default' | 'h1' | 'h2' | 'h3' | 'label';
export type TextSize =
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | number;

interface UseTextStylesParams {
  variant?: TextVariant;
  size?: TextSize;
  muted?: boolean;
  bold?: boolean;
  style?: TextStyle;
}

function useTextStyles({
  variant,
  size,
  muted,
  bold,
  style,
}: UseTextStylesParams): TextStyle[] {
  const contextValue = useContext(TextStyleContext);
  const { colors } = useTheme();
  // Use context values as defaults, but allow props to override
  const effectiveVariant = variant ?? contextValue?.variant;
  const effectiveSize = size ?? contextValue?.size;
  const effectiveMuted = muted ?? contextValue?.muted;
  const effectiveBold = bold ?? contextValue?.bold;

  let isMuted = false;
  let isBold = false;
  let textSize: TextSize = 'base';
  let customFontSize: number | undefined;

  if (effectiveVariant) {
    switch (effectiveVariant) {
      case 'h1':
        isBold = true;
        textSize = '3xl';
        break;
      case 'h2':
        isBold = true;
        textSize = '2xl';
        break;
      case 'h3':
        isBold = true;
        textSize = 'xl';
        break;
      case 'label':
        isBold = true;
        textSize = 'sm';
        break;
      case 'default':
      default:
        break;
    }
  }

  if (effectiveMuted !== undefined) isMuted = effectiveMuted;
  if (effectiveBold !== undefined) isBold = effectiveBold;
  if (effectiveSize !== undefined) {
    if (typeof effectiveSize === 'number') {
      customFontSize = effectiveSize;
    } else {
      textSize = effectiveSize;
    }
  }

  // Build the style array with theme colors
  return [
    styles.base,
    { color: colors.text }, // Use theme color instead of hard-coded
    contextValue?.style, // Apply context style
    isBold && styles.bold,
    isMuted && { color: colors.text + '80' }, // Use theme color with opacity for muted
    customFontSize ? { fontSize: customFontSize } : styles[textSize],
    contextValue?.style,
    style, // Individual style prop overrides everything
  ].filter((styleItem): styleItem is TextStyle => Boolean(styleItem));
}

function Text({
  style,
  asChild = false,
  variant,
  size,
  muted,
  bold,
  ...props
}: ComponentProps<typeof RNText> & {
  ref?: RefObject<RNText>;
  asChild?: boolean;
} & TextStyleProps) {
  const Component = asChild ? Slot.Text : RNText;

  const textStyles = useTextStyles({
    variant,
    size,
    muted,
    bold,
    style,
  });

  return (
    <Component
      style={textStyles}
      selectable={true} // web:select-text equivalent
      {...props}
    />
  );
}

export {
  Text,
  TextStyleProvider,
  TextStyleContext,
  useTextStyles,
  TextStyleProps,
};

const styles = StyleSheet.create({
  base: {
    fontSize: 16, // text-base
    // color is now handled dynamically with theme
  },
  selectable: {
    // web:select-text - this is handled by selectable prop in React Native
  },
  bold: {
    fontWeight: '600', // font-semibold
  },
  // muted color is now handled dynamically with theme
  // Size variants
  xs: {
    fontSize: 12, // text-xs
  },
  sm: {
    fontSize: 14, // text-sm
  },
  baseSize: {
    fontSize: 16, // text-base
  },
  lg: {
    fontSize: 18, // text-lg
  },
  xl: {
    fontSize: 20, // text-xl
  },
  '2xl': {
    fontSize: 24, // text-2xl
  },
  '3xl': {
    fontSize: 30, // text-3xl
  },
});
