import type { AppProps } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

const MyApp = ({ Component, pageProps }: AppProps<{ session: Session }>) => {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
