import { useSolidAuth } from "@ldo/solid-react";
import { FunctionComponent } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";

import { AddressBox } from "./AddressBox";
import { AvatarMenu } from "./AvatarMenu";
import { SignInMenu } from "./SignInMenu";
import { ViewMenu } from "./ViewMenu";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export const Header: FunctionComponent = () => {
  const { width } = useWindowDimensions();
  const { session } = useSolidAuth();

  console.log("Rendering");

  return (
    <View className={cn("h-[50px] flex-row justify-between items-center bg-red-50")}>
      <Button>Hello</Button>
      {/* {width > 630 && (
        <Button
          // appearance="ghost"
          // accessoryLeft={(props) => <Icon {...props} name="home" />}
        >
        </Button>
      )} */}
      {/* <AddressBox />
      <ViewMenu />
      {session.isLoggedIn ? <AvatarMenu /> : <SignInMenu />} */}
    </View>
  );
};

const styles = StyleSheet.create({
  headerConainer: {
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
  },
});
