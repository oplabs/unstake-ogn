import { useState, useEffect } from "react";
import type { MetaFunction } from "@remix-run/cloudflare";
import { ConnectButton } from "~/components/ConnectButton";
import { parseAbi, zeroAddress } from "viem";
import {
  useAccount,
  useReadContracts,
  useWriteContract,
  useWaitForTransactionReceipt,
  UseWriteContractReturnType,
  useSimulateContract,
} from "wagmi";

import { formatEth } from "~/utils/bigint";
import { Modal } from "~/components/Modal";
import { OriginLogo } from "~/components/Icons";

export const meta: MetaFunction = () => {
  return [
    { title: "Unstake OGN" },
    { name: "description", content: "Unstake your OGN" },
  ];
};

const storyAddress = "0xCcE8E784c777fb9435F89f4E45f8b7FC49f7669f";
const abi = parseAbi([
  `function balanceOf(address userAddress) view returns (uint256)`,
  `function latestStakeTime(address userAddress) view returns (uint256)`,
  `function unstake() returns (uint256)`,
]);

const legacyAddress = "0x501804b374ef06fa9c427476147ac09f1551b9a0";
const legacyAbi = parseAbi([
  `function totalCurrentHoldings(address userAddress) view returns (uint256)`,
  `function exit()`,
]);

export default function Index() {
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected, address } = useAccount();

  const { data, isLoading, refetch } = useReadContracts({
    contracts: [
      {
        abi,
        address: storyAddress,
        functionName: "balanceOf",
        args: [address || zeroAddress],
      },
      {
        abi: legacyAbi,
        address: legacyAddress,
        functionName: "totalCurrentHoldings",
        args: [address || zeroAddress],
        // args: ['0x415bd9A5e2fDcB8310ceE3F785F25B5E4D4564E3']
      },
    ],
    query: {
      enabled: isConnected,
    },
  });

  const storyStake = data?.[0].result || 0n;
  const legacyStake = data?.[1].result || 0n;

  const contractWrite = useWriteContract();
  const txReceipt = useWaitForTransactionReceipt({ hash: contractWrite.data });

  useEffect(() => {
    if (contractWrite.status === "pending") {
      setIsOpen(true);
    }
  }, [contractWrite.status, txReceipt.data, refetch]);

  let modalTitle = "Transaction in process";
  let modalStatus = "loading";
  let modalDescription;

  if (contractWrite.status === "pending") {
    modalTitle = "Please check your wallet";
  } else if (contractWrite.status === "success" && txReceipt.data) {
    modalTitle = "Transaction successful";
    modalStatus = "success";
  } else if (contractWrite.error) {
    modalTitle = "Transaction failed";
    modalStatus = "error";
    modalDescription =
      "shortMessage" in contractWrite.error
        ? contractWrite.error.shortMessage
        : contractWrite.error.message;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between h-20">
        <OriginLogo />
        <ConnectButton />
      </div>
      <div className="font-medium text-2xl">New OGN Staking Coming Soon! </div>
      <div className="mt-4 text-sm text-gray-800">
        We are revamping OGN staking. This tool allows you to withdraw OGN from
        our legacy staking programs. Connect your wallet, then use the Unstake
        button to retrieve any outstanding OGN.
      </div>
      <div className="my-12 text-xl text-center flex justify-center items-start gap-8">
        {isLoading ? (
          <div className="white-box">Loading...</div>
        ) : !isConnected ? (
          <div className="white-box flex flex-col gap-4 items-center">
            <div>Connect to check for staked OGN</div>
            <ConnectButton />
          </div>
        ) : storyStake === 0n && legacyStake === 0n ? (
          <div className="white-box">You have no staked OGN to claim!</div>
        ) : (
          <>
            {address && storyStake > 0n && (
              <StoryStake balance={storyStake} write={contractWrite} />
            )}
            {legacyStake > 0n && (
              <LegacyStake balance={legacyStake} write={contractWrite} />
            )}
          </>
        )}
      </div>
      <Modal
        status={modalStatus}
        description={modalDescription}
        txLink={
          contractWrite.data
            ? `https://etherscan.io/tx/${contractWrite.data}`
            : ""
        }
        title={modalTitle}
        isOpen={isOpen}
        setIsOpen={() => {
          setIsOpen(false);
          refetch();
        }}
      />
    </div>
  );
}

const StoryStake = ({
  balance,
  write,
}: {
  balance: bigint;
  write: UseWriteContractReturnType;
}) => {
  // const { data } = useReadContracts({
  //   contracts: [
  //     {
  //       abi,
  //       address: storyAddress,
  //       functionName: 'latestStakeTime',
  //       args: [address || zeroAddress]
  //     }
  //   ]
  // })

  // const latestStakeTime = Number(data?.[0].result || 0n) || Date.now() / 1000
  // const daysStaked = (Date.now() / 1000 - latestStakeTime) / (60 * 60 * 24)

  const { data, isLoading } = useSimulateContract({
    abi,
    address: storyAddress,
    functionName: "unstake",
  });

  const disabled = !data?.request || isLoading;

  return (
    <div className="white-box flex flex-col items-center gap-1">
      <div>Story Staked OGN:</div>
      <div className="font-medium text-2xl">{formatEth(balance)}</div>
      {/* <div className="mt-4">Days staked:</div>
      <div className="font-medium text-2xl mb-4">
        {daysStaked.toLocaleString(undefined, { maximumFractionDigits: 0 })}
      </div> */}
      <button
        className={`${disabled ? "btn-disabled" : "btn"} py-2 px-6 mt-4`}
        disabled={disabled}
        onClick={() => {
          if (data?.request) {
            write.writeContract(data.request);
          }
        }}
      >
        Unstake
      </button>
    </div>
  );
};

const LegacyStake = ({
  balance,
  write,
}: {
  balance: bigint;
  write: UseWriteContractReturnType;
}) => {
  const { data, isLoading } = useSimulateContract({
    abi: legacyAbi,
    address: legacyAddress,
    functionName: "exit",
  });

  const disabled = !data?.request || isLoading;

  return (
    <div className="white-box flex flex-col items-center gap-1">
      <div>Legacy Staked OGN:</div>
      <div className="font-medium text-2xl mb-4">{formatEth(balance)}</div>
      <button
        className={`${disabled ? "btn-disabled" : "btn"} py-2 px-6`}
        disabled={disabled}
        onClick={() => {
          if (data?.request) {
            write.writeContract(data.request);
          }
        }}
      >
        Unstake
      </button>
    </div>
  );
};
