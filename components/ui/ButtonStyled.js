import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../contants/colors";

const ButtonStyled = ({ onPress, text, isFlat, style }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, isFlat && styles.buttonFlat]}>
          <Text style={[styles.buttonText, isFlat && styles.buttonFlatText]}>
            {text}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ButtonStyled;

const styles = StyleSheet.create({
  button: {
    minWidth: 166,
    borderRadius: 4,
    padding: 8,
    paddingVertical: 10,
    backgroundColor: Colors.primary500,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonFlat: {
    backgroundColor: "transparent",
  },
  buttonFlatText: {
    color: Colors.primary700,
  },
  pressed: {
    opacity: 0.5,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
});
