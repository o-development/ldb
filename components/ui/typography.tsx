import * as Slot from '@rn-primitives/slot';
import * as React from 'react';
import { Platform, Text as RNText, StyleSheet } from 'react-native';

type TypographyProps = React.ComponentProps<typeof RNText> & {
  ref?: React.RefObject<RNText>;
  asChild?: boolean;
};

function H1({ style, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      role="heading"
      aria-level="1"
      style={StyleSheet.flatten([styles.h1, style])}
      {...props}
    />
  );
}

function H2({ style, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      role="heading"
      aria-level="2"
      style={StyleSheet.flatten([styles.h2, style])}
      {...props}
    />
  );
}

function H3({ style, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      role="heading"
      aria-level="3"
      style={StyleSheet.flatten([styles.h3, style])}
      {...props}
    />
  );
}

function H4({ style, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      role="heading"
      aria-level="4"
      style={StyleSheet.flatten([styles.h4, style])}
      {...props}
    />
  );
}

function P({ style, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return <Component style={StyleSheet.flatten([styles.p, style])} {...props} />;
}

function BlockQuote({ style, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      // @ts-ignore - role of blockquote renders blockquote element on the web
      role={Platform.OS === 'web' ? 'blockquote' : undefined}
      style={StyleSheet.flatten([styles.blockquote, style])}
      {...props}
    />
  );
}

function Code({ style, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      // @ts-ignore - role of code renders code element on the web
      role={Platform.OS === 'web' ? 'code' : undefined}
      style={StyleSheet.flatten([styles.code, style])}
      {...props}
    />
  );
}

function Lead({ style, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component style={StyleSheet.flatten([styles.lead, style])} {...props} />
  );
}

function Large({ style, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component style={StyleSheet.flatten([styles.large, style])} {...props} />
  );
}

function Small({ style, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component style={StyleSheet.flatten([styles.small, style])} {...props} />
  );
}

function Muted({ style, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component style={StyleSheet.flatten([styles.muted, style])} {...props} />
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 36,
    color: 'hsl(var(--foreground))',
    fontWeight: '800',
    letterSpacing: -0.025,
  },
  h2: {
    fontSize: 30,
    color: 'hsl(var(--foreground))',
    fontWeight: '600',
    letterSpacing: -0.025,
    borderBottomWidth: 1,
    borderBottomColor: 'hsl(var(--border))',
    paddingBottom: 8,
  },
  h3: {
    fontSize: 24,
    color: 'hsl(var(--foreground))',
    fontWeight: '600',
    letterSpacing: -0.025,
  },
  h4: {
    fontSize: 20,
    color: 'hsl(var(--foreground))',
    fontWeight: '600',
    letterSpacing: -0.025,
  },
  p: {
    fontSize: 16,
    color: 'hsl(var(--foreground))',
  },
  blockquote: {
    marginTop: 24,
    borderLeftWidth: 2,
    borderLeftColor: 'hsl(var(--border))',
    paddingLeft: 24,
    fontSize: 16,
    color: 'hsl(var(--foreground))',
    fontStyle: 'italic',
  },
  code: {
    borderRadius: 6,
    backgroundColor: 'hsl(var(--muted))',
    paddingHorizontal: 4.8,
    paddingVertical: 3.2,
    fontSize: 14,
    color: 'hsl(var(--foreground))',
    fontWeight: '600',
  },
  lead: {
    fontSize: 20,
    color: 'hsl(var(--muted-foreground))',
  },
  large: {
    fontSize: 20,
    color: 'hsl(var(--foreground))',
    fontWeight: '600',
  },
  small: {
    fontSize: 14,
    color: 'hsl(var(--foreground))',
    fontWeight: '500',
    lineHeight: 14,
  },
  muted: {
    fontSize: 14,
    color: 'hsl(var(--muted-foreground))',
  },
});

export { BlockQuote, Code, H1, H2, H3, H4, Large, Lead, Muted, P, Small };
