import * as TooltipPrimitive from '@rn-primitives/tooltip';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
import { TextStyleProvider } from '../../components/ui/text';

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

function TooltipContent({
  style,
  sideOffset = 4,
  portalHost,
  ...props
}: TooltipPrimitive.ContentProps & {
  ref?: React.RefObject<TooltipPrimitive.ContentRef>;
  portalHost?: string;
}) {
  const { colors } = useTheme();

  const tooltipStyles = StyleSheet.flatten([
    styles.content,
    {
      backgroundColor: colors.background,
      borderColor: colors.border,
      shadowColor: colors.text,
    },
    style,
  ]);

  const textStyles = {
    fontSize: Platform.OS === 'web' ? 14 : 16,
    color: colors.text,
  };

  return (
    <TooltipPrimitive.Portal hostName={portalHost}>
      <TooltipPrimitive.Overlay
        style={Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined}
      >
        <Animated.View
          entering={Platform.select({ web: undefined, default: FadeIn })}
          exiting={Platform.select({ web: undefined, default: FadeOut })}
        >
          <TextStyleProvider style={textStyles}>
            <TooltipPrimitive.Content
              sideOffset={sideOffset}
              style={tooltipStyles}
              {...props}
            />
          </TextStyleProvider>
        </Animated.View>
      </TooltipPrimitive.Overlay>
    </TooltipPrimitive.Portal>
  );
}

const styles = StyleSheet.create({
  content: {
    zIndex: 50,
    overflow: 'hidden',
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});

export { Tooltip, TooltipContent, TooltipTrigger };
