/* ---------------------------------
UseAuthToken
--------------------------------- */

import { useEffect } from "react";
import { TOKEN_STORAGE_KEY } from "../constants";
import { getUser } from "../state/auth/thunks";
import { useAppDispatch, useAppSelector } from "./redux";
import { useRouter } from "next/router";

export default function useAuthToken() {
  const { jwt: token } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Redirects to /notes if the token is present,
  // whether in state or in session storage.
  useEffect(() => {
    const JWT = sessionStorage?.getItem?.(TOKEN_STORAGE_KEY);

    // persistent token set but state token absent,
    // like in case of page refresh
    if (!token && JWT) {
      dispatch(getUser(JWT)).then(() => router.push("/notes"));
    }

    // state token set but persistent token absent,
    // user just authenticated
    if (token && !JWT) {
      router
        .push("/notes")
        .then(() => sessionStorage?.setItem?.(TOKEN_STORAGE_KEY, token));
    }

    if (token && JWT) {
      router.push("/notes");
    }
  }, [token]);

  return { token };
}
