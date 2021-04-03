/* ---------------------------------
Store types
--------------------------------- */

import {
  NewUsersPermissionsUser,
  Notes,
  UsersPermissionsUser,
} from "../gen/models";

export type AuthState = {
  jwt: string;
  user: UsersPermissionsUser | NewUsersPermissionsUser;
};

export type NotesState = {
  notes: Notes[];
};
