import * as AccordionPrimitive from '@rn-primitives/accordion';
import * as React from 'react';
import { Platform, Pressable, View, StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  FadeIn,
  FadeOutUp,
  LayoutAnimationConfig,
  LinearTransition,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { ChevronDown } from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';
import { TextStyleProvider } from '../../components/ui/text';

function Accordion({
  children,
  ...props
}: Omit<AccordionPrimitive.RootProps, 'asChild'> & {
  ref?: React.RefObject<AccordionPrimitive.RootRef>;
}) {
  return (
    <LayoutAnimationConfig skipEntering>
      <AccordionPrimitive.Root
        {...(props as AccordionPrimitive.RootProps)}
        asChild={Platform.OS !== 'web'}
      >
        <Animated.View layout={LinearTransition.duration(200)}>
          {children}
        </Animated.View>
      </AccordionPrimitive.Root>
    </LayoutAnimationConfig>
  );
}

function AccordionItem({
  style,
  value,
  ...props
}: AccordionPrimitive.ItemProps & {
  ref?: React.RefObject<AccordionPrimitive.ItemRef>;
}) {
  const { colors } = useTheme();
  return (
    <Animated.View
      style={[styles.itemContainer, { overflow: 'hidden' }]}
      layout={LinearTransition.duration(200)}
    >
      <AccordionPrimitive.Item
        style={StyleSheet.flatten([
          styles.item,
          { borderBottomColor: colors.border },
          style,
        ])}
        value={value}
        {...props}
      />
    </Animated.View>
  );
}

const Trigger = Platform.OS === 'web' ? View : Pressable;

function AccordionTrigger({
  style,
  children,
  ...props
}: AccordionPrimitive.TriggerProps & {
  children?: React.ReactNode;
  ref?: React.RefObject<AccordionPrimitive.TriggerRef>;
}) {
  const { colors } = useTheme();
  const { isExpanded } = AccordionPrimitive.useItemContext();

  const progress = useDerivedValue(() =>
    isExpanded
      ? withTiming(1, { duration: 250 })
      : withTiming(0, { duration: 200 }),
  );
  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 180}deg` }],
    opacity: interpolate(progress.value, [0, 1], [1, 0.8], Extrapolation.CLAMP),
  }));

  const textStyles = {
    fontSize: Platform.OS === 'web' ? 16 : 18,
    fontWeight: '500' as const,
    color: colors.text,
  };

  return (
    <TextStyleProvider style={textStyles}>
      <AccordionPrimitive.Header style={styles.header}>
        <AccordionPrimitive.Trigger {...props} asChild>
          <Trigger
            style={StyleSheet.flatten([
              styles.trigger,
              { flex: Platform.OS === 'web' ? 1 : undefined },
              style,
            ])}
          >
            {children}
            <Animated.View style={chevronStyle}>
              <ChevronDown size={18} color={colors.text} />
            </Animated.View>
          </Trigger>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    </TextStyleProvider>
  );
}

function AccordionContent({
  style,
  children,
  ...props
}: AccordionPrimitive.ContentProps & {
  ref?: React.RefObject<AccordionPrimitive.ContentRef>;
}) {
  const { colors } = useTheme();

  const textStyles = {
    fontSize: Platform.OS === 'web' ? 14 : 18,
    color: colors.text,
  };

  return (
    <TextStyleProvider style={textStyles}>
      <AccordionPrimitive.Content
        style={StyleSheet.flatten([
          styles.content,
          { overflow: 'hidden' },
          style,
        ])}
        {...props}
      >
        <InnerContent style={styles.innerContent}>{children}</InnerContent>
      </AccordionPrimitive.Content>
    </TextStyleProvider>
  );
}

function InnerContent({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) {
  if (Platform.OS === 'web') {
    return (
      <View style={StyleSheet.flatten([styles.innerContent, style])}>
        {children}
      </View>
    );
  }
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOutUp.duration(200)}
      style={StyleSheet.flatten([styles.innerContent, style])}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    overflow: 'hidden',
  },
  item: {
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: 'row',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  content: {
    overflow: 'hidden',
  },
  innerContent: {
    paddingBottom: 16,
  },
});

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
