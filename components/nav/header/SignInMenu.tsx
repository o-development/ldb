import { useSolidAuth } from '@ldo/solid-react';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

import { Button } from '../../ui/button';
import { Text } from '../../ui/text';
import { EllipsisVertical } from 'lucide-react-native';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { ThemeToggleMenu } from './ThemeToggleMenu';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { Input } from '../../ui/input';
import { useDataBrowserConfig } from '../../DataBrowserContext';

export const SignInMenu: FunctionComponent = () => {
  const [idpValue, setIdpValue] = useState('');
  const [, setIdpError] = useState<string | undefined>();
  const { login, signUp } = useSolidAuth();
  const { width } = useWindowDimensions();
  const { defaultIssuer } = useDataBrowserConfig();

  // Tailwind sm: breakpoint is 640px
  const isSmallScreen = width < 640;
  const onIdpSubmit = useCallback(async () => {
    setIdpError(undefined);
    try {
      await login(idpValue);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setIdpError(err.message);
      } else {
        setIdpError('Could not log in');
      }
    }
  }, [idpValue, login]);

  const renderButtonGroup = () => {
    return (
      <View style={styles.buttonGroup}>
        {!isSmallScreen && (
          <Button
            key="signUp"
            onPress={() => signUp(defaultIssuer)}
            variant="ghost"
            text="Sign Up"
          />
        )}
        {!isSmallScreen && (
          <Button
            key="logIn"
            onPress={() => login(defaultIssuer)}
            variant="default"
            text="Log In"
          />
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              key="setMemu"
              variant="ghost"
              style={styles.menuButton}
              iconLeft={EllipsisVertical}
              textStyle={styles.menuButtonText}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent style={styles.dropdownContent}>
            <DropdownMenuGroup>
              {isSmallScreen && (
                <DropdownMenuItem
                  onPress={() => signUp(defaultIssuer)}
                >
                  <Text>Sign Up</Text>
                </DropdownMenuItem>
              )}
              {isSmallScreen && (
                <DropdownMenuItem
                  onPress={() => login(defaultIssuer)}
                >
                  <Text>Log In</Text>
                </DropdownMenuItem>
              )}
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem closeOnPress={false}>
                    <Text>Log in with Another Pod</Text>
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent style={styles.dialogContent}>
                  <DialogHeader>
                    <DialogTitle>Solid WebId or Identity Provider</DialogTitle>
                    <DialogDescription>
                      <Input
                        value={idpValue}
                        placeholder={defaultIssuer}
                        onChangeText={(newText) => setIdpValue(newText)}
                        onSubmitEditing={onIdpSubmit}
                      />
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button onPress={onIdpSubmit} text="OK" />
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <ThemeToggleMenu />
          </DropdownMenuContent>
        </DropdownMenu>
      </View>
    );
  };

  return renderButtonGroup();
};

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: 'row',
  },
  menuButton: {
    width: 40,
  },
  dropdownContent: {
    width: 256,
  },
  dialogContent: {
    width: 400,
  },
  menuButtonText: {
    fontSize: 20,
  },
});
