import Head from "next/head";
import Image from "next/image";
import PlusIcon from "public/icons/plus";
import QRCode from "react-qr-code";

const Header = () => {
  return (
    <div className="flex w-full justify-between">
      <div>Hi, name</div>
      <div>Settings</div>
    </div>
  );
};

const QRCodeWrapper = () => {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <span className="text-center text-lg">
        Show this to the <br /> merchant to get points
      </span>

      <div className="aspect-square w-2/3 rounded-2xl bg-white p-5 shadow">
        <QRCode
          value="0x123"
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        />
      </div>
    </div>
  );
};

const Cards = () => {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-end gap-4">
          <span className="text-[112px] leading-none">1</span>
          <span className="pb-2">Loyalty Card</span>
        </div>
      </div>

      <div
        className="mt-4 flex w-full flex-col items-center justify-between rounded-3xl bg-[#FFEDE6] px-8 py-4"
        onClick={() => console.log("Loyalty card view")}
      >
        <div className="flex w-full items-center justify-between">
          <Image
            src="/business-logo.png"
            alt="Business"
            width={90}
            height={70}
          />
          <span>1 reward</span>
        </div>
        <div className="mt-8 grid w-full  grid-cols-5 grid-rows-2 gap-4">
          <div className="h-10 w-10 rounded-full border border-brand-black" />
          <div className="h-10 w-10 rounded-full border border-brand-black" />
          <div className="h-10 w-10 rounded-full border border-brand-black" />
          <div className="h-10 w-10 rounded-full border border-brand-black" />
          <div className="h-10 w-10 rounded-full border border-brand-black" />
          <div className="h-10 w-10 rounded-full border border-brand-black" />
          <div className="h-10 w-10 rounded-full border border-brand-black" />
          <div className="h-10 w-10 rounded-full border border-brand-black" />
          <div className="h-10 w-10 rounded-full border border-brand-black" />
          <div className="h-10 w-10 rounded-full border border-brand-black" />
        </div>
      </div>
    </div>
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
          <QRCodeWrapper />
          <Cards />
          <Rewards />
        </div>
      </main>
    </>
  );
}
