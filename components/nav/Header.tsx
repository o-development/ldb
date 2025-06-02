import React from 'react';
import { useSolidAuth } from '@ldo/solid-react';
import { FunctionComponent } from 'react';
import { View } from 'react-native';

import { AddressBox } from './AddressBox';
import { AvatarMenu } from './AvatarMenu';
import { SignInMenu } from './SignInMenu';
import { ViewMenu } from './ViewMenu';
import { Card } from '~/components/ui/card';

export const Header: FunctionComponent = () => {
  const { session } = useSolidAuth();

  return (
    <Card
      className={
        'h-12 flex-row justify-between items-center rounded-none border-t-0 border-l-0 border-r-0 p-2'
      }
    >
      <AddressBox />
      <View className="mr-1" />
      <ViewMenu />
      <View className="mr-1" />
      {session.isLoggedIn ? <AvatarMenu /> : <SignInMenu />}
    </Card>
  );
};
