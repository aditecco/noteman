/* ---------------------------------
auth slice
--------------------------------- */

import { createSlice } from "@reduxjs/toolkit";
import { getUser, signInUser, signUpUser } from "./thunks";
import { initialState } from "./initialState";
import { getNotes } from "../notes/thunks";

export const authSlice = createSlice({
  // ref: https://redux-toolkit.js.org/usage/immer-reducers#mutating-and-returning-state
  // ref: https://redux-toolkit.js.org/usage/immer-reducers#resetting-and-replacing-state
  // ref: https://redux-toolkit.js.org/usage/usage-with-typescript#type-safety-with-extrareducers
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
  extraReducers: builder => {
    // TODO pending & error cases

    /**
     * signUpUser.pending
     */
    builder.addCase(signUpUser.pending, state => {
      state.loading = "pending";
    });

    /**
     * signUpUser
     * @param state
     * @param action
     */
    builder.addCase(signUpUser.fulfilled, function (state, action) {
      return {
        ...state,
        ...{ loading: "succeeded" },
        ...(action?.payload ?? {}),
      };
    });

    /**
     * signInUser.pending
     */
    builder.addCase(signInUser.pending, state => {
      state.loading = "pending";
    });

    /**
     * signInUser
     * @param state
     * @param action
     */
    builder.addCase(signInUser.fulfilled, function (state, action) {
      return {
        ...state,
        ...{ loading: "succeeded" },
        ...(action?.payload ?? {}),
      };
    });

    /**
     * getUser.pending
     */
    builder.addCase(getUser.pending, state => {
      state.loading = "pending";
    });

    /**
     * getUser
     * @param state
     * @param action
     */
    builder.addCase(getUser.fulfilled, function (state, action) {
      state.user = action?.payload;
      state.loading = "succeeded";
    });
  },
});

export const { signOutUser } = authSlice.actions;

export default authSlice.reducer;
