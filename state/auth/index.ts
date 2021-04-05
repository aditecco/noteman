/* ---------------------------------
auth slice
--------------------------------- */

import { createSlice } from "@reduxjs/toolkit";
import { getUser, signInUser, signUpUser } from "./thunks";
import { initialState } from "./initialState";

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
     * signUpUser
     * @param state
     * @param action
     */
    builder.addCase(signUpUser.fulfilled, function (state, action) {
      return {
        ...state,
        ...(action?.payload ?? {}),
      };
    });

    /**
     * signInUser
     * @param state
     * @param action
     */
    builder.addCase(signInUser.fulfilled, function (state, action) {
      return {
        ...state,
        ...(action?.payload ?? {}),
      };
    });

    /**
     * getUser
     * @param state
     * @param action
     */
    builder.addCase(getUser.fulfilled, function (state, action) {
      state.user = action?.payload;
    });
  },
});

export const { signOutUser } = authSlice.actions;

export default authSlice.reducer;
