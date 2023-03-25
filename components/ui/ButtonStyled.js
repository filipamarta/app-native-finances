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
    borderRadius: 30,
    padding: 8,
    paddingVertical: 12,
    backgroundColor: Colors.primary300,
  },
  buttonText: {
    color: Colors.primary700,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonFlat: {
    backgroundColor: Colors.primary700,
    borderRadius: 30,
  },
  buttonFlatText: {
    color: Colors.primary300,
  },
  pressed: {
    opacity: 0.5,
    backgroundColor: Colors.primary100,
    borderRadius: 30,
  },
});
