/* ---------------------------------
auth slice
--------------------------------- */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  InferredAuthLocalPostResponse,
  InferredAuthLocalRegisterPostResponse,
  UsersPermissionsUser,
} from "../../types";
import { getUser, signInUser, signUpUser } from "./thunks";
import { initialState } from "./initialState";

export const authSlice = createSlice({
  // ref: https://redux-toolkit.js.org/usage/immer-reducers#mutating-and-returning-state
  // ref: https://redux-toolkit.js.org/usage/immer-reducers#resetting-and-replacing-state
  name: "auth",
  initialState,

  /**
   * reducers
   */
  reducers: {
    signOutUser() {
      return initialState;
    },
  },

  /**
   * extraReducers
   */
  extraReducers: {
    // TODO pending & error cases

    /**
     * signUpUser
     * @param state
     * @param action
     */
    [(signUpUser.fulfilled as unknown) as string](
      state,
      action: PayloadAction<InferredAuthLocalRegisterPostResponse>
    ) {
      return {
        ...state,
        ...(action?.payload ?? {}),
      };
    },

    /**
     * signInUser
     * @param state
     * @param action
     */
    [(signInUser.fulfilled as unknown) as string](
      state,
      action: PayloadAction<InferredAuthLocalPostResponse>
    ) {
      return {
        ...state,
        ...(action?.payload ?? {}),
      };
    },

    /**
     * getUser
     * @param state
     * @param action
     */
    [(getUser.fulfilled as unknown) as string](
      state,
      action: PayloadAction<UsersPermissionsUser>
    ) {
      state.user = action?.payload;
    },
  },
});

export const { signOutUser } = authSlice.actions;

export default authSlice.reducer;
