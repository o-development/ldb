import * as SwitchPrimitives from '@rn-primitives/switch';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { useThemeChange } from '../ThemeProvider';

const styles = StyleSheet.create({
  switchRoot: {
    flexDirection: 'row',
    height: 24,
    width: 44,
    flexShrink: 0,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  switchRootChecked: {
    backgroundColor: 'rgb(24, 24, 27)', // primary color
  },
  switchRootUnchecked: {
    backgroundColor: 'rgb(228, 228, 231)', // input color
  },
  switchRootDisabled: {
    opacity: 0.5,
  },
  switchThumb: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  switchThumbChecked: {
    transform: [{ translateX: 20 }],
  },
  switchThumbUnchecked: {
    transform: [{ translateX: 0 }],
  },
  switchNativeRoot: {
    height: 32,
    width: 46,
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  switchNativeThumb: {
    height: 28,
    width: 28,
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
});

function SwitchWeb({
  ...props
}: SwitchPrimitives.RootProps & {
  ref?: React.RefObject<SwitchPrimitives.RootRef>;
}) {
  const rootStyle = StyleSheet.flatten([
    styles.switchRoot,
    props.checked ? styles.switchRootChecked : styles.switchRootUnchecked,
    props.disabled && styles.switchRootDisabled,
  ]);

  const thumbStyle = StyleSheet.flatten([
    styles.switchThumb,
    props.checked ? styles.switchThumbChecked : styles.switchThumbUnchecked,
  ]);

  return (
    <SwitchPrimitives.Root style={rootStyle} {...props}>
      <SwitchPrimitives.Thumb style={thumbStyle} />
    </SwitchPrimitives.Root>
  );
}

const RGB_COLORS = {
  light: {
    primary: 'rgb(24, 24, 27)',
    input: 'rgb(228, 228, 231)',
  },
  dark: {
    primary: 'rgb(250, 250, 250)',
    input: 'rgb(39, 39, 42)',
  },
} as const;

function SwitchNative({
  ...props
}: SwitchPrimitives.RootProps & {
  ref?: React.RefObject<SwitchPrimitives.RootRef>;
}) {
  const { colorScheme } = useThemeChange();
  const translateX = useDerivedValue(() => (props.checked ? 18 : 0));
  const animatedRootStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        translateX.value,
        [0, 18],
        [RGB_COLORS[colorScheme].input, RGB_COLORS[colorScheme].primary],
      ),
    };
  });
  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(translateX.value, { duration: 200 }) },
    ],
  }));

  const containerStyle = StyleSheet.flatten([
    styles.switchNativeRoot,
    props.disabled && styles.switchRootDisabled,
  ]);

  return (
    <Animated.View
      style={StyleSheet.flatten([animatedRootStyle, containerStyle])}
    >
      <SwitchPrimitives.Root style={styles.switchNativeRoot} {...props}>
        <Animated.View style={animatedThumbStyle}>
          <SwitchPrimitives.Thumb style={styles.switchNativeThumb} />
        </Animated.View>
      </SwitchPrimitives.Root>
    </Animated.View>
  );
}

const Switch = Platform.select({
  web: SwitchWeb,
  default: SwitchNative,
});

export { Switch };
