import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import { ProfileIcon } from '~/components/Icons';
import { truncateAddress } from '~/utils/string';

export const ConnectButton = () => {
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

  return (
    <>
      {isConnected && address ? (
        <button
          className="btn-secondary flex items-center gap-3 py-1.5 pr-4 pl-1.5 text-sm font-medium text-gray-500"
          onClick={openAccountModal}
        >
          <div className="overflow-hidden rounded-full">
            <ProfileIcon />
          </div>
          <div>{truncateAddress(address)}</div>
        </button>
      ) : (
        <button className="btn px-6 py-3" onClick={openConnectModal}>
          Connect
        </button>
      )}
    </>
  );
};
