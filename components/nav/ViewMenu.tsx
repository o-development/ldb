import { Button, Icon, MenuItem, OverflowMenu } from "@ui-kitten/components";
import { FunctionComponent, useState } from "react";
import { StyleSheet } from "react-native";

const menuItems = [
  {
    icon: "file-text",
    name: "a noat",
  },
  {
    icon: "code",
    name: "code",
  },
];

export const ViewMenu: FunctionComponent = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const renderButton = () => (
    <Button
      style={styles.menuButton}
      onPress={() => setMenuVisible(true)}
      appearance="ghost"
      accessoryRight={(props) => <Icon {...props} name="keypad" />}
    />
  );

  return (
    <OverflowMenu
      anchor={renderButton}
      visible={menuVisible}
      placement="bottom end"
      onBackdropPress={() => setMenuVisible(false)}
      style={styles.menu}>
      {menuItems.map((item) => (
        <MenuItem
          key={item.icon}
          title={`View as ${item.name}`}
          accessoryLeft={(props) => <Icon {...props} name={item.icon} />}
        />
      ))}
    </OverflowMenu>
  );
};

const styles = StyleSheet.create({
  menuButton: { width: 40 },
  menu: { overflow: "hidden", borderRadius: 12 },
});
