import { ScrollView, View, StyleSheet } from 'react-native';
import { Text } from '../../components/ui/text';
import React, { FunctionComponent } from 'react';
import { Input } from '../../components/ui/input';
import { Separator } from '../../components/ui/separator';
import { ProfileKnows } from './ProfileKnows';
import { useViewContext } from '../../components/useViewContext';
import { SolidProfileShapeType } from '../../.ldo/profile.shapeTypes';
import { useChangeSubject, useResource } from '@ldo/solid-react';
import { Button } from '../../components/ui/button';
import { SolidLeaf } from '@ldo/connected-solid';

export const ProfileView: FunctionComponent = () => {
  const { targetUri } = useViewContext();

  const profileResource = useResource(targetUri);
  const [profile, setProfile, commitProfile, transactionDataset] =
    useChangeSubject(SolidProfileShapeType, targetUri);

  if (
    !targetUri ||
    !profileResource ||
    !profile ||
    profileResource.type === 'InvalidIdentifierResource'
  )
    return <></>;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
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
          style={styles.updateButton}
          onPress={commitProfile}
          isLoading={profileResource.isLoading()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 24,
  },
  container: {
    maxWidth: 560,
    flex: 1,
    padding: 24,
    gap: 20,
  },
  updateButton: {
    alignSelf: 'flex-end',
    minWidth: 140,
  },
});
