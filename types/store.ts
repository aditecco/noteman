/* ---------------------------------
Store types
--------------------------------- */

import { Notes, UsersPermissionsUser } from "../gen/models";

export type LoadingStates = "idle" | "pending" | "succeeded" | "failed";

export type GenericError = {
  name?: string;
  message?: string;
  stackTrace?: string;
};

export interface GenericState {
  loading?: LoadingStates;
  error?: GenericError | null;
}

export interface AuthState extends GenericState {
  jwt: string;
  user: UsersPermissionsUser;
}

export interface NotesState extends GenericState {
  notes: Notes[];
}
