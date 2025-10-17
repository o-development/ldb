import React from 'react';
import { SolidProfile } from '../../.ldo/profile.typings';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Text } from '../ui/text';
import { User } from 'lucide-react-native';
import { FunctionComponent } from 'react';

interface ProfileAvatarProps {
  profile?: SolidProfile;
  style?: any;
}

export const ProfileAvatar: FunctionComponent<ProfileAvatarProps> = ({
  profile,
  style,
}) => (
  <Avatar alt={profile?.fn ? `${profile.fn}'s Avatar` : ''} style={style}>
    <AvatarImage source={{ uri: profile?.hasPhoto?.['@id'] }} />
    <AvatarFallback>
      <Text>
        <User />
      </Text>
    </AvatarFallback>
  </Avatar>
);
