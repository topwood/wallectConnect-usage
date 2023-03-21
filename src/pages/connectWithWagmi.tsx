import React from "react";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { arbitrum, mainnet, polygon, bsc } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { Profile } from "../components/Profile";

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(
	[ arbitrum, mainnet, polygon, bsc ],
	// [publicProvider()]
	[alchemyProvider({ apiKey: 'B3sJulLdhCpo384CdbDW3VIrer8pmSSR' }), publicProvider()]
);

// Set up client
const client = createClient({
	autoConnect: true,
	connectors: [
		new MetaMaskConnector({ chains }),
		new CoinbaseWalletConnector({
			chains,
			options: {
				appName: "wagmi",
			},
		}),
		new WalletConnectConnector({
			chains,
			options: {
				projectId: "4dbc41debc16a79e40d39008a1fda2ee",
			},
		}),
		new InjectedConnector({
			chains,
			options: {
				name: "Injected",
				shimDisconnect: true,
			},
		}),
	],
	provider,
	webSocketProvider,
});

// Pass client to React Context Provider
export default function App() {
	return (
		<WagmiConfig client={client}>
			<Profile />
		</WagmiConfig>
	);
}
