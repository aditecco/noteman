/* ---------------------------------
initialState
--------------------------------- */

import { AuthState } from "../../types";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "../../constants";

export const initialState: AuthState = {
  loading: "idle",
  user:
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem?.(USER_STORAGE_KEY))
      : null,
  jwt:
    typeof window !== "undefined"
      ? sessionStorage.getItem?.(TOKEN_STORAGE_KEY)
      : null,
};