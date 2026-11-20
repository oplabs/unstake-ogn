import { mainnet } from 'viem/chains';
import { createConfig, fallback, http } from 'wagmi';

const drpcUrl = (key: string) =>
  `https://lb.drpc.org/ogrpc?network=ethereum&dkey=${key}`;

export const wagmiConfig = ({ env }: { env: Env }) =>
  createConfig({
    chains: [mainnet],
    transports: {
      [mainnet.id]: fallback([
        ...(env.VITE_DRPC_KEY ? [http(drpcUrl(env.VITE_DRPC_KEY))] : []),
        http(),
      ]),
    },
    ssr: true,
  });
