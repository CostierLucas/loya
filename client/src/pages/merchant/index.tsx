import Head from "next/head";
import PlusIcon from "public/icons/plus";

const Customer = () => {
  return (
    <div className="flex w-full justify-between border-b pb-4">
      <div className="flex flex-col">
        <span className="text-xl">1. Mike</span>
        <span>Since September 12, 2023</span>
      </div>
      <span>90</span>
    </div>
  );
};

const Customers = () => {
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
        <div className="mb-6 flex w-full justify-between text-xl font-bold">
          <span>Customers (60)</span>
          <span>Visits</span>
        </div>
        <Customer />
        <button className="mt-6">View All</button>
      </div>
    </div>
  );
};

const Programs = () => {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-end gap-4">
          <span className="text-[112px] leading-none">1</span>
          <span className="pb-2">Active Program</span>
        </div>
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-black text-white">
          <PlusIcon />
        </button>
      </div>
      <div className="mt-12 flex w-full items-center justify-between rounded-3xl bg-[#BBEEFF] px-8 py-4">
        <div className="flex flex-col">
          <span className="uppercase text-brand-navy">Active</span>
          <span className="text-lg">Free Ice Cream</span>
          <span className="text-sm">10 claimed this month</span>
        </div>
        <div>
          <span>on 10 visits</span>
        </div>
      </div>
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
    <div className="flex w-full justify-between">
      <div>Image</div>
      <div>Settings</div>
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

        <div className="mt-20 flex w-full flex-col items-start justify-between lg:flex-row">
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
