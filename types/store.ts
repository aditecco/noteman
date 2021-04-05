/* ---------------------------------
Store types
--------------------------------- */

import { Notes, UsersPermissionsUser } from "../gen/models";

export type AuthState = {
  jwt: string;
  user: UsersPermissionsUser;
};

export type NotesState = {
  notes: Notes[];
};
