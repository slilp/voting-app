import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { getVotingContract } from "../utils/contractHelper";

export const useVotingContract = () => {
  const votingAddress = "0x061575c571074459ac39323f1D7e1cCDAEB6a4E9";
  const { library, account } = useWeb3React();
  return useMemo(
    () =>
      getVotingContract(
        votingAddress,
        account ? library.getSigner(account).connectUnchecked() : null
      ),
    [library, account]
  );
};
