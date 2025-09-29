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

// Helper function to add opacity to HSL colors
function addOpacityToHSL(hslColor: string, opacity: number): string {
  // Extract HSL values from string like "hsl(0 0% 98%)"
  const hslMatch = hslColor.match(
    /hsl\((\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%\)/,
  );
  if (hslMatch) {
    const [, h, s, l] = hslMatch;

    // Convert HSL to RGB for better React Native compatibility
    const hNum = parseFloat(h) / 360;
    const sNum = parseFloat(s) / 100;
    const lNum = parseFloat(l) / 100;

    const c = (1 - Math.abs(2 * lNum - 1)) * sNum;
    const x = c * (1 - Math.abs(((hNum * 6) % 2) - 1));
    const m = lNum - c / 2;

    let r, g, b;
    if (hNum < 1 / 6) {
      r = c;
      g = x;
      b = 0;
    } else if (hNum < 2 / 6) {
      r = x;
      g = c;
      b = 0;
    } else if (hNum < 3 / 6) {
      r = 0;
      g = c;
      b = x;
    } else if (hNum < 4 / 6) {
      r = 0;
      g = x;
      b = c;
    } else if (hNum < 5 / 6) {
      r = x;
      g = 0;
      b = c;
    } else {
      r = c;
      g = 0;
      b = x;
    }

    const rFinal = Math.round((r + m) * 255);
    const gFinal = Math.round((g + m) * 255);
    const bFinal = Math.round((b + m) * 255);

    const rgbaResult = `rgba(${rFinal}, ${gFinal}, ${bFinal}, ${opacity})`;

    // Return RGBA for better React Native compatibility
    return rgbaResult;
  }
  return hslColor;
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
    isMuted && { color: addOpacityToHSL(colors.text, 0.5) }, // Use theme color with proper opacity for muted
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
