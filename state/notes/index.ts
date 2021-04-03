/* ---------------------------------
notes slice
--------------------------------- */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { getNotes } from "./thunks";
import { Notes } from "../../gen/models";

export const notesSlice = createSlice({
  // ref: https://redux-toolkit.js.org/usage/immer-reducers#mutating-and-returning-state
  // ref: https://redux-toolkit.js.org/usage/immer-reducers#resetting-and-replacing-state
  name: "notes",
  initialState,

  /**
   * reducers
   */
  reducers: {},

  /**
   * extraReducers
   */
  extraReducers: {
    // TODO pending & error cases
    /**
     * getNotes
     * @param state
     * @param action
     */
    [(getNotes.fulfilled as unknown) as string](
      state,
      action: PayloadAction<Notes[]>
    ) {
      state.notes = action?.payload ?? [];
    },
  },
});

// export const {  } = notesSlice.actions;

export default notesSlice.reducer;
