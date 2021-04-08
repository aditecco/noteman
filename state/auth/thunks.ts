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
} from "../../types";

/**
 * signUpUser
 */
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",

  async (
    credentials: {
      identifier: string;
      password: string;
    } /* identifier is undocumented */
  ) => {
    return (await Gateway.postData("/auth/local/register", {
      username: credentials?.identifier,
      email: credentials?.identifier,
      password: credentials?.password,
    })) as InferredAuthLocalRegisterPostResponse;
  }
);

/**
 * signInUser
 */
export const signInUser = createAsyncThunk(
  "auth/signInUser",

  async (
    credentials: InferredAuthLocalPostRequestBody /* identifier is undocumented */
  ) => {
    return (await Gateway.postData("/auth/local", {
      identifier: credentials?.identifier,
      password: credentials?.password,
    })) as InferredAuthLocalPostResponse;
  }
);

/**
 * getUser
 */
export const getUser = createAsyncThunk(
  "auth/getUser",
  async (token: string) => {
    return (await Gateway.getData("/users/me", {
      headers: { Authorization: "Bearer " + token },
    })) as UsersPermissionsUser;
  }
);
