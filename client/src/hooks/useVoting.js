import { useVotingContract } from "./useContract";
import useTransaction from "./useTransaction";

const useVoting = () => {
  const { sendTransaction } = useTransaction();
  const votingContract = useVotingContract();

  const createNewVoting = async (votingList, title) => {
    return await sendTransaction(votingContract, "createNewVoting", [
      votingList,
      title,
    ]);
  };

  const sendVote = async (votingList, title) => {
    return await sendTransaction(votingContract, "sendVote", [
      votingList,
      title,
    ]);
  };

  const myVote = async (votingList) => {
    return await sendTransaction(votingContract, "myVote", [votingList]);
  };

  const isVoted = async (votingList) => {
    return await sendTransaction(votingContract, "isVoted", [votingList]);
  };

  const votingInfo = async (votingList) => {
    return await sendTransaction(votingContract, "votingInfo", [votingList]);
  };

  const voteHistory = async (address) => {
    return await sendTransaction(votingContract, "voteHistory", [address]);
  };

  const voteChoices = async (id) => {
    return await sendTransaction(votingContract, "voteChoices", [id]);
  };

  const totalVote = async (id) => {
    return await sendTransaction(votingContract, "totalVote", [id]);
  };

  const voteResult = async (id) => {
    return await sendTransaction(votingContract, "voteResult", [id]);
  };

  const openVote = async (id) => {
    return await sendTransaction(votingContract, "openVote", [id]);
  };

  const endVote = async (id) => {
    return await sendTransaction(votingContract, "endVote", [id]);
  };

  return {
    createNewVoting,
    sendVote,
    myVote,
    isVoted,
    votingInfo,
    voteHistory,
    voteChoices,
    voteResult,
    openVote,
    endVote,
    totalVote,
  };
};

export default useVoting;
