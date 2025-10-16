import * as ProgressPrimitive from '@rn-primitives/progress';
import * as React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';

function Progress({
  style,
  value,
  indicatorStyle,
  ...props
}: ProgressPrimitive.RootProps & {
  ref?: React.RefObject<ProgressPrimitive.RootRef>;
  indicatorStyle?: any;
}) {
  const { colors } = useTheme();

  const progressStyles = StyleSheet.flatten([
    styles.progress,
    { backgroundColor: colors.border },
    style,
  ]);

  return (
    <ProgressPrimitive.Root style={progressStyles} {...props}>
      <Indicator value={value} style={indicatorStyle} />
    </ProgressPrimitive.Root>
  );
}

function Indicator({
  value,
  style,
}: {
  value: number | undefined | null;
  style?: any;
}) {
  const { colors } = useTheme();
  const progress = useDerivedValue(() => value ?? 0);

  const indicator = useAnimatedStyle(() => {
    return {
      width: withSpring(
        `${interpolate(progress.value, [0, 100], [1, 100], Extrapolation.CLAMP)}%`,
        { overshootClamping: true },
      ),
    };
  });

  if (Platform.OS === 'web') {
    return (
      <View
        style={StyleSheet.flatten([
          styles.indicatorWeb,
          {
            transform: `translateX(-${100 - (value ?? 0)}%)`,
            backgroundColor: colors.primary,
          },
          style,
        ])}
      >
        <ProgressPrimitive.Indicator />
      </View>
    );
  }

  return (
    <ProgressPrimitive.Indicator asChild>
      <Animated.View
        style={StyleSheet.flatten([
          indicator,
          styles.indicator,
          { backgroundColor: colors.primary },
          style,
        ])}
      />
    </ProgressPrimitive.Indicator>
  );
}

const styles = StyleSheet.create({
  progress: {
    position: 'relative',
    height: 16,
    width: '100%',
    overflow: 'hidden',
    borderRadius: 8,
  },
  indicator: {
    height: '100%',
  },
  indicatorWeb: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
});

export { Progress };
