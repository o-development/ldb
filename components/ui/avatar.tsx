import { useTheme } from '@react-navigation/native';
import * as AvatarPrimitive from '@rn-primitives/avatar';
import * as React from 'react';
import { StyleSheet } from 'react-native';

function Avatar({
  style,
  ...props
}: AvatarPrimitive.RootProps & {
  ref?: React.RefObject<AvatarPrimitive.RootRef>;
}) {
  return (
    <AvatarPrimitive.Root
      style={StyleSheet.flatten([styles.avatar, style])}
      {...props}
    />
  );
}

function AvatarImage({
  style,
  ...props
}: AvatarPrimitive.ImageProps & {
  ref?: React.RefObject<AvatarPrimitive.ImageRef>;
}) {
  return (
    <AvatarPrimitive.Image
      style={StyleSheet.flatten([styles.image, style])}
      {...props}
    />
  );
}

function AvatarFallback({
  style,
  ...props
}: AvatarPrimitive.FallbackProps & {
  ref?: React.RefObject<AvatarPrimitive.FallbackRef>;
}) {
  const { colors } = useTheme();
  return (
    <AvatarPrimitive.Fallback
      style={StyleSheet.flatten([
        styles.fallback,
        { backgroundColor: colors.border },
        style,
      ])}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  avatar: {
    position: 'relative',
    flexDirection: 'row',
    height: 40,
    width: 40,
    flexShrink: 0,
    overflow: 'hidden',
    borderRadius: 20,
  },
  image: {
    aspectRatio: 1,
    height: '100%',
    width: '100%',
  },
  fallback: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});

export { Avatar, AvatarFallback, AvatarImage };
