import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { getVotingContract } from "../utils/contractHelper";

export const useVotingContract = () => {
  const votingAddress = "0x57A07caeA5CdB87749a3A228ea4d3a47FE706cB4";
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
