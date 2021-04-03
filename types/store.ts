/* ---------------------------------
Store types
--------------------------------- */

import { NewUsersPermissionsUser, UsersPermissionsUser } from "../gen/models";

export type AuthState = {
  jwt: string;
  user: UsersPermissionsUser | NewUsersPermissionsUser;
};
