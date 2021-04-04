/* ---------------------------------
notes slice
--------------------------------- */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { deleteNotes, getNotes, postNotes, putNotes } from "./thunks";
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

    /**
     * postNotes
     * @param state
     * @param action
     */
    [(postNotes.fulfilled as unknown) as string](
      state,
      action: PayloadAction<Notes>
    ) {
      state.notes.push(action?.payload);
    },

    /**
     * putNotes
     * @param state
     * @param action
     */
    [(putNotes.fulfilled as unknown) as string](
      state,
      action: PayloadAction<Notes>
    ) {
      const { payload: modified } = action;
      const which = state.notes.findIndex(note => note.id === modified?.id);

      state.notes[which] = modified;
    },

    /**
     * deleteNotes
     * @param state
     * @param action
     */
    [(deleteNotes.fulfilled as unknown) as string](
      state,
      action: PayloadAction<Notes>
    ) {
      const { payload: deleted } = action;
      const which = state.notes.findIndex(note => note.id === deleted?.id);

      state.notes.splice(which, 1);
    },
  },
});

// export const {  } = notesSlice.actions;

export default notesSlice.reducer;
