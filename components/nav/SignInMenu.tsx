import { useSolidAuth } from '@ldo/solid-react';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

import { Button } from '../ui/button';
import { Text } from '../ui/text';
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

const DEFAULT_ISSUER = 'http://localhost:3000';

export const SignInMenu: FunctionComponent = () => {
  const { width } = useWindowDimensions();
  const [menuVisible, setMenuVisible] = useState(false);
  const [idpMenuVisible, setIdpMenuVisible] = useState(false);
  const [idpValue, setIdpValue] = useState('');
  const [idpError, setIdpError] = useState<string | undefined>();
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
            <Button
              key="setMemu"
              variant="ghost"
              style={styles.buttonGroupButton}
              onPress={() => setMenuVisible(true)}
            >
              <Text>
                <EllipsisVertical size={20} />
              </Text>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 native:w-72">
            <DropdownMenuGroup>
              <DropdownMenuItem className="sm:hidden flex">
                <Text>Sign Up</Text>
              </DropdownMenuItem>
              <DropdownMenuItem className="sm:hidden flex">
                <Text>Log In</Text>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Text>Log in with Another Pod</Text>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <ThemeToggleMenu />
          </DropdownMenuContent>
        </DropdownMenu>
      </View>
    );
  };

  return renderButtonGroup();

  // return (
  //   <>
  //     <OverflowMenu
  //       anchor={renderButtonGroup}
  //       visible={menuVisible}
  //       placement="bottom end"
  //       onBackdropPress={() => setMenuVisible(false)}
  //       style={styles.menuContainer}
  //     >
  //       {(() => {
  //         const elem = [];
  //         if (isCondensed) {
  //           elem.push(
  //             <MenuItem
  //               key="signUp"
  //               onPress={() => signUp(DEFAULT_ISSUER)}
  //               title="Sign Up"
  //               accessoryLeft={(props) => <Icon {...props} name="person" />}
  //             />,
  //           );
  //           elem.push(
  //             <MenuItem
  //               key="logIn"
  //               onPress={() => login(DEFAULT_ISSUER)}
  //               title="Log In"
  //               accessoryLeft={(props) => <Icon {...props} name="log-in" />}
  //             />,
  //           );
  //         }
  //         elem.push(
  //           <MenuItem
  //             key="logInWithAnotherPod"
  //             title="Log in with an another Pod"
  //             accessoryLeft={(props) => (
  //               <Icon {...props} name="external-link" />
  //             )}
  //             onPress={() => setIdpMenuVisible(true)}
  //           />,
  //         );
  //         elem.push(<ThemeToggleMenu key="themeToggle" />);
  //         return elem;
  //       })()}
  //     </OverflowMenu>
  //     <Modal
  //       visible={idpMenuVisible}
  //       backdropStyle={styles.modalBackdrop}
  //       onBackdropPress={() => setIdpMenuVisible(false)}
  //     >
  //       <Layout style={styles.modalContainer}>
  //         <Input
  //           value={idpValue}
  //           label="Solid WebId or Identity Provider"
  //           placeholder="https://solidweb.me"
  //           onChangeText={(newText) => setIdpValue(newText)}
  //           onSubmitEditing={onIdpSubmit}
  //           caption={
  //             idpError
  //               ? () => (
  //                   <Text
  //                     status="danger"
  //                     category="label"
  //                     style={styles.idpInputCaption}
  //                   >
  //                     {idpError}
  //                   </Text>
  //                 )
  //               : undefined
  //           }
  //           accessoryRight={(props) => (
  //             <Button
  //               onPress={onIdpSubmit}
  //               style={styles.idpSubmitButton}
  //               accessoryLeft={(props) => <Icon {...props} name="log-in" />}
  //             />
  //           )}
  //         />
  //       </Layout>
  //     </Modal>
  //   </>
  // );
};

const styles = StyleSheet.create({
  buttonGroupButton: { width: 40 },
  menuContainer: { width: 300, overflow: 'hidden', borderRadius: 12 },
  modalBackdrop: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContainer: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  idpInputCaption: { marginTop: 6 },
  idpSubmitButton: {
    marginVertical: -7,
    marginRight: -8,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});
