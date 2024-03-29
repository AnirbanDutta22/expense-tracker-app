import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
