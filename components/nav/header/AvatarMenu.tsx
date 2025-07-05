import {
  useLdo,
  useResource,
  useSolidAuth,
  useSubject,
} from '@ldo/solid-react';
import React from 'react';
import { FunctionComponent } from 'react';
import { View } from 'react-native';
import { SolidProfileShapeShapeType } from '../../../.ldo/profile.shapeTypes';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Text } from '../../ui/text';
import { Button } from '../../ui/button';
import { ThemeToggleMenu } from './ThemeToggleMenu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { User } from '../../../lib/icons/User';
import { LogOut } from '../../../lib/icons/LogOut';
import { useTargetResource } from '../../TargetResourceProvider';

export const AvatarMenu: FunctionComponent = () => {
  const { dataset } = useLdo();
  const { session, logout } = useSolidAuth();
  // TODO: Use WebId Resource to render a skeleton loader
  const webIdResource = useResource(session.webId);
  const profile = useSubject(SolidProfileShapeShapeType, session.webId);
  const { navigateTo } = useTargetResource();

  if (!session.webId) return <></>;

  console.log(profile?.['@id']);
  console.log(profile?.hasPhoto?.['@id']);
  console.log(webIdResource?.isLoading());
  console.log(dataset.toString());

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button key="setMemu" variant="ghost" className="w-10">
          <Avatar alt={profile?.fn ? `${profile.fn}'s Avatar` : ''}>
            <AvatarImage source={{ uri: profile?.hasPhoto?.['@id'] }} />
            <AvatarFallback>
              <Text>
                <User />
              </Text>
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 native:w-72 mr-2 mt-2">
        <View className="p-2 flex-row items-center">
          <Avatar
            alt={profile?.fn ? `${profile.fn}'s Avatar` : ''}
            className="w-20 h-20"
          >
            <AvatarImage source={{ uri: profile?.hasPhoto?.['@id'] }} />
            <AvatarFallback>
              <Text>
                <User />
              </Text>
            </AvatarFallback>
          </Avatar>
          <View className="ml-2">
            <Text>{profile?.fn || ''}</Text>
            <Button size="sm" onPress={() => navigateTo(session.webId ?? '')}>
              <Text>Edit your profile</Text>
            </Button>
          </View>
        </View>
        <DropdownMenuSeparator />
        <ThemeToggleMenu />
        <DropdownMenuSeparator />
        <DropdownMenuItem onPress={logout}>
          <Text className="flex flex-row gap-1 items-center">
            <LogOut /> Log Out
          </Text>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
