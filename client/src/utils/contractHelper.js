import { Contract } from "@ethersproject/contracts";
import votingAbi from "../config/abi/PublicVoting.json";
import { simpleRpcProvider } from "../utils/provider";

export const getContract = (abi, address, signer) => {
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new Contract(address, abi, signerOrProvider);
};

export const getVotingContract = (address, signer) => {
  return getContract(votingAbi, address, signer);
};
