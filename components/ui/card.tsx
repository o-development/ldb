import * as React from 'react';
import { Text, TextProps, View, ViewProps, StyleSheet } from 'react-native';
import { TextStyleContext } from '../ui/text';

function Card({
  style,
  ...props
}: ViewProps & {
  ref?: React.RefObject<View>;
}) {
  return <View style={StyleSheet.flatten([styles.card, style])} {...props} />;
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
  return (
    <Text
      role="heading"
      aria-level={3}
      style={StyleSheet.flatten([styles.title, style])}
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
  return (
    <Text style={StyleSheet.flatten([styles.description, style])} {...props} />
  );
}

function CardContent({
  style,
  ...props
}: ViewProps & {
  ref?: React.RefObject<View>;
}) {
  return (
    <TextStyleContext.Provider
      value={{ style: { color: 'hsl(var(--card-foreground))' } }}
    >
      <View style={StyleSheet.flatten([styles.content, style])} {...props} />
    </TextStyleContext.Provider>
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
    backgroundColor: 'hsl(var(--card))',
    borderColor: 'hsl(var(--border))',
  },
  header: {
    flexDirection: 'column',
    gap: 6,
    padding: 24,
  },
  title: {
    fontSize: 24,
    color: 'hsl(var(--card-foreground))',
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.025,
  },
  description: {
    fontSize: 14,
    color: 'hsl(var(--muted-foreground))',
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
