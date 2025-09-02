import { createConfig, fallback } from '@wagmi/core';
import { custom, http } from 'viem';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  plumeMainnet,
  sonic,
} from 'viem/chains';

import type { AppLoadContext } from 'react-router';

export const wagmiConfig = (context?: AppLoadContext) => {
  const key = context?.cloudflare?.env?.ALCHEMY_ID;

  const ethTransport = fallback([
    ...(import.meta.env.VITE_ALCHEMY_ID
      ? [
        http(
          `${import.meta.env.VITE_ALCHEMY_RPC}/${
            import.meta.env.VITE_ALCHEMY_ID
          }`
        ),
        ]
      : []),
    http(),
  ]);


  return createConfig({
    chains: [mainnet, arbitrum, base, optimism, sonic, plumeMainnet],
    transports: {
      [mainnet.id]: ethTransport,

    },
    ssr: !!context,
  });
};
