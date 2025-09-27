import React from 'react';
import { useSolidAuth } from '@ldo/solid-react';
import { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { AddressBox } from './AddressBox';
import { AvatarMenu } from './AvatarMenu';
import { SignInMenu } from './SignInMenu';
import { ViewMenu } from './ViewMenu';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { UserPlus } from 'lucide-react-native';
import { useSharingModal } from '../../sharing/SharingModal';

export const Header: FunctionComponent = () => {
  const { session } = useSolidAuth();
  const { openSharingModal } = useSharingModal();

  return (
    <Card style={styles.card}>
      <AddressBox />
      {/* {session.isLoggedIn && (
        <Button
          key="setMemu"
          variant="ghost"
          style={styles.shareButton}
          onPress={openSharingModal}
          iconLeft={<UserPlus />}
        />
      )}
      <ViewMenu /> */}
      {session.isLoggedIn ? <AvatarMenu /> : <SignInMenu />}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 48, // h-12 = 3rem = 48px
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 0, // rounded-none
    borderWidth: 0, // border-0
    padding: 8,
    zIndex: 1, // z-[1]
  },
  shareButton: {
    width: 40, // w-10 = 2.5rem = 40px
  },
});
