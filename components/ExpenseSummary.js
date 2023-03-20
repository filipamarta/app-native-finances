import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useExpenses } from "../context/ExpensesContext";

const ExpenseSummary = ({ title, expenses }) => {
  const { getTotalExpenses } = useExpenses();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text>{getTotalExpenses(expenses)} €</Text>
    </View>
  );
};

export default ExpenseSummary;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
  },
});
