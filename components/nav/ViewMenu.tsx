import React, { FunctionComponent } from 'react';
import { Code } from '~/lib/icons/Code';
import { Folders } from '~/lib/icons/Folders';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '~/components/ui/navigation-menu';
import { Text } from '../ui/text';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import type { ViewRef } from '@rn-primitives/types';
import { cn } from '~/lib/utils';
import { ViewIcon } from '~/lib/icons/ViewIcon';

const menuItems = [
  {
    icon: Code,
    title: 'Container',
    description:
      'The Container Navigator displays all the contents of a container.',
  },
  {
    icon: Folders,
    title: 'Raw Code',
    description:
      '<ADVANCED> The Raw Code viewer lets you see and modify the raw underlying document.',
  },
];

export const ViewMenu: FunctionComponent = () => {
  const insets = useSafeAreaInsets();
  console.log(insets);
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  const [value, setValue] = React.useState<string>();

  return (
    <>
      {Platform.OS !== 'web' && !!value && (
        <Pressable
          onPress={() => {
            setValue('');
          }}
          style={StyleSheet.absoluteFill}
        />
      )}
      <NavigationMenu value={value} onValueChange={setValue}>
        <NavigationMenuList>
          <NavigationMenuItem value="components">
            <NavigationMenuTrigger>
              <ViewIcon />
              <Text className="text-foreground">Views</Text>
            </NavigationMenuTrigger>
            <NavigationMenuContent insets={contentInsets}>
              <View
                role="list"
                className="web:grid w-[400px] gap-3 p-4 md:w-[500px] web:md:grid-cols-2 lg:w-[600px] "
              >
                {menuItems.map((menuItem) => (
                  <ListItem
                    key={menuItem.title}
                    title={menuItem.title}
                    href="/"
                  >
                    {menuItem.description}
                  </ListItem>
                ))}
              </View>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

const ListItem = React.forwardRef<
  ViewRef,
  React.ComponentPropsWithoutRef<typeof View> & { title: string; href: string }
>(({ className, title, children, ...props }, ref) => {
  // TODO: add navigationn to `href` on `NavigationMenuLink` onPress
  return (
    <View role="listitem">
      <NavigationMenuLink
        ref={ref}
        className={cn(
          'web:block web:select-none gap-1 rounded-md p-3 leading-none no-underline text-foreground web:outline-none web:transition-colors web:hover:bg-accent active:bg-accent web:hover:text-accent-foreground web:focus:bg-accent web:focus:text-accent-foreground',
          className,
        )}
        {...props}
      >
        <Text className="text-sm native:text-base font-medium text-foreground leading-none">
          {title}
        </Text>
        <Text className="line-clamp-2 text-sm native:text-base leading-snug text-muted-foreground">
          {children}
        </Text>
      </NavigationMenuLink>
    </View>
  );
});
ListItem.displayName = 'ListItem';
