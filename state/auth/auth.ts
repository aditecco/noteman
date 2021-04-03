/* ---------------------------------
auth slice
--------------------------------- */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthResponse,
  AuthState,
  NewUsersPermissionsUser,
  UsersPermissionsUser,
} from "../../types";
import { getUser, signInUser, signUpUser } from "./thunks";

const initialState: AuthState = {
  user: null,
  jwt: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  /**
   * reducers
   */
  reducers: {
    signOutUser: state => {
      state.user = null;
      state.jwt = null;
    },
  },

  /**
   * extraReducers
   */
  extraReducers: {
    /**
     * signUpUser
     * @param state
     * @param action
     */
    [(signUpUser.fulfilled as unknown) as string]: (
      state,
      action: PayloadAction<AuthResponse<NewUsersPermissionsUser>>
    ) => {
      state.user = action?.payload?.user;
      state.jwt = action?.payload?.jwt;
    },

    /**
     * signInUser
     * @param state
     * @param action
     */
    [(signInUser.fulfilled as unknown) as string]: (
      state,
      action: PayloadAction<AuthResponse>
    ) => {
      state.user = action?.payload?.user;
      state.jwt = action?.payload?.jwt;
    },

    /**
     * getUser
     * @param state
     * @param action
     */
    [(getUser.fulfilled as unknown) as string]: (
      state,
      action: PayloadAction<UsersPermissionsUser>
    ) => {
      state.user = action?.payload;
    },
  },
});

export const { signOutUser } = authSlice.actions;

export default authSlice.reducer;
