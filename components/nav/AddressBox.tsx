import { Icon, Input, Text, useTheme } from "@ui-kitten/components";
import { FunctionComponent, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const url = "https://noat.io/jackson/chats/chat1.ttl";
const split = ["noat.io", "jackson", "chats", "chat1"];

export const AddressBox: FunctionComponent = () => {
  const theme = useTheme();
  const [isTextMode, setIsTextMode] = useState(false);

  return (
    <View style={styles.boxContainer}>
      <Input
        style={styles.input}
        textStyle={styles.inputText}
        onFocus={() => {
          setIsTextMode(true);
        }}
        onBlur={() => {
          setIsTextMode(false);
        }}
        value={isTextMode ? url : ""}
        accessoryLeft={(props) => (
          <Icon
            {...props}
            style={[props?.style, styles.inputAccessory]}
            name={isTextMode ? "arrowhead-right" : "edit-2"}
          />
        )}
        accessoryRight={
          isTextMode
            ? (props) => (
                <Icon
                  {...props}
                  style={[props?.style, styles.inputAccessory]}
                  name="arrow-forward"
                />
              )
            : undefined
        }
      />
      <View style={styles.textModeBox} pointerEvents="none">
        {!isTextMode &&
          split.map((item, index) => (
            <View style={styles.pathPartContainer} key={item}>
              <TouchableOpacity>
                <View pointerEvents="auto">
                  <Text style={styles.pathPartText} category="s2">
                    {item}
                  </Text>
                </View>
              </TouchableOpacity>
              {index !== split.length - 1 && (
                <Icon
                  name="arrow-ios-forward"
                  fill={theme["text-basic-color"]}
                  style={styles.pathPartIcon}
                />
              )}
            </View>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: { flex: 1 },
  input: { flex: 1 },
  inputText: { minWidth: 0 },
  inputAccessory: { marginHorizontal: 0 },
  textModeBox: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    overflow: "scroll",
    marginLeft: 44,
    alignItems: "center",
  },
  pathPartContainer: { flexDirection: "row" },
  pathPartText: { marginRight: 2, textDecorationLine: "underline" },
  pathPartIcon: {
    marginRight: 2,
    width: 16,
    height: 16,
  },
});
