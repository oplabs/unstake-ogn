import {  http, fallback } from "wagmi";
import { mainnet } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

export const config = getDefaultConfig({
  appName: "OriginStory",
  projectId: "b6187205b37dc9d704772f16dca5b71e",
  chains: [mainnet],
  ssr: true,
  transports: {
    [mainnet.id]: !import.meta.env?.VITE_CUSTOM_RPC
      ? fallback([
          http(
            `${import.meta.env.VITE_ALCHEMY_RPC}/${
              import.meta.env.VITE_ALCHEMY_ID
            }`
          ),
          http(),
        ])
      : http(import.meta.env.VITE_CUSTOM_RPC),
  },
});
