import Head from "next/head";
import { useRouter } from "next/router";
import BackIcon from "public/icons/back";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { ethers } from "ethers";
import { GelatoRelayPack } from "@safe-global/relay-kit";
import Safe, {
  EthersAdapter,
  getSafeContract,
} from "@safe-global/protocol-kit";
import {
  MetaTransactionData,
  MetaTransactionOptions,
  OperationType,
} from "@safe-global/safe-core-sdk-types";
import { useState } from "react";

const Header = () => {
  const router = useRouter();
  return (
    <div className="flex w-full items-center justify-between">
      <button
        className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-black text-white shadow"
        onClick={() => {
          router.push("/merchant");
        }}
      >
        <BackIcon />
      </button>
    </div>
  );
};

export default function Scan() {
  const [userAddress, setUserAddress] = useState("");
  function addPoint() {
    //Use https://docs.safe.global/safe-core-aa-sdk/relay-kit/gelato#gelato-1balance

    // https://chainlist.org
    // const RPC_URL = "https://endpoints.omniatech.io/v1/bsc/mainnet/public";
    // const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    // const signer = new ethers.Wallet(
    //   process.env.OWNER_1_PRIVATE_KEY!,
    //   provider
    // );
    // const safeAddress = "0x..."; // Safe from which the transaction will be sent
    // const chainId = 100;
    // const gasLimit = "100000"; // Depends on the contract interaction

    // // Any address can be used for destination. In this example, we use vitalik.eth
    // const destinationAddress = userAddress;

    // Create a transaction object
    // const safeTransactionData: MetaTransactionData = {
    //   to: destinationAddress,
    //   data: "0x",
    //   value: withdrawAmount,
    //   operation: OperationType.Call,
    // };
    // const options: MetaTransactionOptions = {
    //   gasLimit,
    //   isSponsored: true,
    // };

    // const ethAdapter = new EthersAdapter({
    //     ethers,
    //     signerOrProvider: signer
    //   })

    //   const safeSDK = await Safe.create({
    //     ethAdapter,
    //     safeAddress
    //   })

    //   const relayKit = new GelatoRelayPack(process.env.GELATO_RELAY_API_KEY!)

    // const safeTransaction = await safeSDK.createTransaction({
    //   safeTransactionData,
    // });

    // const signedSafeTx = await safeSDK.signTransaction(safeTransaction);
    // const safeSingletonContract = await getSafeContract({
    //   ethAdapter,
    //   safeVersion: await safeSDK.getContractVersion(),
    // });

    // const encodedTx = safeSingletonContract.encode("execTransaction", [
    //   signedSafeTx.data.to,
    //   signedSafeTx.data.value,
    //   signedSafeTx.data.data,
    //   signedSafeTx.data.operation,
    //   signedSafeTx.data.safeTxGas,
    //   signedSafeTx.data.baseGas,
    //   signedSafeTx.data.gasPrice,
    //   signedSafeTx.data.gasToken,
    //   signedSafeTx.data.refundReceiver,
    //   signedSafeTx.encodedSignatures(),
    // ]);

    // const relayTransaction: RelayTransaction = {
    //   target: safeAddress,
    //   encodedTransaction: encodedTx,
    //   chainId,
    //   options,
    // };
    // const response = await relayKit.relayTransaction(relayTransaction);

    // console.log(
    //   `Relay Transaction Task ID: https://relay.gelato.digital/tasks/status/${response.taskId}`
    // );

    console.log("add point");
  }
  return (
    <>
      <Head>
        <title>Loya</title>
        <meta name="description" content="Loyalty Rewards App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative mb-10  h-full min-h-screen gap-4 bg-gradient-to-b from-brand-sky to-white to-50% p-4 lg:p-10">
        <div className="relative z-10 w-full">
          <Header />
        </div>

        <QrScanner
          onDecode={(result) => setUserAddress(result)}
          onError={(error) => console.log(error?.message)}
          containerStyle={{ width: "100%", height: "100%", position: "fixed" }}
          videoStyle={{ width: "100%", height: "100%" }}
          constraints={{ aspectRatio: 1080 / 1920 }}
        />
        <div className="relative bottom-[-80vh] z-10 w-full">
          <button
            className="w-full rounded-2xl bg-brand-sky px-20 py-5 text-lg leading-none text-brand-black transition-colors hover:bg-black/90"
            onClick={() => addPoint()}
          >
            Add Point
          </button>
        </div>
      </main>
    </>
  );
}
