/* ---------------------------------
auth slice
--------------------------------- */

import { createSlice } from "@reduxjs/toolkit";
import { log } from "../util/utils";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      log("from reducer ==> ", state, action.payload);

      state.user = action.payload.user;
    },
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
