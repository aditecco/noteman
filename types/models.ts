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

export type InferredAuthLocalPostResponse = {
  jwt: string;
  user: UsersPermissionsUser;
};

/**
 * AuthLocalRegisterPost
 */
export type AuthLocalRegisterPostResponse = InferredAuthLocalPostResponse;

/**
 * Generic AuthResponse
 */
export type AuthResponse<
  U = UsersPermissionsUser
> = InferredAuthLocalPostResponse & {
  user: U;
};

// models re-export
export * from "../gen/models";
