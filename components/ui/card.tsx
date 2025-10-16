import * as React from 'react';
import { Text, TextProps, View, ViewProps, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TextStyleProvider } from '../ui/text';

function Card({
  style,
  ...props
}: ViewProps & {
  ref?: React.RefObject<View>;
}) {
  const { colors } = useTheme();
  return (
    <View
      style={StyleSheet.flatten([
        styles.card,
        { backgroundColor: colors.background, borderColor: colors.border },
        style,
      ])}
      {...props}
    />
  );
}

function CardHeader({
  style,
  ...props
}: ViewProps & {
  ref?: React.RefObject<View>;
}) {
  return <View style={StyleSheet.flatten([styles.header, style])} {...props} />;
}

function CardTitle({
  style,
  ...props
}: TextProps & {
  ref?: React.RefObject<Text>;
}) {
  const { colors } = useTheme();
  return (
    <Text
      role="heading"
      aria-level={3}
      style={StyleSheet.flatten([styles.title, { color: colors.text }, style])}
      {...props}
    />
  );
}

function CardDescription({
  style,
  ...props
}: TextProps & {
  ref?: React.RefObject<Text>;
}) {
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

function CardContent({
  style,
  ...props
}: ViewProps & {
  ref?: React.RefObject<View>;
}) {
  const { colors } = useTheme();
  return (
    <TextStyleProvider style={{ color: colors.text }}>
      <View style={StyleSheet.flatten([styles.content, style])} {...props} />
    </TextStyleProvider>
  );
}

function CardFooter({
  style,
  ...props
}: ViewProps & {
  ref?: React.RefObject<View>;
}) {
  return <View style={StyleSheet.flatten([styles.footer, style])} {...props} />;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'column',
    gap: 6,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.025,
  },
  description: {
    fontSize: 14,
  },
  content: {
    padding: 24,
    paddingTop: 0,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    paddingTop: 0,
  },
});

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
