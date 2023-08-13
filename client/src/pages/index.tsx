import Head from "next/head";
import { type SafeEventEmitterProvider } from "@web3auth/base";
import { Logo } from "public/logo";
import { ethers } from "ethers";
import { api } from "~/utils/api";
import { SiweMessage } from "siwe";
import { getCsrfToken, signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useAtom, useAtomValue } from "jotai";
import { useContext } from "react";
import { SafeAuthContext } from "~/context/SafeAuthContext";

//https://docs.safe.global/safe-core-aa-sdk/auth-kit/web3auth

export default function Home() {
  const { safeAuth } = useContext(SafeAuthContext);
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
  }

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
        {!session ? (
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
