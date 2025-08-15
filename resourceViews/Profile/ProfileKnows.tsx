import { Input } from '../../components/ui/input';
import React, { FunctionComponent } from 'react';
import { Plus } from '../../lib/icons/Plus';
import { View } from 'lucide-react-native';
import { SolidProfileShape } from '.ldo/profile.typings';
import { AgentInformation } from '../../components/sharing/agentPermissions/AgentInformation';
import { Text } from 'react-native';

export interface ProfileKnowsProps {
  profile: SolidProfileShape;
  onChangeProfile: (newProfile: SolidProfileShape) => void;
}

export const ProfileKnows: FunctionComponent<ProfileKnowsProps> = ({
  profile,
  onChangeProfile,
}) => {
  console.log(profile.knows?.size);
  return (
    <View className="gap-4">
      <Input
        placeholder="https://example.pod/john/profile/card#me"
        label="New Contact WebId"
        buttonRight={{
          iconLeft: <Plus />,
        }}
      />
      {/* {profile.knows?.map((friend) => (
        <AgentInformation webId={friend['@id']} />
      ))} */}
    </View>
  );
};
