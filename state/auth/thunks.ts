/* ---------------------------------
auth thunks
--------------------------------- */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { Gateway } from "../../pages/_app";
import { UsersPermissionsUser } from "../../gen/models";
import {
  InferredAuthLocalPostRequestBody,
  InferredAuthLocalPostResponse,
  InferredAuthLocalRegisterPostResponse,
  InferredError,
} from "../../types";

/**
 * SIGN UP USER
 */
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",

  async (
    credentials: {
      identifier: string;
      email: string;
      password: string;
    } /* identifier is undocumented */
  ) => {
    try {
      return (await Gateway.postData("/auth/local/register", {
        username: credentials?.identifier,
        email: credentials?.email,
        password: credentials?.password,
      })) as InferredAuthLocalRegisterPostResponse;
    } catch (err) {
      const { statusCode, error, message } = (err as InferredError) ?? {};

      throw new Error(
        `${statusCode} ${error}: ${message?.[0]?.messages?.[0].message}`
      );
    }
  }
);

/**
 * SIGN IN USER
 */
export const signInUser = createAsyncThunk(
  "auth/signInUser",

  async (
    credentials: InferredAuthLocalPostRequestBody /* identifier is undocumented */
  ) => {
    try {
      return (await Gateway.postData("/auth/local", {
        identifier: credentials?.identifier,
        password: credentials?.password,
      })) as InferredAuthLocalPostResponse;
    } catch (err) {
      const { statusCode, error, message } = (err as InferredError) ?? {};

      throw new Error(
        `${statusCode} ${error}: ${message?.[0]?.messages?.[0].message}`
      );
    }
  }
);

/**
 * GET USER
 */
export const getUser = createAsyncThunk(
  "auth/getUser",
  async (token: string) => {
    try {
      return (await Gateway.getData("/users/me", {
        headers: { Authorization: "Bearer " + token },
      })) as UsersPermissionsUser;
    } catch (err) {
      const { statusCode, error, message } = (err as InferredError) ?? {};

      throw new Error(
        `${statusCode} ${error}: ${message?.[0]?.messages?.[0].message}`
      );
    }
  }
);
