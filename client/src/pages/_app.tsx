import type { AppProps } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Provider as JotaiProvider } from "jotai";

import { type Web3AuthModalPack } from "@safe-global/auth-kit";
import { atom, createStore } from "jotai";
import { type SafeEventEmitterProvider } from "@web3auth/base";

const appStore = createStore();

export const safeAuthAtom = atom<Web3AuthModalPack | null>(null);
export const providerAtom = atom<SafeEventEmitterProvider | null>(null);

const MyApp = ({ Component, pageProps }: AppProps<{ session: Session }>) => {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <JotaiProvider store={appStore}>
        <Component {...pageProps} />
      </JotaiProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
