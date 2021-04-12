/* ---------------------------------
initialState
--------------------------------- */

import { NotesState } from "../../types";

export const initialState: NotesState = {
  error: null,
  loading: "idle",
  notes: [],
};
