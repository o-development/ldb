import React, { FunctionComponent } from 'react';
import { Code } from '~/lib/icons/Code';
import { Folders } from '~/lib/icons/Folders';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '~/components/ui/navigation-menu';
import { Text } from '../ui/text';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import type { ViewRef } from '@rn-primitives/types';
import { cn } from '~/lib/utils';
import { ViewIcon } from '~/lib/icons/ViewIcon';
import { LucideIcon } from 'lucide-react-native';

const menuItems = [
  {
    icon: Folders,
    title: 'Container',
    description:
      'The Container Navigator displays all the contents of a container.',
  },
  {
    icon: Code,
    title: 'Raw Code',
    description:
      '<ADVANCED> The Raw Code viewer lets you see and modify the raw underlying document.',
  },
];

export const ViewMenu: FunctionComponent = () => {
  const insets = useSafeAreaInsets();
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
          <NavigationMenuItem value="views">
            <NavigationMenuTrigger>
              <Text>
                <ViewIcon />
              </Text>
              <Text className="sm:block hidden">Views</Text>
            </NavigationMenuTrigger>
            <NavigationMenuContent insets={contentInsets}>
              <View
                role="list"
                className="web:grid w-dvw gap-3 p-4 md:w-[500px] web:md:grid-cols-2 lg:w-[600px] "
              >
                {menuItems.map((menuItem) => (
                  <ListItem
                    key={menuItem.title}
                    title={menuItem.title}
                    icon={menuItem.icon}
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
  React.ComponentPropsWithoutRef<typeof View> & {
    title: string;
    icon: LucideIcon;
  }
>(({ className, title, icon, ...props }, ref) => {
  // TODO: add navigationn to `href` on `NavigationMenuLink` onPress
  const Icon = icon;
  return (
    <View role="listitem">
      <View
        ref={ref}
        className={cn(
          'web:select-none flex-row items-center overflow-hidden rounded-md p-3 leading-none no-underline text-foreground web:outline-none web:transition-colors web:hover:bg-accent active:bg-accent web:hover:text-accent-foreground web:focus:bg-accent web:focus:text-accent-foreground cursor-pointer',
          className,
        )}
        {...props}
      >
        <Icon size={20} />
        <Text className="text-sm native:text-base font-medium text-foreground leading-none ml-2">
          {title}
        </Text>
      </View>
    </View>
  );
});
ListItem.displayName = 'ListItem';
