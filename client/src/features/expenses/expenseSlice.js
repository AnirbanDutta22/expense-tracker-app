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
      let newExpenseIndex = state.expenses.findIndex(
        (expense) => expense.date <= newExpense.date
      );
      if (existingExpenseIndex !== -1) {
        //if the expense already exists, update it
        state.expenses[existingExpenseIndex] = newExpense;
      } else {
        //if the expense is new
        if (newExpenseIndex !== -1) {
          //in case of expenses having same date
          while (
            newExpenseIndex < state.expenses.length &&
            state.expenses[newExpenseIndex].date === newExpense.date
          ) {
            newExpenseIndex++;
          }
          state.expenses.splice(newExpenseIndex, 0, newExpense);
        } else {
          //expenses having different date
          state.expenses.push(newExpense);
        }
      }
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
