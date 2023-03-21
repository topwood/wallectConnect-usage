import { ethers } from "ethers";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

// token合约地址
const tokenAddress = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
// 需要转发到的地址
const toAddress = "0x296Ce22B633A9208BEF9629b1086D6f3bDEbEa4F";

export default function useTransaction(num) {
  const { config, status, error } = usePrepareContractWrite({
    address: tokenAddress,
    abi: [
      {
        "constant": false,
        "inputs": [
          {
            "name": "to",
            "type": "address"
          },
          {
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "type": "function"
      },
    ],
    chainId: 56,
    functionName: "transfer",
    args: [toAddress, ethers.utils.parseEther(num)],
  });
  const { data, write } = useContractWrite(config);
  
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    write,
    isLoading,
    isSuccess,
    error,
    status
  }
}
