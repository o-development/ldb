import React from 'react';
import { AccessModeList } from '@ldo/connected-solid';
import { Text } from '../ui/text';
import { FunctionComponent } from 'react';
import { AccessDropdown } from './AccessDropdown';
import { View } from 'react-native';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { LucideIcon } from 'lucide-react-native';

interface PermissionRowProps {
  Icon: LucideIcon;
  displayName: string;
  value: AccessModeList;
  onChange: (newValue: AccessModeList) => void;
}

export const PermissionRow: FunctionComponent<PermissionRowProps> = ({
  Icon,
  displayName,
  value,
  onChange,
}) => {
  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-row gap-4 flex-1 items-center">
        <Avatar alt={displayName}>
          <AvatarFallback>
            <Text>
              <Icon />
            </Text>
          </AvatarFallback>
        </Avatar>
        <Text bold>{displayName}</Text>
      </View>
      <AccessDropdown value={value} onChange={onChange} />
    </View>
  );
};
