/* ---------------------------------
store
--------------------------------- */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// @see: https://redux-toolkit.js.org/tutorials/typescript
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
