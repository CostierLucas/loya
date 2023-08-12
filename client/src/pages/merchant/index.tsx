import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Head from "next/head";
import Image from "next/image";
import PlusIcon from "public/icons/plus";
import SettingsIcon from "public/icons/settings";
import { useState } from "react";
import { Drawer } from "vaul";

const Customer = ({
  name,
  tokenBalance,
  joinedDate,
  order,
}: {
  name: string;
  tokenBalance: number;
  joinedDate: string;
  order: number;
}) => {
  return (
    <div className="flex w-full items-center justify-between border-b p-4">
      <div className="flex flex-col">
        <span className="text-xl">
          {order}. {name}
        </span>
        <span>Since {joinedDate}</span>
      </div>
      <span>{tokenBalance}</span>
    </div>
  );
};

const Customers = () => {
  const customers = ["John", "Kevin", "Mike", "Joe"];
  return (
    <div className="w-full lg:w-1/2">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-end gap-4">
          <span className="text-[112px] leading-none">60</span>
          <span className="pb-2">
            Loyal
            <br /> Customers
          </span>
        </div>
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-black text-white">
          <PlusIcon />
        </button>
      </div>
      <div className="mt-12 flex w-full flex-col items-center rounded-3xl bg-white px-8 py-6 shadow">
        <div className="mb-2 flex w-full justify-between text-xl font-bold">
          <span>Customers (60)</span>
          <span>Visits</span>
        </div>
        {customers.map((customer, i) => (
          <Customer
            key={i}
            order={i + 1}
            name={customer}
            joinedDate="September 29, 2023"
            tokenBalance={90}
          />
        ))}

        <button className="mt-6">View All</button>
      </div>
    </div>
  );
};

const CreateProgram = () => {
  const [name, setName] = useState("");
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <button className="w-full rounded-2xl bg-brand-black px-20 py-5 text-lg leading-none text-white transition-colors hover:bg-brand-black/90">
          Create A Program
        </button>
      </Drawer.Trigger>
      <Drawer.Overlay className="fixed inset-0 bg-black/40" />
      <Drawer.Portal>
        <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex h-full max-h-[96%] flex-col items-center justify-center rounded-t-[10px] bg-gray-100 px-4">
          <div className="flex w-full flex-col gap-8">
            <h2 className="text-4xl font-bold">Create a loyalty program</h2>
            <div className="flex w-full flex-col gap-2">
              <p className="text-lg">What's the reward?</p>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                name="reward"
                value={name}
                placeholder="John's Pizza"
                className="w-full rounded-2xl border border-brand-sky p-4 text-brand-black shadow "
              />
            </div>
            <div className=" flex w-full flex-col gap-2">
              <p className="text-lg">
                How many visits do people need to get the reward?
              </p>
              <input
                type="number"
                onChange={(e) => console.log(e.target.value)}
                name="name"
                placeholder="10"
                className="w-full rounded-2xl border border-brand-sky p-4 text-brand-black shadow "
              />
            </div>
          </div>
          <button
            className="mt-16 w-full rounded-2xl bg-brand-navy px-20 py-5 text-lg leading-none text-white transition-colors hover:bg-black/90"
            onClick={() => console.log("Creating program...")}
          >
            Create Program
          </button>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

const Programs = () => {
  let program = false;

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-end gap-4">
          <span className="text-[112px] leading-none">{program ? 1 : 0}</span>
          <span className="pb-2">
            {program ? "Active Program " : "Active Programs"}
          </span>
        </div>
      </div>
      {program ? (
        <div className=" flex w-full items-center justify-between rounded-3xl bg-[#BBEEFF] px-8 py-4">
          <div className="flex flex-col">
            <span className="uppercase text-brand-navy">Active</span>
            <span className="text-lg">Free Ice Cream</span>
            <span className="text-sm">10 claimed this month</span>
          </div>
          <div>
            <span>on 10 visits</span>
          </div>
        </div>
      ) : (
        <CreateProgram />
      )}
    </div>
  );
};

const Campaigns = () => {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-end gap-4">
          <span className="text-[112px] leading-none">1</span>
          <span className="pb-2">Active Campaign</span>
        </div>
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-black text-white">
          <PlusIcon />
        </button>
      </div>
      <div className="mt-12 flex w-full items-center justify-between rounded-3xl bg-[#BBEEFF] px-8 py-4">
        <div className="flex flex-col">
          <span className="uppercase text-brand-navy">Active</span>
          <span className="text-lg">Leave A Review</span>
          <span className="text-sm">10 claimed this month</span>
        </div>
        <div>
          <span>Get a 2x1</span>
        </div>
      </div>
    </div>
  );
};

const QRScaner = () => {
  return (
    <div>
      <button>Home</button>
      <div>QRScaner</div>
      <button>Add Point</button>
    </div>
  );
};

const NotificationBanner = () => {
  return (
    <div>
      <div>NotificationBanner</div>
    </div>
  );
};

const Header = () => {
  return (
    <div className="flex w-full items-center justify-between">
      <div>
        <Image
          src="/business-logo.png"
          alt="business logo"
          width={90}
          height={70}
        />
      </div>
      <SettingsMenu />
    </div>
  );
};

const SettingsMenu = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button>
          <SettingsIcon />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="m-2 flex flex-col gap-2 rounded-2xl bg-white p-4">
          <span>Log Out</span>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
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

      <main className="mb-10 flex h-full min-h-screen flex-col items-center gap-4 bg-gradient-to-b from-brand-sky to-white to-50% p-4 lg:p-10">
        <Header />

        <div className="mt-20 flex w-full flex-col items-start justify-between gap-12 lg:flex-row">
          <Customers />
          <div className="flex w-full flex-col gap-12 lg:w-1/3">
            <Programs />
            <Campaigns />
          </div>
        </div>
      </main>
    </>
  );
}
