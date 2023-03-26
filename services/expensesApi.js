import axios from 'axios';

const FIREBASE_BACKEND_URL =
  'https://react-native-finances-default-rtdb.europe-west1.firebasedatabase.app';

export const addExpenseApi = async (expensesData) => {
  const url = `${FIREBASE_BACKEND_URL}/expenses.json`;
  const response = await axios.post(url, expensesData);
  const idFromFirebase = response.data.name;
  return idFromFirebase;
};

export const getExpensesApi = async () => {
  const url = `${FIREBASE_BACKEND_URL}/expenses.json`;
  const response = await axios.get(url);
  const resData = response.data;

  let expenses = [];

  for (const key in resData) {
    const expenseObj = {
      id: key,
      amount: resData[key].amount,
      description: resData[key].description,
      date: resData[key].date,
    };
    expenses.push(expenseObj);
  }

  return expenses;
};

export const updateExpenseApi = (id, expenseData) => {
  const url = `${FIREBASE_BACKEND_URL}/expenses/${id}.json`;
  return axios.put(url, expenseData);
};

export const deleteExpenseApi = (id) => {
  const url = `${FIREBASE_BACKEND_URL}/expenses/${id}.json`;
  return axios.delete(url);
};
