import * as React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Platform,
  type TextInputProps,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from './text';
import { Button, ButtonProps } from './button';

export function Input({
  style,
  label,
  buttonRight,
  ...props
}: TextInputProps & {
  ref?: React.RefObject<TextInput>;
  label?: string;
  buttonRight?: ButtonProps;
}) {
  const theme = useTheme();

  // Apply theme colors to base styles
  const inputStyles = {
    base: {
      ...inputBaseStyles.base,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
    },
    disabled: inputBaseStyles.disabled,
    withButton: inputBaseStyles.withButton,
    container: inputBaseStyles.container,
    labelContainer: inputBaseStyles.labelContainer,
    buttonRadius: inputBaseStyles.buttonRadius,
  };

  const inputStyle = [
    inputStyles.base,
    props.editable === false && inputStyles.disabled,
    buttonRight && inputStyles.withButton,
    style,
  ];

  let textInput = (
    <TextInput
      style={inputStyle}
      placeholderTextColor={theme.colors.text.replace(')', ' / 0.6)')} // Higher contrast than border, with opacity
      {...props}
    />
  );

  if (buttonRight) {
    textInput = (
      <View style={inputStyles.container}>
        {textInput}
        <Button {...buttonRight} style={[inputStyles.buttonRadius]} />
      </View>
    );
  }

  if (label) {
    textInput = (
      <View style={inputStyles.labelContainer}>
        <Text variant="label">{label}</Text>
        {textInput}
      </View>
    );
  }
  return textInput;
}

// Global base styles for input component
const inputBaseStyles = StyleSheet.create({
  base: {
    height: 40, // h-10 equivalent
    borderRadius: 6, // rounded-md
    borderWidth: 1,
    paddingHorizontal: 12, // px-3
    paddingVertical: 8, // py-2
    fontSize: 16, // text-base
    // Platform specific adjustments
    ...(Platform.OS === 'web' && {
      width: '100%',
    }),
    ...(Platform.OS !== 'web' && {
      height: 48, // native:h-12
      fontSize: 18, // native:text-lg
      lineHeight: 22.5, // native:leading-[1.25]
    }),
  },
  disabled: {
    opacity: 0.5,
    ...(Platform.OS === 'web' && {
      cursor: 'not-allowed',
    }),
  },
  withButton: {
    borderRadius: 'none',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  container: {
    flexDirection: 'row',
  },
  labelContainer: {
    gap: 4, // gap-1
  },
  buttonRadius: {
    borderRadius: 'none',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});
