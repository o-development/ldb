import React from 'react';
import { Separator } from '../ui/separator';
import { FunctionComponent } from 'react';
import { AgentPermissions } from './agentPermissions/AgentPermissions';
import { WacRule } from '@ldo/connected-solid';
import { View } from 'react-native';
import { PermissionRow } from './PermissionRow';
import { Users } from '../../lib/icons/Users';
import { Fingerprint } from '../../lib/icons/Fingerprint';

interface WacRuleFormProps {
  value: WacRule;
  onChange: (newWacRule: WacRule) => void;
}

export const WacRuleForm: FunctionComponent<WacRuleFormProps> = ({
  value,
  onChange,
}) => {
  return (
    <View className="gap-4 mt-2 mb-2">
      <PermissionRow
        displayName="Public Access"
        Icon={Users}
        value={value.public}
        onChange={(newRule) => onChange({ ...value, public: newRule })}
      />
      <Separator />
      <PermissionRow
        displayName="Authenticated Agents"
        Icon={Fingerprint}
        value={value.authenticated}
        onChange={(newRule) => onChange({ ...value, authenticated: newRule })}
      />
      <Separator />
      <AgentPermissions
        value={value.agent}
        onChange={(newAgentRules) =>
          onChange({ ...value, agent: newAgentRules })
        }
      />
    </View>
  );
};
