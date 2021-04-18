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

/**
 * API Errors
 */

export type InferredErrorMessage = {
  id: string;
  message: string;
};

export type InferredErrorMessageCollector = {
  messages: InferredErrorMessage[];
};

export type InferredError = {
  statusCode: number;
  error: string;
  message: InferredErrorMessageCollector[];
  data: InferredErrorMessageCollector[];
};

/**
 * models re-export
 */
export * from "../gen/models";
