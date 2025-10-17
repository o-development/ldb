import { useTheme } from '@react-navigation/native';
import type { LucideIcon } from 'lucide-react-native';
import * as React from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';
import { Text } from '../../components/ui/text';

type AlertVariant = 'default' | 'destructive';

interface AlertProps extends ViewProps {
  ref?: React.RefObject<View>;
  icon: LucideIcon;
  iconSize?: number;
  variant?: AlertVariant;
}

function Alert({
  style,
  variant = 'default',
  children,
  icon: Icon,
  iconSize = 16,
  ...props
}: AlertProps) {
  const { colors } = useTheme();

  const getAlertStyles = () => {
    const baseAlertStyles = {
      backgroundColor: colors.background,
      borderColor:
        variant === 'destructive' ? colors.notification : colors.border,
      shadowColor: colors.text,
    };

    return StyleSheet.flatten([styles.base, baseAlertStyles, style]);
  };

  return (
    <View role="alert" style={getAlertStyles()} {...props}>
      <View style={styles.icon}>
        <Icon
          size={iconSize}
          color={variant === 'destructive' ? colors.notification : colors.text}
        />
      </View>
      {children}
    </View>
  );
}

function AlertTitle({ style, ...props }: React.ComponentProps<typeof Text>) {
  const { colors } = useTheme();
  return (
    <Text
      style={StyleSheet.flatten([styles.title, { color: colors.text }, style])}
      {...props}
    />
  );
}

function AlertDescription({
  style,
  ...props
}: React.ComponentProps<typeof Text>) {
  const { colors } = useTheme();
  return (
    <Text
      style={StyleSheet.flatten([
        styles.description,
        { color: colors.text },
        style,
      ])}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    position: 'relative',
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  default: {
    // no additional styles
  },
  destructive: {
    // border color will be applied dynamically
  },
  icon: {
    position: 'absolute',
    left: 14,
    top: 16,
    transform: [{ translateY: -2 }],
  },
  title: {
    paddingLeft: 28,
    marginBottom: 4,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: -0.025,
  },
  description: {
    paddingLeft: 28,
    fontSize: 14,
    lineHeight: 20,
  },
});

export { Alert, AlertDescription, AlertTitle };
