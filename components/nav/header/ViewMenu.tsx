import React, { FunctionComponent } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../../ui/navigation-menu';
import { Text } from '../../ui/text';
import { View } from 'react-native';
import type { ViewRef } from '@rn-primitives/types';
import { cn } from '../../../lib/utils';
import { ViewIcon } from '../../../lib/icons/ViewIcon';
import { useValidView } from '../useValidView';
import { ResourceViewConfig } from '../../../components/ResourceView';

export const ViewMenu: FunctionComponent = () => {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  const { validViews } = useValidView();

  const [isOpen, setIsOpen] = React.useState<string>();

  return (
    <NavigationMenu value={isOpen} onValueChange={setIsOpen}>
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
              {validViews.map((menuItem) => (
                <ListItem key={menuItem.name} viewConfig={menuItem}>
                  {menuItem.displayName}
                </ListItem>
              ))}
            </View>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  ViewRef,
  React.ComponentPropsWithoutRef<typeof View> & {
    viewConfig: ResourceViewConfig;
  }
>(({ className, viewConfig, ...props }, ref) => {
  // TODO: add navigationn to `href` on `NavigationMenuLink` onPress
  const { curViewConfig, setCurViewConfig } = useValidView();
  const Icon = viewConfig.displayIcon;
  return (
    <View role="listitem">
      <NavigationMenuLink
        ref={ref}
        className={cn(
          'web:select-none flex-row items-center overflow-hidden rounded-md p-3 leading-none no-underline text-foreground web:outline-none web:transition-colors web:hover:bg-accent active:bg-accent web:hover:text-accent-foreground web:focus:bg-accent web:focus:text-accent-foreground cursor-pointer',
          className,
          curViewConfig.name === viewConfig.name ? 'bg-secondary' : '',
        )}
        onPress={() => setCurViewConfig(viewConfig)}
        {...props}
      >
        <Icon size={20} />
        <Text className="text-sm native:text-base font-medium text-foreground leading-none ml-2">
          {viewConfig.displayName}
        </Text>
      </NavigationMenuLink>
    </View>
  );
});
ListItem.displayName = 'ListItem';
