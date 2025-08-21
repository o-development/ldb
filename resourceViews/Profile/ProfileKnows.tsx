import { Input } from '../../components/ui/input';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { Plus } from '../../lib/icons/Plus';
import { SolidProfileShape } from '../../.ldo/profile.typings';
import { AgentInformation } from '../../components/sharing/agentPermissions/AgentInformation';
import { View } from 'react-native';
import { useChangeSetData } from '@ldo/react';
import { SolidLeaf } from '@ldo/connected-solid';
import { Button } from '../../components/ui/button';
import { Trash } from '../../lib/icons/Trash';

export interface ProfileKnowsProps {
  resource: SolidLeaf;
  profile: SolidProfileShape;
  setProfile: useChangeSetData<SolidProfileShape, any>;
}

export const ProfileKnows: FunctionComponent<ProfileKnowsProps> = ({
  resource,
  profile,
  setProfile,
}) => {
  console.log(profile.knows?.size);

  const [newContact, setNewContact] = useState('');
  const addNewContact = useCallback(() => {
    setProfile(resource, (cProfile) => {
      cProfile.knows?.add({ '@id': newContact });
    });
    setNewContact('');
  }, [newContact, resource, setProfile]);

  return (
    <View className="gap-4">
      <Input
        placeholder="https://example.pod/john/profile/card#me"
        label="New Contact WebId"
        buttonRight={{
          iconRight: <Plus />,
          onPress: addNewContact,
          variant: 'secondary',
        }}
        value={newContact}
        onChangeText={setNewContact}
        onSubmitEditing={addNewContact}
      />
      {profile.knows?.map((friend) => (
        <AgentInformation
          webId={friend['@id']}
          accessoryRight={
            <Button
              variant="ghost"
              iconRight={<Trash />}
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
