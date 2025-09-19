import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useAccount } from 'wagmi';
import { parseEther, formatEther } from 'viem';

// Contract ABI (simplified for demonstration)
const CONTRACT_ABI = [
  {
    "inputs": [
      {"name": "_symbol", "type": "string"},
      {"name": "_amount", "type": "uint32"},
      {"name": "_price", "type": "uint32"},
      {"name": "_orderType", "type": "uint8"}
    ],
    "name": "createOrder",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "_orderId", "type": "uint256"}],
    "name": "cancelOrder",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "_orderId", "type": "uint256"}],
    "name": "getOrder",
    "outputs": [
      {"name": "trader", "type": "address"},
      {"name": "symbol", "type": "string"},
      {"name": "orderType", "type": "uint8"},
      {"name": "isActive", "type": "bool"},
      {"name": "timestamp", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Contract address (you'll need to deploy and update this)
const CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000'; // Replace with actual deployed address

export const useTradingContract = () => {
  const { address } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const createOrder = async (symbol: string, amount: number, price: number, orderType: number) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'createOrder',
        args: [symbol, amount, price, orderType],
      });
    } catch (err) {
      console.error('Error creating order:', err);
      throw err;
    }
  };

  const cancelOrder = async (orderId: number) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'cancelOrder',
        args: [orderId],
      });
    } catch (err) {
      console.error('Error cancelling order:', err);
      throw err;
    }
  };

  const getOrder = (orderId: number) => {
    return useReadContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'getOrder',
      args: [orderId],
    });
  };

  return {
    createOrder,
    cancelOrder,
    getOrder,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
};
