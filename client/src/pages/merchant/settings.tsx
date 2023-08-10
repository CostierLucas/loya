import Head from "next/head";
import { Logo } from "public/logo";

export default function Settings() {
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
      </main>
    </>
  );
}
