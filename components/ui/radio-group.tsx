import React, { PropsWithChildren } from 'react';
import * as RadioGroupPrimitive from '@rn-primitives/radio-group';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Label } from './label';

function RadioGroup({
  style,
  ...props
}: RadioGroupPrimitive.RootProps & {
  ref?: React.RefObject<RadioGroupPrimitive.RootRef>;
}) {
  return (
    <RadioGroupPrimitive.Root
      style={StyleSheet.flatten([styles.root, style])}
      {...props}
    />
  );
}

function RadioGroupItem({
  style,
  ...props
}: RadioGroupPrimitive.ItemProps & {
  ref?: React.RefObject<RadioGroupPrimitive.ItemRef>;
}) {
  const { colors } = useTheme();

  const itemStyles = StyleSheet.flatten([
    styles.item,
    {
      borderColor: colors.primary,
      opacity: props.disabled ? 0.5 : 1,
    },
    style,
  ]);

  const indicatorStyles = StyleSheet.flatten([
    styles.indicator,
    { backgroundColor: colors.primary },
  ]);

  return (
    <RadioGroupPrimitive.Item style={itemStyles} {...props}>
      <RadioGroupPrimitive.Indicator style={styles.indicatorContainer}>
        <View style={indicatorStyles} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

function RadioGroupItemWithLabel({
  value,
  children,
}: PropsWithChildren<{
  value: string;
}>) {
  return (
    <View style={styles.itemWithLabel}>
      <RadioGroupItem aria-labelledby={`label-for-${value}`} value={value} />
      <Label nativeID={`label-for-${value}`} style={styles.label}>
        {children}
      </Label>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: 8,
  },
  item: {
    aspectRatio: 1,
    height: 16,
    width: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    aspectRatio: 1,
    height: 9,
    width: 9,
    borderRadius: 4.5,
  },
  itemWithLabel: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  label: {
    flexDirection: 'row',
    gap: 4,
  },
});

export { RadioGroup, RadioGroupItem, RadioGroupItemWithLabel };
