import React from 'react';
import { StyleSheet } from 'react-native';
import { AccessModeList } from '@ldo/connected-solid';
import { FunctionComponent } from 'react';
import { AgentInformation } from './AgentInformation';
import { AccessDropdown } from '../AccessDropdown';
import { View } from 'react-native';
import { Button } from '../../ui/button';
import { Trash } from 'lucide-react-native';

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
    <View style={styles.container}>
      <AgentInformation webId={webId} />
      <View style={styles.rightSection}>
        <Button
          variant="ghost"
          onPress={() => onChange(undefined)}
          style={styles.deleteButton}
          iconLeft={Trash}
          textStyle={styles.deleteButtonText}
        />
        <AccessDropdown value={value} onChange={onChange} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightSection: {
    flexDirection: 'row',
  },
  deleteButton: {
    width: 40,
  },
  deleteButtonText: {
    fontSize: 14,
  },
});
