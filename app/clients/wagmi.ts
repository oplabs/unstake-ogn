import { mainnet } from 'viem/chains';
import { createConfig, fallback, http } from 'wagmi';

export const wagmiConfig = ({ env }: { env: Env }) =>
  createConfig({
    chains: [mainnet],
    transports: {
      [mainnet.id]: fallback([
        ...(env.VITE_ALCHEMY_ID
          ? [http(`${env.VITE_ALCHEMY_RPC}/${env.VITE_ALCHEMY_ID}`)]
          : []),
        http(),
      ]),
    },
    ssr: true,
  });
