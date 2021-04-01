/* ---------------------------------
models
--------------------------------- */

import { UsersPermissionsUser } from "../gen/models";

/**
 * AuthLocalPost
 */
export type InferredAuthLocalPostRequestParams = {
  identifier: string;
  password: string;
};

export type AuthLocalPostResponse = {
  jwt: string;
  user: UsersPermissionsUser;
};

/**
 * AuthLocalRegisterPost
 */
export type AuthLocalRegisterPostResponse = AuthLocalPostResponse;

// models re-export
export * from "../gen/models";
