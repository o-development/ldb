import { useSolidAuth } from '@ldo/solid-react';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { View } from 'react-native';

import { Button } from '../../ui/button';
import { Text } from '../../ui/text';
import { EllipsisVertical } from '~/lib/icons/EllipsisVertical';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
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
} from '~/components/ui/dialog';
import { Input } from '../../ui/input';

const DEFAULT_ISSUER = 'http://localhost:3000';

export const SignInMenu: FunctionComponent = () => {
  const [idpValue, setIdpValue] = useState('');
  const [, setIdpError] = useState<string | undefined>();
  const { login, signUp } = useSolidAuth();
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
      <View className="flex-row">
        <Button
          key="signUp"
          className="hidden sm:block"
          onPress={() => signUp(DEFAULT_ISSUER)}
          variant="ghost"
        >
          <Text>Sign Up</Text>
        </Button>
        <Button
          key="logIn"
          className="hidden sm:block"
          onPress={() => login(DEFAULT_ISSUER)}
          variant="default"
        >
          <Text>Log In</Text>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button key="setMemu" variant="ghost" className="w-10">
              <Text>
                <EllipsisVertical size={20} />
              </Text>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 native:w-72">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="sm:hidden flex"
                onPress={() => signUp(DEFAULT_ISSUER)}
              >
                <Text>Sign Up</Text>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="sm:hidden flex"
                onPress={() => login(DEFAULT_ISSUER)}
              >
                <Text>Log In</Text>
              </DropdownMenuItem>
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem closeOnPress={false}>
                    <Text>Log in with Another Pod</Text>
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="w-[400px]">
                  <DialogHeader>
                    <DialogTitle>Solid WebId or Identity Provider</DialogTitle>
                    <DialogDescription>
                      <Input
                        value={idpValue}
                        placeholder={DEFAULT_ISSUER}
                        onChangeText={(newText) => setIdpValue(newText)}
                        onSubmitEditing={onIdpSubmit}
                      />
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button onPress={onIdpSubmit}>
                        <Text>OK</Text>
                      </Button>
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
