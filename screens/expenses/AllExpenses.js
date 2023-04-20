import React from 'react';
import ExpensesOutput from '../../components/ExpensesOutput';
import { useExpenses } from '../../context/ExpensesContext';

const AllExpenses = () => {
  const { getExpensesListSortedByDate } = useExpenses();

  return (
    <ExpensesOutput
      expenses={getExpensesListSortedByDate()}
      title="Total"
      fallbackText="Hey, you don' have expenses registered to show."
    />
  );
};

export default AllExpenses;
