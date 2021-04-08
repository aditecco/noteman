/* ---------------------------------
Store types
--------------------------------- */

import { Notes, UsersPermissionsUser } from "../gen/models";

export type LoadingStates = "idle" | "pending" | "succeeded" | "failed";

export type AuthState = {
  loading: LoadingStates;
  jwt: string;
  user: UsersPermissionsUser;
};

export type NotesState = {
  loading: LoadingStates;
  notes: Notes[];
};
