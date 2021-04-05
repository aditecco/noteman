/* ---------------------------------
initialState
--------------------------------- */

import { AuthState } from "../../types";
import { TOKEN_STORAGE_KEY } from "../../constants";

export const initialState: AuthState = {
  loading: "idle",
  user: null,
  jwt:
    typeof window !== "undefined"
      ? sessionStorage.getItem?.(TOKEN_STORAGE_KEY)
      : null,
};
