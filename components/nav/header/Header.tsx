import React from 'react';
import { useSolidAuth } from '@ldo/solid-react';
import { FunctionComponent } from 'react';
import { View } from 'react-native';
import { AddressBox } from './AddressBox';
import { AvatarMenu } from './AvatarMenu';
import { SignInMenu } from './SignInMenu';
import { ViewMenu } from './ViewMenu';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Text } from '../../ui/text';
import { UserPlus } from '../../../lib/icons/UserPlus';
import { useSharingModal } from '../../sharing/SharingModal';

export const Header: FunctionComponent = () => {
  const { session } = useSolidAuth();
  const { openSharingModal } = useSharingModal();

  return (
    <Card
      className={
        'h-12 flex-row justify-between items-center rounded-none border-0 sm:p-2 p-1 z-[1]'
      }
    >
      <AddressBox />
      <View className="mr-1" />
      {session.isLoggedIn && (
        <>
          <Button
            key="setMemu"
            variant="ghost"
            className="w-10"
            onPress={openSharingModal}
            iconLeft={<UserPlus />}
          />
          <View className="mr-1" />
        </>
      )}
      <ViewMenu />
      <View className="mr-1" />
      {session.isLoggedIn ? <AvatarMenu /> : <SignInMenu />}
    </Card>
  );
};
