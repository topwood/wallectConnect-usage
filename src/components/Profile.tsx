import React from "react";
import {
	useAccount,
	useConnect,
	useDisconnect,
  useNetwork,
} from "wagmi";
import { Web3Button } from '@web3modal/react'
import useTransaction from '../hooks/useTransaction';

export function Profile() {
	const { address, connector, isConnected } = useAccount();
  const { chain } = useNetwork()
	const { connect, connectors, error } =
		useConnect();
	const { disconnect } = useDisconnect();

  const { write, isSuccess, isLoading: isTransfering } = useTransaction("0.001");

	if (isConnected) {
		return (
			<div>
				<div>Connected to {connector?.name} with address {address} on {chain?.name}</div>
				<button onClick={() => { disconnect() }}>Disconnect</button>

        <br />
        <button disabled={isTransfering} onClick={() => { write() }}>点击发送</button>
        {isSuccess && <>发送成功</>}
			</div>
		);
	}

	return (
		<div>
			{connectors.map((connector) => (
				<button
					disabled={!connector.ready}
					key={connector.id}
					onClick={() => connect({ connector })}
				>
					{connector.name}
					{!connector.ready && " (unsupported)"}
				</button>
			))}
      <Web3Button />
			{error && <div>{error.message}</div>}
		</div>
	);
}
