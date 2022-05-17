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

  const sendVote = async (id, index) => {
    return await sendTransaction(votingContract, "sendVote", [id, index]);
  };

  const myVote = async (id) => {
    return await sendTransaction(votingContract, "myVote", [id]);
  };

  const isVoted = async (id) => {
    return await sendTransaction(votingContract, "isVoted", [id]);
  };

  const votingInfo = async (id) => {
    return await sendTransaction(votingContract, "votingInfo", [id]);
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
    return await sendTransaction(
      votingContract,
      "voteResult",
      [id],
      null,
      true
    );
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
