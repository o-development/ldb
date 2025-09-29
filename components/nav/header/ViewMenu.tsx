import React, { FunctionComponent } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { Text } from '../../ui/text';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { ViewIcon } from 'lucide-react-native';
import { useViewContext } from '../../useViewContext';
import { ResourceViewConfig } from '../../../components/ResourceView';
import { useTheme } from '@react-navigation/native';
import { Icon } from '../../ui/icon';
import { Button } from '../../ui/button';

export const ViewMenu: FunctionComponent = () => {
  const { validViews } = useViewContext();
  const { width } = useWindowDimensions();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          iconLeft={ViewIcon}
          text={width < 640 ? undefined : 'Views'}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        style={StyleSheet.flatten([styles.contentContainer])}
      >
        {validViews.map((menuItem) => (
          <ListItem key={menuItem.name} viewConfig={menuItem}>
            {menuItem.displayName}
          </ListItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ListItem: React.FC<{
  viewConfig: ResourceViewConfig;
  children: React.ReactNode;
}> = ({ viewConfig, children }) => {
  const { curViewConfig, setCurViewConfig } = useViewContext();
  const { colors } = useTheme();
  const DisplayIcon = viewConfig.displayIcon;

  const isSelected = curViewConfig.name === viewConfig.name;

  return (
    <DropdownMenuItem
      style={StyleSheet.flatten([
        styles.listItem,
        isSelected && {
          backgroundColor: colors.border,
        },
      ])}
      onPress={() => setCurViewConfig(viewConfig)}
    >
      <Icon icon={DisplayIcon} />
      <Text>{children}</Text>
    </DropdownMenuItem>
  );
};
ListItem.displayName = 'ListItem';

const styles = StyleSheet.create({
  triggerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
  },
  contentContainer: {
    gap: 4,
    padding: 4,
    flexDirection: 'column' as const,
    minWidth: 200,
  },
  listItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    overflow: 'hidden' as const,
    borderRadius: 2,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  iconStyle: {
    fontSize: 20,
  },
});
