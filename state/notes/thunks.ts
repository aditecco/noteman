/* ---------------------------------
notes thunks
--------------------------------- */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { Gateway } from "../../pages/_app";
import { NewNotes, Notes } from "../../gen/models";

/**
 * getNotes
 */
export const getNotes = createAsyncThunk(
  "notes/getNotes",

  async (params: { authorId: string; token: string }) => {
    const { authorId, token } = params;

    // TODO ?author.id is insecure
    return (await Gateway.getData(`/notes?author.id=${authorId}`, {
      // TODO this needs to be centralized
      headers: { Authorization: "Bearer " + token },
    })) as Notes[];
  }
);

/**
 * postNotes
 */
export const postNotes = createAsyncThunk(
  "notes/postNotes",

  async (params: { note: Partial<NewNotes>; token: string }) => {
    const { note, token } = params;

    return (await Gateway.postData(
      `/notes`,
      { ...note },
      { headers: { Authorization: "Bearer " + token } }
    )) as Notes;
  }
);

/**
 * putNotes
 */
export const putNotes = createAsyncThunk(
  "notes/putNotes",

  async (params: {
    id: string;
    newContent: Partial<NewNotes>;
    token: string;
  }) => {
    const { id, newContent, token } = params;

    return (await Gateway.putData(
      `/notes/${id}`,
      { ...newContent },
      { headers: { Authorization: "Bearer " + token } }
    )) as Notes;
  }
);

/**
 * deleteNotes
 */
export const deleteNotes = createAsyncThunk(
  "notes/deleteNotes",
  arg => {}

  // async (params: { note: Partial<NewNotes>; token: string }) => {
  //   const { note, token } = params;
  //
  //   return (await Gateway.postData(
  //     `/notes`,
  //     { ...note },
  //     { headers: { Authorization: "Bearer " + token } }
  //   )) as Notes;
  // }
);
