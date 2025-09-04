import { useResource, useSolidAuth, useSubject } from '@ldo/solid-react';
import React from 'react';
import { FunctionComponent } from 'react';
import { View } from 'react-native';
import { SolidProfileShapeType } from '../../../.ldo/profile.shapeTypes';
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
import { LogOut } from '../../../lib/icons/LogOut';
import { useTargetResource } from '../../TargetResourceProvider';
import { ProfileAvatar } from '../../common/ProfileAvatar';

export const AvatarMenu: FunctionComponent = () => {
  const { session, logout } = useSolidAuth();
  // TODO: Use WebId Resource to render a skeleton loader
  const webIdResource = useResource(session.webId);
  const profile = useSubject(SolidProfileShapeType, session.webId);
  const { navigateTo } = useTargetResource();

  if (!session.webId) return <></>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button key="setMemu" variant="ghost" className="w-10">
          <ProfileAvatar profile={profile} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 native:w-72 mr-2 mt-2">
        <View className="p-2 flex-row items-center">
          <ProfileAvatar profile={profile} className="w-20 h-20" />
          <View className="ml-2">
            <Text>{profile?.fn || ''}</Text>
            <Button
              size="sm"
              onPress={() => navigateTo(session.webId ?? '')}
              text="Edit your profile"
            />
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
