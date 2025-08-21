import { ScrollView, View } from 'react-native';
import { Text } from '../../components/ui/text';
import React, { FunctionComponent } from 'react';
import { Input } from '../../components/ui/input';
import { Separator } from '../../components/ui/separator';
import { ProfileKnows } from './ProfileKnows';
import { useViewContext } from '../../components/useViewContext';
import { SolidProfileShapeShapeType } from '.ldo/profile.shapeTypes';
import { useChangeSubject, useResource } from '@ldo/solid-react';
import { Button } from '../../components/ui/button';
import { SolidLeaf } from '@ldo/connected-solid';

export const ProfileView: FunctionComponent = () => {
  const { targetUri } = useViewContext();

  const profileResource = useResource(targetUri);
  const [profile, setProfile, commitProfile, transactionDataset] =
    useChangeSubject(SolidProfileShapeShapeType, targetUri);

  if (
    !targetUri ||
    !profileResource ||
    !profile ||
    profileResource.type === 'InvalidIdentifierResource'
  )
    return <></>;

  return (
    <ScrollView contentContainerClassName="flex-row justify-center p-4">
      <View className="max-w-[600px] flex-1 padding gap-4">
        <Text variant="h1">Profile</Text>
        <Input
          placeholder="John Doe"
          label="Name"
          value={profile?.fn}
          onChangeText={(text) => {
            setProfile(profileResource, (cProfile) => {
              cProfile!.fn = text;
            });
          }}
        />
        <Separator />
        <Text variant="h2">Contacts</Text>
        <ProfileKnows
          profile={profile}
          setProfile={setProfile}
          resource={profileResource as SolidLeaf}
        />
        <Button
          disabled={!transactionDataset.hasChanges()}
          text="Update Profile"
          className="self-end"
          onPress={commitProfile}
          isLoading={profileResource.isLoading()}
        />
      </View>
    </ScrollView>
  );
};
