import React from 'react';
import { useSolidAuth } from '@ldo/solid-react';
import { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
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
  const { colors } = useTheme();

  return (
    <Card
      style={[
        styles.card,
        { borderBottomWidth: 1, borderBottomColor: colors.border },
      ]}
    >
      <AddressBox />
      {session.isLoggedIn && (
        <Button
          key="setMemu"
          variant="ghost"
          style={styles.shareButton}
          onPress={openSharingModal}
          iconLeft={UserPlus}
        />
      )}
      <ViewMenu />
      {session.isLoggedIn ? <AvatarMenu /> : <SignInMenu />}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 0,
    borderWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    zIndex: 1,
  },
  shareButton: {
    width: 40,
  },
});
