import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { getVotingContract } from "../utils/contractHelper";

export const useVotingContract = () => {
  const votingAddress = "0xf3dE277dCd18c53e721054275FC3F3E36E75f026";
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
