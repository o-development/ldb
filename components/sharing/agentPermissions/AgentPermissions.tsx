import React, { useCallback } from 'react';
import { WacRule } from '@ldo/connected-solid';
import { FunctionComponent } from 'react';
import { AgentPermissionRow } from './AgentPermissionRow';
import { Text } from '../../ui/text';
import { AgentInput } from './AgentInput';

interface AgentPermissionsProps {
  value: WacRule['agent'];
  onChange: (newValue: WacRule['agent']) => void;
}

export const AgentPermissions: FunctionComponent<AgentPermissionsProps> = ({
  value,
  onChange,
}) => {
  const addAgent = useCallback(
    (webId: string) => {
      onChange({
        ...value,
        [webId]: { read: false, write: false, append: false, control: false },
      });
    },
    [value, onChange],
  );

  return (
    <>
      <Text bold>Individual Agents</Text>
      <AgentInput
        onAddAgent={addAgent}
        existingAgents={Object.keys(value)}
        className="z-[999]"
      />
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
