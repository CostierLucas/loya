import Head from "next/head";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import SettingsIcon from "public/icons/settings";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

import LoyaltyCard from "~/components/LoyaltyCard";

const Header = () => {
  const { data: session } = useSession();
  const { data: userData } = api.user.getUserData.useQuery(undefined, {
    enabled: !!session,
  });

  const name = userData?.name || "User";
  return (
    <div className="flex w-full items-center justify-between">
      <div>
        <span>Hello, {name}</span>
      </div>
      <SettingsMenu />
    </div>
  );
};

const SettingsMenu = () => {
  const { data: session } = useSession();
  const router = useRouter();
  async function onSignOut() {
    router.push("/");
  }
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button>
          <SettingsIcon />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="m-2 flex flex-col gap-2 rounded-2xl bg-white p-4">
          <button onClick={() => void onSignOut()}>Log Out</button>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

const Rewards = () => {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-end gap-4">
          <span className="text-[112px] leading-none">1</span>
          <span className="pb-2">Rewards</span>
        </div>
      </div>
      <div className="mt-4 flex w-full items-center justify-between rounded-3xl bg-[#FFEDE6] px-8 py-4">
        <div className="flex flex-col">
          <span className="text-lg">Free Ice Cream</span>
          <span className="text-sm">Valid until 10/09/23</span>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Loya</title>
        <meta name="description" content="Loyalty Rewards App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-screen min-h-screen flex-col items-center gap-4 bg-gradient-to-b from-brand-sky to-white to-50% p-10">
        <Header />
        <div className="mt-20 flex w-full flex-col gap-16 lg:flex-row">
          <LoyaltyCard />
          <Rewards />
        </div>
      </main>
    </>
  );
}
