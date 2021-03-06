/* ---------------------------------
UseAuthToken
--------------------------------- */

import { useEffect } from "react";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "../constants";
import { getUser } from "../state/auth/thunks";
import { useAppDispatch, useAppSelector } from "./redux";
import { useRouter } from "next/router";
import { UsersPermissionsUser } from "../gen/models";

export default function useAuthToken() {
  const { jwt: softToken, loading, error } = useAppSelector(
    state => state.auth
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const persistedToken = sessionStorage?.getItem?.(TOKEN_STORAGE_KEY);
    const token = softToken || persistedToken;

    // Fetches the user and redirects to /notes if the token is present,
    // whether in state or in session storage.
    if (token) {
      if (!persistedToken) {
        sessionStorage?.setItem?.(TOKEN_STORAGE_KEY, softToken);
      }

      dispatch(getUser(token))
        .then(({ payload: user }) => {
          sessionStorage?.setItem?.(
            USER_STORAGE_KEY,
            JSON.stringify(user as UsersPermissionsUser)
          );
        })
        .then(() => router.push("/notes"));
    }
  }, [softToken]);

  return { softToken, loading, error };
}
