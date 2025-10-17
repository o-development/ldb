import React from 'react';
import * as PopoverPrimitive from '@rn-primitives/popover';
import { Platform, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
import { TextStyleProvider } from '../../components/ui/text';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

function PopoverContent({
  style,
  align = 'center',
  sideOffset = 4,
  portalHost,
  ...props
}: PopoverPrimitive.ContentProps & {
  ref?: React.RefObject<PopoverPrimitive.ContentRef>;
  portalHost?: string;
}) {
  const { colors } = useTheme();

  const contentStyles = StyleSheet.flatten([
    styles.content,
    {
      backgroundColor: colors.background,
      borderColor: colors.border,
      shadowColor: colors.text,
    },
    style,
  ]);

  const textStyles = {
    color: colors.text,
  };

  return (
    <PopoverPrimitive.Portal hostName={portalHost}>
      <PopoverPrimitive.Overlay
        style={Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined}
      >
        <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut}>
          <TextStyleProvider style={textStyles}>
            <PopoverPrimitive.Content
              align={align}
              sideOffset={sideOffset}
              style={contentStyles}
              {...props}
            />
          </TextStyleProvider>
        </Animated.View>
      </PopoverPrimitive.Overlay>
    </PopoverPrimitive.Portal>
  );
}

const styles = StyleSheet.create({
  content: {
    zIndex: 50,
    width: 288,
    borderRadius: 6,
    borderWidth: 1,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});

export { Popover, PopoverContent, PopoverTrigger };
