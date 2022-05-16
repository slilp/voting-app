import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BsEmojiDizzy } from "react-icons/bs";
import useVoting from "../../hooks/useVoting";

function Vote() {
  const { voteChoices } = useVoting();
  const [choice, setChoice] = useState([]);
  const { active } = useWeb3React();
  const { id } = useParams();

  const getChoice = async () => {
    const result = await voteChoices(id);
    if (result) setChoice(result);
  };

  useEffect(() => {
    getChoice();
  }, [id]);

  if (!active)
    return (
      <Container className="text-center">
        <h1>
          <BsEmojiDizzy></BsEmojiDizzy>
        </h1>
        <h5>Please Connect Your Wallet</h5>
        <h6 className="text-muted">
          To voting you have to connect your wallet.
        </h6>
      </Container>
    );

  return (
    <Container className="p-4">
      {JSON.stringify(choice)} {id}
    </Container>
  );
}

export default Vote;
