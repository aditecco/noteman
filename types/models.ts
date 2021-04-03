/* ---------------------------------
models
--------------------------------- */

import { UsersPermissionsUser } from "../gen/models";

/**
 * AuthLocalPost
 */
export type InferredAuthLocalPostRequestBody = {
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
export type InferredAuthLocalRegisterPostResponse = InferredAuthLocalPostResponse;

// models re-export
export * from "../gen/models";
