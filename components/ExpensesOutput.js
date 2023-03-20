import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../contants/colors";
import ExpensesList from "./ExpensesList";
import ExpenseSummary from "./ExpenseSummary";

const ExpensesOutput = ({ expenses, title, fallbackText }) => {
  return (
    <View style={styles.container}>
      <ExpenseSummary title={title} expenses={expenses} />
      {expenses.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>{fallbackText}</Text>
        </View>
      ) : (
        <ExpensesList expenses={expenses} />
      )}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary700,
    flex: 1,
  },
  empty: {
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  emptyText: {
    color: "white",
  },
});
