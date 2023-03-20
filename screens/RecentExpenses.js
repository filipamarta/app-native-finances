import React from "react";
import ExpensesOutput from "../components/ExpensesOutput";
import { useExpenses } from "../context/ExpensesContext";

const PERIOD = "Last 7 days";

const RecentExpenses = () => {
  const { getExpensesListByTimePeriod } = useExpenses();

  return (
    <ExpensesOutput
      expenses={getExpensesListByTimePeriod(PERIOD)}
      title={PERIOD}
      fallbackText="Hey, you didn't registered expenses in the last 7 days."
    />
  );
};

export default RecentExpenses;
