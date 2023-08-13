import type { AppProps } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Web3AuthModalPack, type Web3AuthConfig } from "@safe-global/auth-kit";
import { type Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import {
  ADAPTER_EVENTS,
  CHAIN_NAMESPACES,
  type SafeEventEmitterProvider,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import { env } from "~/env.mjs";
import { useContext, useEffect, useState } from "react";
import { WagmiConfig, configureChains, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { InjectedConnector } from "wagmi/connectors/injected";
import { baseGoerli, optimismGoerli, zoraTestnet } from "@wagmi/chains";
import { SafeAuthContext } from "~/context/SafeAuthContext";

const MyApp = ({ Component, pageProps }: AppProps<{ session: Session }>) => {
  // const [safeAuth, setSafeAuth] = useState<Web3AuthModalPack | null>(null);
  // const { safeAuth, setSafeAuth } = useContext(SafeAuthContext);

  const { chains, provider, webSocketProvider } = configureChains(
    [baseGoerli, optimismGoerli, zoraTestnet],
    [publicProvider()]
  );
  // Instantiating Web3Auth

  useEffect(() => {
    const chainConfig = {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x" + chains[0].id.toString(16),
      rpcTarget: chains[0].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
      displayName: chains[0].name,
      tickerName: chains[0].nativeCurrency?.name,
      ticker: chains[0].nativeCurrency?.symbol,
      blockExplorer: chains[0].blockExplorers?.default.url[0] as string,
    };

    // https://web3auth.io/docs/sdk/pnp/web/modal/initialize#arguments
    const options: Web3AuthOptions = {
      clientId: env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID, // https://dashboard.web3auth.io/
      chainConfig,
      uiConfig: {
        theme: "light",
        loginMethodsOrder: ["apple", "google"],
        defaultLanguage: "en",
        appLogo: "https://web3auth.io/images/w3a-L-Favicon-1.svg", // Your App Logo Here
      },
      web3AuthNetwork: "cyan",
    };

    // https://web3auth.io/docs/sdk/pnp/web/modal/initialize#configuring-adapters
    const modalConfig = {
      [WALLET_ADAPTERS.TORUS_EVM]: {
        label: "torus",
        showOnModal: false,
      },
      [WALLET_ADAPTERS.METAMASK]: {
        label: "metamask",
        showOnDesktop: true,
        showOnMobile: false,
      },
    };

    // https://web3auth.io/docs/sdk/pnp/web/modal/whitelabel#whitelabeling-while-modal-initialization
    const openloginAdapter = new OpenloginAdapter({
      loginSettings: {
        mfaLevel: "default",
      },
      adapterSettings: {
        uxMode: "redirect",
        whiteLabel: {
          name: "Loya",
        },
      },
    });

    const init = async () => {
      try {
        const web3AuthConfig: Web3AuthConfig = {
          txServiceUrl: "https://safe-transaction-goerli.safe.global",
        };

        const web3AuthModalPack = new Web3AuthModalPack(web3AuthConfig);
        await web3AuthModalPack.init({
          options,
          adapters: [openloginAdapter],
          modalConfig,
        });
        web3AuthModalPack.subscribe(ADAPTER_EVENTS.CONNECTED, () => {
          console.log("User is authenticated");
        });

        web3AuthModalPack.subscribe(ADAPTER_EVENTS.DISCONNECTED, () => {
          console.log("User is not authenticated");
        });

        setSafeAuth(web3AuthModalPack);
      } catch (error) {
        console.error(error);
      }
    };
    void init();
  }, []);

  const SafeAuthContextProvider = ({ children }) => (
    <SafeAuthContext.Provider value={safeAuth}>
      {children}
    </SafeAuthContext.Provider>
  );

  const wagmiConfig = createClient({
    autoConnect: true,
    connectors: [
      new Web3AuthConnector({
        chains,
        options: {
          safeAuth,
        },
      }),
      new InjectedConnector({
        chains,
        options: {
          name: "Injected",
          shimDisconnect: true,
        },
      }),
    ],
    provider,
    webSocketProvider,
  });
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <WagmiConfig client={wagmiConfig}>
        <SafeAuthContextProvider>
          <Component {...pageProps} />
        </SafeAuthContextProvider>
      </WagmiConfig>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
