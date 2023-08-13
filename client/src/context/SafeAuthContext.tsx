import { createContext } from "react";
import { type Web3AuthModalPack } from "@safe-global/auth-kit";

export const SafeAuthContext = createContext<Web3AuthModalPack | null>({
  safeAuth: null,
  setSafeAuth: () => {},
});
