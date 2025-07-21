import React from 'react';
import { AccessModeList } from '@ldo/connected-solid';
import { Text } from '../../ui/text';
import { FunctionComponent } from 'react';
import { AgentInformation } from './AgentInformation';
import { AccessDropdown } from '../AccessDropdown';
import { View } from 'react-native';
import { Button } from '../../ui/button';
import { Trash } from '../../../lib/icons/Trash';

interface AgentPermissionRowProps {
  webId: string;
  value: AccessModeList;
  onChange: (newValue: AccessModeList | undefined) => void;
}

export const AgentPermissionRow: FunctionComponent<AgentPermissionRowProps> = ({
  webId,
  value,
  onChange,
}) => {
  return (
    <View className="flex-row justify-between align-center">
      <AgentInformation webId={webId} />
      <View className="flex-row">
        <Button
          variant="ghost"
          onPress={() => onChange(undefined)}
          className="w-10"
        >
          <Text>
            <Trash size={14} />
          </Text>
        </Button>
        <AccessDropdown value={value} onChange={onChange} />
      </View>
    </View>
  );
};
