import { unstable_connector, http, fallback } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

export const config = getDefaultConfig({
  appName: 'OriginStory',
  projectId: 'b6187205b37dc9d704772f16dca5b71e',
  chains: [mainnet],
  ssr: true,

  transports: {
    [mainnet.id]: fallback([unstable_connector(injected), http()])
    // [mainnet.id]: http('http://localhost:8545')
  }
})
