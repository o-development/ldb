import { useResource, useSolidAuth, useSubject } from '@ldo/solid-react';
import React from 'react';
import { FunctionComponent } from 'react';
import { View, StyleSheet } from 'react-native';
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
import { LogOut } from 'lucide-react-native';
import { useTargetResource } from '../../TargetResourceProvider';
import { ProfileAvatar } from '../../common/ProfileAvatar';
import { Icon } from '../../ui/icon';

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
        <Button key="setMemu" variant="ghost" style={styles.button}>
          <ProfileAvatar profile={profile} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent style={styles.dropdownContent}>
        <View style={styles.profileContainer}>
          <ProfileAvatar profile={profile} style={styles.profileAvatar} />
          <View style={styles.profileInfo}>
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
          <View style={styles.logoutText}>
            <Icon icon={LogOut} />
            <Text>Log Out</Text>
          </View>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
  },
  dropdownContent: {
    width: 256,
    marginRight: 8,
    marginTop: 8,
  },
  profileContainer: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 8,
    gap: 8,
  },
  logoutText: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
});
