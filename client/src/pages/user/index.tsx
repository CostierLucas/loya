import Head from "next/head";

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

        <span>User View</span>
      </main>
    </>
  );
}
