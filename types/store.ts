/* ---------------------------------
Store types
--------------------------------- */

import { UsersPermissionsUser } from "../gen/models";

export type AuthState = {
  jwt: string;
  user: UsersPermissionsUser;
};

export type AuthResponse = AuthState;
