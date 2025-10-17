import * as CheckboxPrimitive from '@rn-primitives/checkbox';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';

// Dynamic style generation function
const getCheckboxStyles = (
  checked: boolean = false,
  disabled: boolean = false,
  theme: any,
) => {
  const baseStyles = {
    height: 16,
    width: 16,
    flexShrink: 0,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  const checkedStyles = checked
    ? {
        backgroundColor: theme.colors.primary,
      }
    : {};

  const disabledStyles = disabled
    ? {
        opacity: 0.5,
      }
    : {};

  return StyleSheet.flatten([baseStyles, checkedStyles, disabledStyles]);
};

const getIndicatorStyles = () => ({
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  height: '100%' as const,
  width: '100%' as const,
});

function Checkbox({
  style,
  ...props
}: CheckboxPrimitive.RootProps & {
  ref?: React.RefObject<CheckboxPrimitive.RootRef>;
}) {
  const theme = useTheme();

  const rootStyle = StyleSheet.flatten([
    getCheckboxStyles(props.checked, props.disabled, theme),
    style,
  ]);

  return (
    <CheckboxPrimitive.Root style={rootStyle} {...props}>
      <CheckboxPrimitive.Indicator style={getIndicatorStyles()}>
        <Check
          size={12}
          strokeWidth={Platform.OS === 'web' ? 2.5 : 3.5}
          color={theme.colors.background}
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
