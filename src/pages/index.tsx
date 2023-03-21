import React from 'react'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal, Web3Button } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon, bsc } from 'wagmi/chains'

// 可以选择连接钱包的链
const chains = [arbitrum, mainnet, polygon, bsc]
// 首先要去这里注册一个project, 然后获取projectId https://cloud.walletconnect.com/sign-in
const projectId = '4dbc41debc16a79e40d39008a1fda2ee'

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)

export default function App() {
  return (
    <>
      {/* WagmiConfig内可以使用wagmi的所有hook，例如使用useAccount获取链接钱包的信息 */}
      <WagmiConfig client={wagmiClient}>
        <Web3Button />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}