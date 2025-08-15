import { SolidProfileShapeShapeType } from '.ldo/profile.shapeTypes';
import { useResource, useSubject } from '@ldo/solid-react';
import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { ProfileAvatar } from 'components/common/ProfileAvatar';
import { Text } from '../../ui/text';

interface AgentInformationProps {
  webId: string;
}

export const AgentInformation: FunctionComponent<AgentInformationProps> = ({
  webId,
}) => {
  useResource(webId);
  const agentProfile = useSubject(SolidProfileShapeShapeType, webId);

  return (
    <View className="flex-row gap-4 flex-1">
      <ProfileAvatar profile={agentProfile} />
      <View className="flex-1">
        <Text>{agentProfile.fn ?? agentProfile.name ?? 'Unnamed Agent'}</Text>
        <Text size="xs" muted>
          {webId}
        </Text>
      </View>
    </View>
  );
};
