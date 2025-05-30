import { useResource, useSolidAuth, useSubject } from "@ldo/solid-react";
import {
  Avatar,
  Button,
  Divider,
  Icon,
  Layout,
  MenuItem,
  Popover,
  Text,
} from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { FunctionComponent, useState } from "react";
import { StyleSheet, View } from "react-native";

import { ThemeToggleMenu } from "./ThemeToggleMenu";
import { SolidProfileShapeShapeType } from "../.ldo/profile.shapeTypes";

export const AvatarMenu: FunctionComponent = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const { session, logout } = useSolidAuth();
  // TODO: Use WebId Resource to render a skeleton loader
  const webIdResource = useResource(session.webId);
  const profile = useSubject(SolidProfileShapeShapeType, session.webId);

  const renderAvatar = () => (
    <TouchableWithoutFeedback onPress={() => setMenuVisible(true)}>
      <Avatar
        source={{ uri: "https://api.lorem.space/image/face?w=150&h=150" }}
      />
    </TouchableWithoutFeedback>
  );

  return (
    <Popover
      anchor={renderAvatar}
      visible={menuVisible}
      placement="bottom end"
      onBackdropPress={() => setMenuVisible(false)}
      style={styles.popover}>
      <Layout>
        <View style={styles.profileHeader}>
          <Avatar
            size="giant"
            source={{ uri: "https://api.lorem.space/image/face?w=150&h=150" }}
          />
          <View style={styles.profileText}>
            <Text category="h6">{profile?.fn || ""}</Text>
            <Button size="tiny">Edit your profile</Button>
          </View>
        </View>
        <Divider />
        <ThemeToggleMenu />
        <Divider />
        <MenuItem
          onPress={logout}
          title="Log Out"
          accessoryLeft={(props) => <Icon {...props} name="log-out" />}
        />
      </Layout>
    </Popover>
  );
};

const styles = StyleSheet.create({
  popover: { width: 300, overflow: "hidden", borderRadius: 12 },
  profileHeader: { padding: 8, flexDirection: "row", alignItems: "center" },
  profileText: {
    marginLeft: 8,
    justifyContent: "space-around",
    alignSelf: "stretch",
    alignItems: "flex-start",
    flex: 1,
  },
});
