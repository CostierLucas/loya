import Head from "next/head";
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
import { Logo } from "public/logo";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { api } from "~/utils/api";
import { SiweMessage } from "siwe";
import { getCsrfToken, signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

//https://docs.safe.global/safe-core-aa-sdk/auth-kit/web3auth

export default function Home() {
  const [signedIn, setSignedIn] = useState(false);
  const [safeAuth, setSafeAuth] = useState<Web3AuthModalPack | null>();
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>();
  const { data: session } = useSession();
  const { data: userData } = api.user.getUserData.useQuery(undefined, {
    enabled: !!session,
  });
  const router = useRouter();

  async function onSignIn() {
    if (!safeAuth) {
      console.log("Web3Auth not initialized");
      return;
    }
    try {
      const authKitSignData = await safeAuth.signIn();
      console.log("Signed In: ", authKitSignData);
      if (authKitSignData.eoa) {
        const provider = new ethers.providers.Web3Provider(
          safeAuth.getProvider() as SafeEventEmitterProvider
        );
        const signer = provider.getSigner();
        const network = await provider.getNetwork();
        console.log(network);

        const message = new SiweMessage({
          domain: window.location.host,
          address: authKitSignData.eoa,
          statement: "Sign in with Ethereum to the app.",
          uri: window.location.origin,
          version: "1",
          chainId: network.chainId ? network.chainId : 5,
          // nonce is used from CSRF token
          nonce: await getCsrfToken(),
        });
        console.log("SIWE Message: ", message);
        const signature = await signer.signMessage(message.prepareMessage());
        console.log("Signature: ", signature);
        void signIn("credentials", {
          message: JSON.stringify(message),
          redirect: false,
          signature,
        });

        console.log("User data from DB: ", userData);
        if (userData && !userData.isSetupComplete) {
          console.log("No setup");
          console.log("Redirecting to onboarding");
          router.push("/setup-account");
        } else if (
          userData &&
          userData.isSetupComplete &&
          userData.role === "MERCHANT"
        ) {
          console.log("Redirecting to merchant dashboard");
          router.push("/merchant");
        } else if (
          userData &&
          userData.isSetupComplete &&
          userData.role === "USER"
        ) {
          console.log("Redirecting to user dashboard");
          router.push("/user");
        } else {
          console.log("Something went wrong");
        }
      }
    } catch (error) {
      console.error(error);
    }
    const userInfo = await safeAuth.getUserInfo();
    console.log("User Info: ", userInfo);
    setProvider(safeAuth.getProvider() as SafeEventEmitterProvider);
    setSignedIn(true);
  }

  async function signOut() {
    if (!safeAuth) {
      console.log("Web3Auth not initialized");
      return;
    }
    await safeAuth.signOut();
    console.log("Signed Out ");
    setSignedIn(false);
  }

  useEffect(() => {
    // https://web3auth.io/docs/sdk/pnp/web/modal/initialize#arguments
    const options: Web3AuthOptions = {
      clientId: env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID, // https://dashboard.web3auth.io/
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x5",
        // https://chainlist.org/
        rpcTarget: "https://rpc.ankr.com/eth_goerli",
      },
      uiConfig: {
        theme: "dark",
        loginMethodsOrder: ["github", "google"],
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
          name: "Safe",
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
          setSignedIn(true);
        });

        web3AuthModalPack.subscribe(ADAPTER_EVENTS.DISCONNECTED, () => {
          console.log("User is not authenticated");
          setSignedIn(false);
        });

        setSafeAuth(web3AuthModalPack);
      } catch (error) {
        console.error(error);
      }
    };
    void init();
  }, []);

  return (
    <>
      <Head>
        <title>Loya</title>
        <meta name="description" content="Loyalty Rewards App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-brand-sky to-white to-50%">
        <div className="text-brand-navy">
          <Logo />
        </div>
        {!signedIn ? (
          <div className="flex flex-col gap-2">
            <button
              className="rounded-2xl bg-brand-black px-20 py-5 text-lg leading-none text-white transition-colors hover:bg-brand-black/90"
              onClick={() => void onSignIn()}
            >
              Sign In
            </button>
          </div>
        ) : (
          <button
            className="rounded-2xl bg-slate-200 px-20 py-5 text-lg leading-none text-brand-black transition-colors hover:bg-black/90"
            onClick={() => void signOut()}
          >
            Sign Out
          </button>
        )}
      </main>
    </>
  );
}
