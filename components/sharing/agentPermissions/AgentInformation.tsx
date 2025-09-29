import { SolidProfileShapeType } from '../../../.ldo/profile.shapeTypes';
import { useResource, useSolidAuth, useSubject } from '@ldo/solid-react';
import React, { FunctionComponent, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
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
  const agentProfile = useSubject(SolidProfileShapeType, webId);

  return (
    <View style={styles.container}>
      <ProfileAvatar profile={agentProfile} />
      <View style={styles.textContainer}>
        <Text>
          {agentProfile['@id'] === session.webId
            ? 'You'
            : (agentProfile.fn ?? agentProfile.name ?? 'Unnamed Agent')}
        </Text>
        <Text size="xs" muted>
          {webId}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
    flex: 1,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
});
