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

function Input({
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

  const createInputStyles = (themeColors: any) =>
    StyleSheet.create({
      base: {
        height: 40, // h-10 equivalent
        borderRadius: 6, // rounded-md
        borderWidth: 1,
        borderColor: themeColors.colors.border,
        backgroundColor: themeColors.colors.background,
        paddingHorizontal: 12, // px-3
        paddingVertical: 8, // py-2
        fontSize: 16, // text-base
        color: themeColors.colors.text,
        // Platform specific adjustments
        ...(Platform.OS === 'web' && {
          width: '100%',
          outline: 'none',
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
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
      container: {
        flexDirection: 'row',
      },
      labelContainer: {
        gap: 4, // gap-1
      },
      buttonRadius: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
    });

  const inputStyles = createInputStyles(theme);

  const inputStyle = [
    inputStyles.base,
    props.editable === false && inputStyles.disabled,
    buttonRight && inputStyles.withButton,
    style,
  ];

  let textInput = (
    <TextInput
      style={inputStyle}
      placeholderTextColor={theme.colors.border} // muted-foreground equivalent
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

export { Input };
