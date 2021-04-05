/* ---------------------------------
notes slice
--------------------------------- */

import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { deleteNotes, getNotes, postNotes, putNotes } from "./thunks";

export const notesSlice = createSlice({
  // ref: https://redux-toolkit.js.org/usage/immer-reducers#mutating-and-returning-state
  // ref: https://redux-toolkit.js.org/usage/immer-reducers#resetting-and-replacing-state
  // ref: https://redux-toolkit.js.org/usage/usage-with-typescript#type-safety-with-extrareducers
  name: "notes",
  initialState,

  /**
   * reducers
   */
  reducers: {},

  /**
   * extraReducers
   */
  extraReducers: builder => {
    // TODO pending & error cases

    /**
     * getNotes
     * @param state
     * @param action
     */
    builder.addCase(getNotes.fulfilled, function (state, action) {
      state.notes = action?.payload ?? [];
    });

    /**
     * postNotes
     * @param state
     * @param action
     */
    builder.addCase(postNotes.fulfilled, function (state, action) {
      state.notes.push(action?.payload);
    });

    /**
     * putNotes
     * @param state
     * @param action
     */
    builder.addCase(putNotes.fulfilled, function (state, action) {
      const { payload: modified } = action;
      const which = state.notes.findIndex(note => note.id === modified?.id);

      state.notes[which] = modified;
    });

    /**
     * deleteNotes
     * @param state
     * @param action
     */
    builder.addCase(deleteNotes.fulfilled, function (state, action) {
      const { payload: deleted } = action;
      const which = state.notes.findIndex(note => note.id === deleted?.id);

      state.notes.splice(which, 1);
    });
  },
});

// export const {  } = notesSlice.actions;

export default notesSlice.reducer;
