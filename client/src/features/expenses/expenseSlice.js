import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
};

export const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
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
      let updatableExpense = state.expenses.filter(
        (expense) => expense._id === action.payload.transaction_id
      );
      updatableExpense = action.payload;
      state.expenses.push(updatableExpense);
    },
  },
});

export const { addExpense, removeExpense, clearExpense, updateExpense } =
  expenseSlice.actions;
export default expenseSlice.reducer;
