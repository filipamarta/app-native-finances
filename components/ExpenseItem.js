import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Colors from "../contants/colors";
import { dateFormatted } from "../utils/date";

const ExpenseItem = ({ description, date, amount, id }) => {
  const navigation = useNavigation();

  const onPressHandler = () => {
    navigation.navigate("ManageExpense", { expenseId: id });
  };

  return (
    <Pressable
      onPress={onPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.date}>{dateFormatted(date)}</Text>
        </View>
        <Text style={styles.amount}>{Number(amount).toFixed(2)} €</Text>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.tertiary500,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 6,
  },
  content: {
    flexDirection: "column",
  },
  amount: {
    padding: 6,
    backgroundColor: Colors.primary600,
    borderRadius: 6,
    color: "white",
  },
  description: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  date: { color: "white" },
  pressed: {
    opacity: 0.8,
  },
});
