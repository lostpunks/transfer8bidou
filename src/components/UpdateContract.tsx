import React, { useState, Dispatch, SetStateAction } from "react";
import { TezosToolkit, WalletContract } from "@taquito/taquito";

interface UpdateContractProps {
  contract: WalletContract | any;
  setUserBalance: Dispatch<SetStateAction<any>>;
  Tezos: TezosToolkit;
  userAddress: string;
  setStorage: Dispatch<SetStateAction<number>>;
}

const UpdateContract = ({ contract, setUserBalance, Tezos, userAddress, setStorage }: UpdateContractProps) => {
  const [loadingIncrement, setLoadingIncrement] = useState<boolean>(false);

  const increment = async (): Promise<void> => {
    setLoadingIncrement(true);
    try {
      console.log(contract.methods.transfer().getSignature());
      const op = await contract.methods.transfer([
    {
        "from_": "tz1SEMyomW556w3fMJ6rHWbJRiorCqxUNT7V",
        "txs": [
            {
                "to_": "tz1burnburnburnburnburnburnburjAYjjX",
                "token_id": "15862",
                "amount": "1"
            }
        ]
    }
]).send();
      await op.confirmation();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingIncrement(false);
    }
  };

  if (!contract && !userAddress) return <div>&nbsp;</div>;
  return (
    <button className="button" disabled={loadingIncrement} onClick={increment}>
      <span>
        <strong>mint generative token</strong>
      </span>
    </button>
  );
};

export default UpdateContract;
