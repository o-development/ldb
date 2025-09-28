import * as React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

const duration = 1000;

function Skeleton({
  style,
  ...props
}: React.ComponentPropsWithoutRef<typeof Animated.View>) {
  const sv = useSharedValue(1);

  React.useEffect(() => {
    sv.value = withRepeat(
      withSequence(withTiming(0.5, { duration }), withTiming(1, { duration })),
      -1,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: sv.value,
    ...styles.skeleton,
    style,
  }));

  return <Animated.View style={animatedStyle} {...props} />;
}

const styles = StyleSheet.create({
  skeleton: {
    borderRadius: 6,
    backgroundColor: 'hsl(var(--secondary))',
  },
});

export { Skeleton };
