import { useSolidAuth } from "@ldo/solid-react";
import {
  ButtonGroup,
  Button,
  Icon,
  OverflowMenu,
  MenuItem,
  Modal,
  Layout,
  Input,
  Text,
} from "@ui-kitten/components";
import { FunctionComponent, useCallback, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

import { ThemeToggleMenu } from "./ThemeToggleMenu";
import { DEFAULT_ISSUER } from "../util/constants";

export const SignInMenu: FunctionComponent = () => {
  const { width } = useWindowDimensions();
  const [menuVisible, setMenuVisible] = useState(false);
  const [idpMenuVisible, setIdpMenuVisible] = useState(false);
  const [idpValue, setIdpValue] = useState("");
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
        setIdpError("Could not log in");
      }
    }
  }, [idpValue]);

  const isCondensed = width < 630;

  const renderButtonGroup = () => {
    const buttons = [];
    if (!isCondensed) {
      buttons.push(
        <Button key="signUp" onPress={() => signUp(DEFAULT_ISSUER)}>
          Sign Up
        </Button>
      );
      buttons.push(
        <Button key="logIn" onPress={() => login(DEFAULT_ISSUER)}>
          Log In
        </Button>
      );
    }
    buttons.push(
      <Button
        key="setMemu"
        style={styles.buttonGroupButton}
        onPress={() => setMenuVisible(true)}
        accessoryRight={(props) => <Icon {...props} name="more-vertical" />}
      />
    );
    return (
      <ButtonGroup appearance="ghost" size="small">
        {buttons}
      </ButtonGroup>
    );
  };

  return (
    <>
      <OverflowMenu
        anchor={renderButtonGroup}
        visible={menuVisible}
        placement="bottom end"
        onBackdropPress={() => setMenuVisible(false)}
        style={styles.menuContainer}>
        {(() => {
          const elem = [];
          if (isCondensed) {
            elem.push(
              <MenuItem
                key="signUp"
                onPress={() => signUp(DEFAULT_ISSUER)}
                title="Sign Up"
                accessoryLeft={(props) => <Icon {...props} name="person" />}
              />
            );
            elem.push(
              <MenuItem
                key="logIn"
                onPress={() => login(DEFAULT_ISSUER)}
                title="Log In"
                accessoryLeft={(props) => <Icon {...props} name="log-in" />}
              />
            );
          }
          elem.push(
            <MenuItem
              key="logInWithAnotherPod"
              title="Log in with an another Pod"
              accessoryLeft={(props) => (
                <Icon {...props} name="external-link" />
              )}
              onPress={() => setIdpMenuVisible(true)}
            />
          );
          elem.push(<ThemeToggleMenu key="themeToggle" />);
          return elem;
        })()}
      </OverflowMenu>
      <Modal
        visible={idpMenuVisible}
        backdropStyle={styles.modalBackdrop}
        onBackdropPress={() => setIdpMenuVisible(false)}>
        <Layout style={styles.modalContainer}>
          <Input
            value={idpValue}
            label="Solid WebId or Identity Provider"
            placeholder="https://solidweb.me"
            onChangeText={(newText) => setIdpValue(newText)}
            onSubmitEditing={onIdpSubmit}
            caption={
              idpError
                ? () => (
                    <Text
                      status="danger"
                      category="label"
                      style={styles.idpInputCaption}>
                      {idpError}
                    </Text>
                  )
                : undefined
            }
            accessoryRight={(props) => (
              <Button
                onPress={onIdpSubmit}
                style={styles.idpSubmitButton}
                accessoryLeft={(props) => <Icon {...props} name="log-in" />}
              />
            )}
          />
        </Layout>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  buttonGroupButton: { width: 40 },
  menuContainer: { width: 300, overflow: "hidden", borderRadius: 12 },
  modalBackdrop: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  modalContainer: {
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  idpInputCaption: { marginTop: 6 },
  idpSubmitButton: {
    marginVertical: -7,
    marginRight: -8,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});
