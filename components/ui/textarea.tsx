import * as React from 'react';
import { TextInput, type TextInputProps, StyleSheet } from 'react-native';

function Textarea({
  style,
  multiline = true,
  numberOfLines = 4,
  placeholderTextColor,
  ...props
}: TextInputProps & {
  ref?: React.RefObject<TextInput>;
}) {
  const textareaStyle = StyleSheet.flatten([
    styles.textarea,
    props.editable === false && styles.textareaDisabled,
    style,
  ]);

  return (
    <TextInput
      style={textareaStyle}
      placeholderTextColor={
        placeholderTextColor || 'hsl(var(--muted-foreground))'
      }
      multiline={multiline}
      numberOfLines={numberOfLines}
      textAlignVertical="top"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  textarea: {
    minHeight: 80,
    width: '100%',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'hsl(var(--input))',
    backgroundColor: 'hsl(var(--background))',
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: 'hsl(var(--foreground))',
  },
  textareaDisabled: {
    opacity: 0.5,
  },
  placeholder: {
    color: 'hsl(var(--muted-foreground))',
  },
});

export { Textarea };
