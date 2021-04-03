/* ---------------------------------
notes thunks
--------------------------------- */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { Gateway } from "../../pages/_app";

/**
 * getNotes
 */
export const getNotes = createAsyncThunk(
  "notes/getNotes",

  async (params: { authorId: string; token: string }) => {
    const { authorId, token } = params;

    return await Gateway.getData(`/notes?author.id=${authorId}`, {
      // TODO this needs to be centralized
      headers: { Authorization: "Bearer " + token },
    });
  }
);
