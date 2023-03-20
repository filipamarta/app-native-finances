import React from "react";
import { StyleSheet, Pressable, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const IconButton = ({ iconName, iconSize, iconColor, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View>
        <Ionicons name={iconName} size={iconSize} color={iconColor} />
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  pressed: {},
});
