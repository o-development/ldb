import * as NavigationMenuPrimitive from '@rn-primitives/navigation-menu';
import * as React from 'react';
import { Platform, View, StyleSheet, Pressable } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';

function NavigationMenu({
  style,
  children,
  ...props
}: NavigationMenuPrimitive.RootProps & {
  ref?: React.RefObject<NavigationMenuPrimitive.RootRef>;
}) {
  return (
    <NavigationMenuPrimitive.Root
      style={StyleSheet.flatten([styles.navigationMenu, style])}
      {...props}
    >
      {children}
      {Platform.OS === 'web' && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({
  style,
  ...props
}: NavigationMenuPrimitive.ListProps & {
  ref?: React.RefObject<NavigationMenuPrimitive.ListRef>;
}) {
  return (
    <NavigationMenuPrimitive.List
      style={StyleSheet.flatten([styles.navigationMenuList, style])}
      {...props}
    />
  );
}

const NavigationMenuItem = NavigationMenuPrimitive.Item;

function NavigationMenuTrigger({
  style,
  children,
  ...props
}: Omit<NavigationMenuPrimitive.TriggerProps, 'children'> & {
  children?: React.ReactNode;
  ref?: React.RefObject<NavigationMenuPrimitive.TriggerRef>;
}) {
  const { colors } = useTheme();
  const { value } = NavigationMenuPrimitive.useRootContext();
  const { value: itemValue } = NavigationMenuPrimitive.useItemContext();

  const isActive = value === itemValue;

  return (
    <NavigationMenuPrimitive.Trigger asChild>
      <Pressable
        style={({ hovered }) => ({
          ...styles.trigger,
          backgroundColor: isActive
            ? colors.card
            : hovered
              ? colors.border
              : colors.background,
          ...(style as any),
        })}
        {...props}
      >
        {children}
        <View style={styles.chevronContainer}>
          <ChevronDown size={12} color={colors.text} aria-hidden={true} />
        </View>
      </Pressable>
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({
  style,
  children,
  portalHost,
  ...props
}: NavigationMenuPrimitive.ContentProps & {
  portalHost?: string;
  ref?: React.RefObject<NavigationMenuPrimitive.ContentRef>;
}) {
  const { colors } = useTheme();

  return (
    <NavigationMenuPrimitive.Portal hostName={portalHost}>
      <NavigationMenuPrimitive.Content
        style={StyleSheet.flatten([
          styles.content,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
          },
          style,
        ])}
        {...props}
      >
        <View>{children}</View>
      </NavigationMenuPrimitive.Content>
    </NavigationMenuPrimitive.Portal>
  );
}

const NavigationMenuLink = NavigationMenuPrimitive.Link;

function NavigationMenuViewport({
  style,
  ...props
}: NavigationMenuPrimitive.ViewportProps & {
  ref?: React.RefObject<NavigationMenuPrimitive.ViewportRef>;
}) {
  const { colors } = useTheme();

  return (
    <View style={styles.viewportContainer}>
      <View
        style={StyleSheet.flatten([
          styles.viewport,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
          },
          style,
        ])}
        {...props}
      >
        <NavigationMenuPrimitive.Viewport />
      </View>
    </View>
  );
}

function NavigationMenuIndicator({
  ref,
  style,
  ...props
}: NavigationMenuPrimitive.IndicatorProps & {
  ref?: React.RefObject<NavigationMenuPrimitive.IndicatorRef>;
}) {
  const { colors } = useTheme();

  return (
    <NavigationMenuPrimitive.Indicator
      ref={ref}
      style={StyleSheet.flatten([styles.indicator, style])}
      {...props}
    >
      <View
        style={StyleSheet.flatten([
          styles.indicatorArrow,
          { backgroundColor: colors.border },
        ])}
      />
    </NavigationMenuPrimitive.Indicator>
  );
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
};

const styles = StyleSheet.create({
  navigationMenu: {
    position: 'relative',
    zIndex: 10,
    flexDirection: 'row',
    maxWidth: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationMenuList: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    ...(Platform.OS === 'web' && {
      listStyle: 'none',
    }),
  },
  trigger: {
    flexDirection: 'row',
    height: Platform.OS === 'web' ? 40 : 48,
    paddingHorizontal: Platform.OS === 'web' ? 16 : 12,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    minWidth: 'auto',
    gap: 6,
  },
  chevronContainer: {
    // Container for chevron icon
  },
  content: {
    width: '100%',
    ...(Platform.OS !== 'web' && {
      borderWidth: 1,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      overflow: 'hidden',
    }),
  },
  viewportContainer: {
    ...(Platform.OS === 'web' && {
      position: 'fixed',
      right: 0,
      top: 48, // top-12 equivalent
      marginHorizontal: 8,
      flex: 1,
      justifyContent: 'center',
    }),
  },
  viewport: {
    ...(Platform.OS === 'web' && {
      position: 'relative',
      marginTop: 6,
      width: '100%',
      overflow: 'hidden',
      borderRadius: 6,
      borderWidth: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    }),
  },
  indicator: {
    position: 'absolute',
    top: '100%',
    zIndex: 1,
    flex: 1,
    height: 6,
    alignItems: 'flex-end',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  indicatorArrow: {
    position: 'relative',
    top: '60%',
    height: 8,
    width: 8,
    transform: [{ rotate: '45deg' }],
    borderTopLeftRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
});
