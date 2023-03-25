import React from "react";
import { StyleSheet, Pressable, Text, View } from "react-native";
import Colors from "../../contants/colors";
import { dateFormatted } from "../../utils/date";

const CalendarInput = ({ showDatepicker, date }) => {
  return (
    <View>
      <Text style={styles.label}>Date (DD/MM/YYYY):</Text>
      <Pressable style={styles.input} onPress={showDatepicker}>
        <Text>{`${dateFormatted(date)}`}</Text>
      </Pressable>
    </View>
  );
};

export default CalendarInput;

const styles = StyleSheet.create({
  input: {
    width: "auto",
    minWidth: 180,
    marginRight: 16,
    marginBottom: 24,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderColor: Colors.tertiary400,
    borderRadius: 10,
    backgroundColor: Colors.tertiary400,
    color: Colors.primary700,
    fontSize: 15,
  },
  label: {
    marginRight: 16,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
});
