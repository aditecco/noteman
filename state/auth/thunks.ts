/* ---------------------------------
auth thunks
--------------------------------- */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { Gateway } from "../../pages/_app";
import { AxiosResponse } from "axios";
import {
  NewUsersPermissionsUser,
  UsersPermissionsUser,
} from "../../gen/models";
import { InferredAuthLocalPostRequestParams } from "../../types";
import { log } from "../../util/utils";

// signUpUser
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",

  async (
    credentials: Partial<NewUsersPermissionsUser> & {
      identifier: string;
    } /* identifier is undocumented */
  ) => {
    return (await Gateway.postData("/auth/local/register", {
      username: credentials?.identifier,
      email: credentials?.identifier,
      password: credentials?.password,
    })) as AxiosResponse<NewUsersPermissionsUser>;
  }
);

// signInUser
export const signInUser = createAsyncThunk(
  "auth/signInUser",

  async (
    credentials: Partial<UsersPermissionsUser> & {
      identifier: string;
      password: string;
    } /* identifier is undocumented */
  ) => {
    return await Gateway.postData("/auth/local", {
      identifier: credentials?.identifier,
      password: credentials?.password,
    } as InferredAuthLocalPostRequestParams);
  }
);

// getUser
export const getUser = createAsyncThunk(
  "auth/getUser",
  async (token: string) => {
    return (await Gateway.getData("/users/me", {
      headers: { Authorization: "Bearer " + token },
    })) as AxiosResponse<UsersPermissionsUser>;
  }
);
