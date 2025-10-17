import React from 'react';
import { StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      <View style={styles.leftSection}>
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    gap: 16,
    flex: 1,
    alignItems: 'center',
  },
});
