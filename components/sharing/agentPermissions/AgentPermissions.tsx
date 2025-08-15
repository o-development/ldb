import React from 'react';
import { WacRule } from '@ldo/connected-solid';
import { FunctionComponent } from 'react';
import { AgentPermissionRow } from './AgentPermissionRow';
import { Text } from '../../ui/text';
import { Input } from '../../ui/input';

interface AgentPermissionsProps {
  value: WacRule['agent'];
  onChange: (newValue: WacRule['agent']) => void;
}

export const AgentPermissions: FunctionComponent<AgentPermissionsProps> = ({
  value,
  onChange,
}) => {
  return (
    <>
      <Text bold>Individual Agents</Text>
      <Input placeholder="Add Contact or WebId" />
      {Object.entries(value).map(([webId, accessModeList]) => (
        <AgentPermissionRow
          key={webId}
          webId={webId}
          value={accessModeList}
          onChange={(newAccessModeList) => {
            if (!newAccessModeList) {
              const newVal = { ...value };
              delete newVal[webId];
              onChange(newVal);
            } else {
              onChange({
                ...value,
                [webId]: newAccessModeList,
              });
            }
          }}
        />
      ))}
    </>
  );
};
