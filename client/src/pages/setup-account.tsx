import Head from "next/head";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Drawer } from "vaul";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
//
const MerchantSetup = () => {
  const [name, setName] = useState("");
  const router = useRouter();
  const { mutate } = api.user.updateProfile.useMutation({
    onSuccess: (data) => {
      console.log("Profile updated ", data);
      router.push("/merchant");
    },
    onError: (error) => {
      console.log("There was an error updating the profile ", error);
    },
  });
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <button className="rounded-2xl border border-brand-sky bg-brand-sky px-8 py-4 text-brand-black shadow hover:bg-brand-navy hover:text-white">
          I am a merchant
        </button>
      </Drawer.Trigger>
      <Drawer.Overlay className="fixed inset-0 bg-black/40" />
      <Drawer.Portal>
        <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex h-full max-h-[96%] flex-col items-center justify-center rounded-t-[10px] bg-gray-100">
          <div className="flex flex-col gap-2">
            <p>What's your business' name?</p>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              name="name"
              value={name}
              placeholder="John's Pizza"
              className="rounded-2xl border border-brand-sky px-8 py-4 text-brand-black shadow "
            />
          </div>
          <div className="mt-8 flex flex-col gap-2">
            <p>Add your logo</p>
            <input
              type="text"
              onChange={(e) => console.log(e.target.value)}
              name="name"
              placeholder="Upload logo"
              className="rounded-2xl border border-brand-sky px-8 py-4 text-brand-black shadow "
            />
          </div>
          <button
            className="mt-8 rounded-2xl bg-brand-navy px-20 py-5 text-lg leading-none text-white transition-colors hover:bg-black/90"
            onClick={() => {
              mutate({
                role: "MERCHANT",
                name,
                isSetupComplete: true,
              });
            }}
          >
            Done
          </button>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
// const ProfileSchema = z.object({
//   name: z.string().min(1),
//   type: z.enum(["USER", "MERCHANT"]),
//   logo: z.string().min(1).optional(),
//   isSetupComplete: z.boolean(),
// });
const UserSetup = () => {
  const [name, setName] = useState("");
  const router = useRouter();
  const { mutate } = api.user.updateProfile.useMutation({
    onSuccess: (data) => {
      console.log("Profile updated ", data);
      router.push("/user");
    },
    onError: (error) => {
      console.log("There was an error updating the profile ", error);
    },
  });
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <button className="rounded-2xl border border-brand-sky bg-brand-sky px-8 py-4 text-brand-black shadow hover:bg-brand-navy hover:text-white">
          I am a client
        </button>
      </Drawer.Trigger>
      <Drawer.Overlay className="fixed inset-0 bg-black/40" />
      <Drawer.Portal>
        <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex h-full max-h-[96%] flex-col items-center justify-center rounded-t-[10px] bg-gray-100">
          <div className="flex flex-col gap-2">
            <p>What's your name?</p>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              name="name"
              value={name}
              placeholder="John Doe"
              className="rounded-2xl border border-brand-sky px-8 py-4 text-brand-black shadow "
            />
          </div>
          <button
            className="mt-8 rounded-2xl bg-brand-navy px-20 py-5 text-lg leading-none text-white transition-colors hover:bg-black/90"
            onClick={() => {
              mutate({
                role: "USER",
                name,
                isSetupComplete: true,
              });
            }}
          >
            Done
          </button>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default function SetupAccount() {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) {
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Loya</title>
        <meta name="description" content="Loyalty Rewards App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-brand-sky to-white to-50%">
        <div className="flex flex-col gap-4">
          <h2>Setup your account</h2>
          <MerchantSetup />
          <UserSetup />
        </div>
      </main>
    </>
  );
}
