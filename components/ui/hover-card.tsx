import * as HoverCardPrimitive from '@rn-primitives/hover-card';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
import { TextStyleProvider } from '../../components/ui/text';

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

function HoverCardContent({
  style,
  align = 'center',
  sideOffset = 4,
  ...props
}: HoverCardPrimitive.ContentProps & {
  ref?: React.RefObject<HoverCardPrimitive.ContentRef>;
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
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Overlay
        style={Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined}
      >
        <Animated.View entering={FadeIn}>
          <TextStyleProvider style={textStyles}>
            <HoverCardPrimitive.Content
              align={align}
              sideOffset={sideOffset}
              style={contentStyles}
              {...props}
            />
          </TextStyleProvider>
        </Animated.View>
      </HoverCardPrimitive.Overlay>
    </HoverCardPrimitive.Portal>
  );
}

const styles = StyleSheet.create({
  content: {
    zIndex: 50,
    width: 256,
    borderRadius: 6,
    borderWidth: 1,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});

export { HoverCard, HoverCardContent, HoverCardTrigger };
