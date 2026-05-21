import {
  View,
  Pressable,
  Text,
  Dimensions,
  StyleSheet
} from "react-native";

import { useState } from "react";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function ButtonMonitoring({
  onPress,
  disabled
}) {

  const [pressed, setPressed] = useState(false);

  function handlePress() {

    setPressed(true);

    if (onPress) {
      onPress();
    }
  }

  return (
    <View style={style.ViewButton}>

      <Pressable
        disabled={disabled}
        style={[
          style.PressButton,
          {
            backgroundColor: disabled
              ? "#413f3f"
              : pressed
              ? "#285A48"
              : "#112D4E",

            opacity: disabled ? 0.6 : 1,
          },
        ]}
        onPress={handlePress}
      >
        <Text style={style.PressText}>

          {disabled
            ? "MONITORAR"
            : pressed
            ? "MONITORANDO"
            : "MONITORAR"}

        </Text>
      </Pressable>

    </View>
  );
}

const style = StyleSheet.create({
  ViewButton: {
    width: width,
    height: height * 0.1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  PressButton: {
    width: width * 0.5,
    height: height * 0.06,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  PressText: {
    color: "#fff",
    fontSize: 18,
  },
});