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
     * signUpUser.rejected
     */
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action?.error;
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
        ...{ error: null },
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
     * signInUser.rejected
     */
    builder.addCase(signInUser.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action?.error;
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
        ...{ error: null },
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
     * getUser.rejected
     */
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action?.error;
    });

    /**
     * getUser
     * @param state
     * @param action
     */
    builder.addCase(getUser.fulfilled, function (state, action) {
      state.user = action?.payload;
      state.error = null;
      state.loading = "succeeded";
    });
  },
});

export const { signOutUser } = authSlice.actions;

export default authSlice.reducer;
