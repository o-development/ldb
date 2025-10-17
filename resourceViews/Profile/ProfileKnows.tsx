import { Input } from '../../components/ui/input';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { Plus } from 'lucide-react-native';
import { SolidProfile } from '../../.ldo/profile.typings';
import { AgentInformation } from '../../components/sharing/agentPermissions/AgentInformation';
import { View, StyleSheet } from 'react-native';
import { useChangeSetData } from '@ldo/react';
import { SolidLeaf } from '@ldo/connected-solid';
import { Button } from '../../components/ui/button';
import { Trash } from 'lucide-react-native';
import { ConnectedPlugin } from '@ldo/connected';

export interface ProfileKnowsProps {
  resource: SolidLeaf;
  profile: SolidProfile;
  setProfile: useChangeSetData<
    SolidProfile,
    ConnectedPlugin<any, any, any, any, any>[]
  >;
}

export const ProfileKnows: FunctionComponent<ProfileKnowsProps> = ({
  resource,
  profile,
  setProfile,
}) => {
  const [newContact, setNewContact] = useState('');
  const addNewContact = useCallback(() => {
    setProfile(resource, (cProfile) => {
      cProfile.knows?.add({ '@id': newContact });
    });
    setNewContact('');
  }, [newContact, resource, setProfile]);

  return (
    <View style={styles.container}>
      <Input
        placeholder="https://example.pod/john/profile/card#me"
        label="New Contact WebId"
        buttonRight={{
          iconRight: Plus,
          onPress: addNewContact,
          variant: 'secondary',
        }}
        value={newContact}
        onChangeText={setNewContact}
        onSubmitEditing={addNewContact}
      />
      {profile.knows?.map((friend) => (
        <AgentInformation
          key={friend['@id']}
          webId={friend['@id']}
          accessoryRight={
            <Button
              variant="ghost"
              iconRight={Trash}
              onPress={() => {
                setProfile(resource, (cProfile) => {
                  cProfile.knows?.delete(friend);
                });
              }}
            />
          }
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16, // gap-4 equivalent (4 * 4px = 16px)
  },
});
