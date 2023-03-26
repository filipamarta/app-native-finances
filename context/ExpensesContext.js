import React, { createContext, useContext, useReducer } from 'react';

const defaultValues = {
  expensesList: [],
  addExpense: (description, amount, id, date) => {},
  deleteExpense: (id) => {},
  checkExpenseOnTheList: (id) => boolean,
  getExpenseById: (id) => {},
  updateExpense: (description, amount, id) => {},
  getExpensesListByTimePeriod: (period) => {},
  getExpensesListSortedByDate: () => {},
  getTotalExpenses: (expenses) => number,
  setExpenses: (expenses) => {},
};

export const ExpensesContext = createContext(defaultValues);

export function useExpenses() {
  return useContext(ExpensesContext);
}

/* CRUD functions with useReducer */
export const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [{ ...action.payload }, ...state];
    case 'DELETE':
      const filteredList = state.filter((el) => el.id !== action.payload.id);
      return filteredList;
    case 'UPDATE':
      const list = state.filter((el) => el.id !== action.payload.id);
      return [{ ...action.payload }, ...list];
    case 'SET':
      /* const sortedList = (action.payload).sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
      return sortedList; */
      return action.payload.reverse();
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  /* 
  CRUD functions without useReducer:

  const [expensesList, setExpensesList] = useState([]);

  const addExpense = (description, amount, id, date) => {
    setExpensesList((prev) => [...prev, { description, amount, id, date }]);
  };

  const deleteExpense = (id) => {
    const newList = expensesList.filter((el) => el.id !== id);
    setExpensesList(newList); 
  };

  const updateExpense = (description, amount, id, date) => {
    const newList = expensesList.filter((el) => el.id !== id);
    setExpensesList([...newList, { description, amount, id, date }]); 
  };

  const setExpenses = (expenses) => {
     setExpensesList(expenses)); 
  }
  */

  const [expensesList, dispatch] = useReducer(expensesReducer, []);

  const addExpense = (description, amount, id, date) => {
    dispatch({ type: 'ADD', payload: { description, amount, id, date } });
  };

  const deleteExpense = (id) => {
    dispatch({ type: 'DELETE', payload: { id } });
  };

  const updateExpense = (description, amount, id, date) => {
    dispatch({ type: 'UPDATE', payload: { description, amount, id, date } });
  };

  const setExpenses = (expenses) => {
    dispatch({ type: 'SET', payload: expenses });
  };

  const checkExpenseOnTheList = (id) => {
    return expensesList.some((e) => e === id);
  };

  const getExpenseById = (id) => expensesList.find((el) => el.id === id);

  const getExpensesListByTimePeriod = (period) => {
    const currentDate = new Date();

    if (period === 'Last 7 days') {
      const finalDate = new Date(
        currentDate.setDate(currentDate.getDate() - 7)
      );
      const newList = expensesList.filter(
        (el) => new Date(el.date) >= finalDate
      );
      return newList;
    }
  };

  const getExpensesListSortedByDate = () => {
    const newList = expensesList.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    return newList;
  };

  const getTotalExpenses = (expenses) => {
    const sum = expenses?.reduce(
      (sum, current) => Number(sum) + Number(current.amount),
      0
    );
    return Number(sum).toFixed(2);
  };

  return (
    <ExpensesContext.Provider
      value={{
        expensesList,
        addExpense,
        deleteExpense,
        checkExpenseOnTheList,
        getExpenseById,
        updateExpense,
        getExpensesListByTimePeriod,
        getExpensesListSortedByDate,
        getTotalExpenses,
        setExpenses,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
