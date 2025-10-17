import React from 'react';
import { StyleSheet } from 'react-native';
import { Separator } from '../ui/separator';
import { FunctionComponent } from 'react';
import { AgentPermissions } from './agentPermissions/AgentPermissions';
import { WacRule } from '@ldo/connected-solid';
import { View } from 'react-native';
import { PermissionRow } from './PermissionRow';
import { Users } from 'lucide-react-native';
import { Fingerprint } from 'lucide-react-native';

interface WacRuleFormProps {
  value: WacRule;
  onChange: (newWacRule: WacRule) => void;
}

export const WacRuleForm: FunctionComponent<WacRuleFormProps> = ({
  value,
  onChange,
}) => {
  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginTop: 8,
    marginBottom: 8,
  },
});
