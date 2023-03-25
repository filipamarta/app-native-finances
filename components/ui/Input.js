import React from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";
import Colors from "../../contants/colors";

const Input = ({ label, textInputConfig }) => {
  let inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.multiline);
  }

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    width: "auto",
    minWidth: 170,
    marginHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderColor: Colors.tertiary400,
    borderRadius: 10,
    backgroundColor:  Colors.tertiary400,
    color: Colors.primary700,
    fontSize: 15,
  },
  label: {
    marginHorizontal: 16,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: "top",
    paddingVertical: 10,
  },
});
