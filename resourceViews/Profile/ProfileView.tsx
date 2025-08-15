import { ScrollView, View } from 'react-native';
import { Text } from '../../components/ui/text';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Input } from '../../components/ui/input';
import { Separator } from '../../components/ui/separator';
import { ProfileKnows } from './ProfileKnows';
import { useViewContext } from 'components/useViewContext';
import { SolidProfileShapeShapeType } from '.ldo/profile.shapeTypes';
import { useSubject } from '@ldo/solid-react';

export const ProfileView: FunctionComponent = () => {
  const { targetUri } = useViewContext();

  const profile = useSubject(SolidProfileShapeShapeType, targetUri);

  return (
    <ScrollView contentContainerClassName="flex-row justify-center p-4">
      <View className="max-w-[600px] flex-1 padding gap-4">
        <Text variant="h1">Profile</Text>
        <Input placeholder="John Doe" label="Name" />
        <Separator />
        <Text variant="h2">Contacts</Text>
        {profile && (
          <ProfileKnows profile={profile} onChangeProfile={() => {}} />
        )}
      </View>
    </ScrollView>
  );
};
