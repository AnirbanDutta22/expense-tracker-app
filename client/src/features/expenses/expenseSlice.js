import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
};

export const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      const newExpense = action.payload;
      const existingExpenseIndex = state.expenses.findIndex(
        (expense) => expense._id === newExpense._id
      );
      if (existingExpenseIndex !== -1) {
        // If item already exists, update it
        state.expenses[existingExpenseIndex] = newExpense;
      } else {
        // Otherwise, add it to the cart
        state.expenses.push(newExpense);
      }
      // state.expenses.push(action.payload);
    },
    removeExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (expense) => expense._id !== action.payload
      );
    },
    clearExpense: (state, action) => {
      state.expenses = [];
    },
    updateExpense: (state, action) => {
      const { _id } = action.payload;
      let updatableExpense = state.expenses.find((data) => data._id === _id);

      if (updatableExpense) {
        updatableExpense = action.payload;
      }
    },
  },
});

export const { addExpense, removeExpense, clearExpense, updateExpense } =
  expenseSlice.actions;
export default expenseSlice.reducer;
