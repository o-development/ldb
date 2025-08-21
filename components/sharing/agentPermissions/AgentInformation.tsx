import { SolidProfileShapeShapeType } from '../../../.ldo/profile.shapeTypes';
import { useResource, useSolidAuth, useSubject } from '@ldo/solid-react';
import React, { FunctionComponent, ReactNode } from 'react';
import { View } from 'react-native';
import { ProfileAvatar } from '../../common/ProfileAvatar';
import { Text } from '../../ui/text';

interface AgentInformationProps {
  webId: string;
  accessoryRight?: ReactNode;
}

export const AgentInformation: FunctionComponent<AgentInformationProps> = ({
  webId,
  accessoryRight,
}) => {
  const { session } = useSolidAuth();
  useResource(webId);
  const agentProfile = useSubject(SolidProfileShapeShapeType, webId);

  return (
    <View className="flex-row gap-4 flex-1 items-center">
      <ProfileAvatar profile={agentProfile} />
      <View className="flex-1">
        <Text>
          {agentProfile['@id'] === session.webId
            ? 'You'
            : (agentProfile.fn ?? agentProfile.name ?? 'Unnamed Agent')}
        </Text>
        <Text size="xs" muted>
          {webId}
        </Text>
      </View>
      {accessoryRight && <View>{accessoryRight}</View>}
    </View>
  );
};
