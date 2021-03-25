/* ---------------------------------
auth slice
--------------------------------- */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  user: User;
  jwt: string;
};

type AuthResponse = AuthState;

const initialState: AuthState = {
  user: null,
  jwt: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action?.payload?.user;
      state.jwt = action?.payload?.jwt;
    },
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
