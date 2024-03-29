import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "../features/expenses/expenseSlice";
import userReducer from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    app: userReducer,
    tran: expenseReducer,
  },
});
