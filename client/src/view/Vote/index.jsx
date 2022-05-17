import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { BsEmojiDizzy } from "react-icons/bs";
import Button from "../../component/Button";
import useVoting from "../../hooks/useVoting";
import styled from "styled-components";
import {
  FaFlagCheckered,
  FaRegListAlt,
  FaHourglassEnd,
  FaShareSquare,
} from "react-icons/fa";
import { toast } from "react-toastify";

const Choice = styled.div`
  border-radius: 15px;
  border: ${(props) => (props.active ? "2px solid #7B3FE4" : "1px solid gray")};
  cursor: pointer;
  &:hover {
    background-color: #f8f2f2;
  }
  width: 100%;
  @media (min-width: 768px) {
    width: 50%;
  }
`;

const Share = styled.div`
  border-radius: 15px;
  border: ${(props) => (props.active ? "2px solid #7B3FE4" : "1px solid gray")};
  cursor: pointer;
  width: 100%;
  @media (min-width: 992px) {
    width: 50%;
  }
  &:hover {
    background-color: #f8f2f2;
  }
`;

function Vote() {
  const {
    voteChoices,
    sendVote,
    myVote,
    isVoted,
    votingInfo,
    totalVote,
    voteResult,
    openVote,
    endVote,
  } = useVoting();
  const [refresh, setRefresh] = useState(false);
  const [voteStatus, setVoteStatus] = useState({
    isVote: false,
    myVote: null,
  });
  const [info, setInfo] = useState([]);
  const [result, setResult] = useState();
  const [total, setTotal] = useState(0);
  const [choices, setChoices] = useState([]);
  const [select, setSelect] = useState(null);
  const { active, account } = useWeb3React();
  const { id } = useParams();
  const navigate = useNavigate();

  const getInitialData = async () => {
    const voteChoiceResponse = await voteChoices(id);
    const voteInfoResponse = await votingInfo(id);
    if (voteInfoResponse[1] === "0x0000000000000000000000000000000000000000")
      navigate("/");
    const totalVoteResponse = await totalVote(id);
    if (voteInfoResponse[2] >= 1) {
      const isVoteResponse = await isVoted(id);
      const myVoteResponse = await myVote(id);
      setVoteStatus({
        isVote: isVoteResponse,
        myVote: myVoteResponse,
      });
    }
    if (voteInfoResponse[2] === 2) {
      const voteResultResponse = await voteResult(id);
      setResult(voteResultResponse);
    }
    setTotal(parseInt(JSON.parse(JSON.stringify(totalVoteResponse)).hex));
    setChoices(voteChoiceResponse);
    setInfo(voteInfoResponse);
  };

  const onClickOpenVote = async () => {
    const response = await openVote(id);
    if (response) {
      setRefresh((prev) => !prev);
    }
  };

  const onClickEndVote = async () => {
    const response = await endVote(id);
    if (response) {
      setRefresh((prev) => !prev);
    }
  };

  const onClickSendVote = async () => {
    if (select !== null) {
      const response = await sendVote(id, select);
      if (response) {
        setRefresh((prev) => !prev);
      }
    } else {
      alert("Please select one");
    }
  };

  useEffect(() => {
    if (account) getInitialData();
    setSelect(null);
  }, [id, refresh, account]);

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
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="fw-bold">Voting</h1>
        <h5 className="fw-bold text-center">
          <p>Total Vote</p>
          <p>{total}</p>
        </h5>
      </div>

      <hr></hr>
      <div
        className="mx-auto p-2 text-white fw-bold text-center"
        style={{
          backgroundColor: "#00c774",
          width: "100px",
          borderRadius: "15px",
        }}
      >
        {info[2] === 0 ? "NOT OPEN" : info[2] === 1 ? "OPEN" : "VOTE END"}
      </div>
      <Share
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          toast.success("Copy link", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000,
          });
        }}
        className="d-flex gap-2 my-3 p-2 mx-auto justify-content-center"
      >
        <span className="fw-bold">Copy link : {window.location.href}</span>
        <span>
          <FaShareSquare></FaShareSquare>
        </span>
      </Share>

      <br></br>
      <h3 className="text-center">{info[0]}</h3>
      <br></br>
      <div className="d-flex flex-column  gap-3">
        {info[2] === 2 && result === undefined && (
          <div className="mx-auto text-center">
            <h1>
              <BsEmojiDizzy></BsEmojiDizzy>
            </h1>
            <h5>You cannot see the result.</h5>
            <h6 className="text-muted">
              You are not participate in this vote.
            </h6>
          </div>
        )}
        {info[2] === 2 && result !== undefined
          ? result.map((item) => (
              <Choice className="p-3 mx-auto d-flex justify-content-between align-items-center">
                <span>{item[0]}</span>
                <h5>{item[1]}</h5>
              </Choice>
            ))
          : choices.map((choice, index) => (
              <Choice
                onClick={() =>
                  info[2] === 1 && voteStatus?.isVote === false
                    ? setSelect(index)
                    : null
                }
                active={
                  select === index ||
                  (voteStatus?.isVote === true && voteStatus?.myVote === choice)
                }
                className=" p-3 mx-auto"
              >
                {choice}
              </Choice>
            ))}
      </div>
      <br></br>
      <hr></hr>
      <div className="d-flex flex-column gap-3">
        {info[2] === 0 && info[1] === account && (
          <Button
            onClick={onClickOpenVote}
            style={{ minWidth: "200px" }}
            className="mx-auto pb-2 d-flex justify-content-center align-items-center gap-2 text-white fw-bold"
          >
            <h5>
              <FaFlagCheckered></FaFlagCheckered>
            </h5>
            <h6>OPEN VOTING</h6>
          </Button>
        )}
        {info[2] === 1 && voteStatus?.isVote === false && (
          <Button
            onClick={onClickSendVote}
            style={{ minWidth: "200px" }}
            className="mx-auto pb-2 d-flex justify-content-center align-items-center gap-2 text-white fw-bold"
          >
            <h5>
              <FaRegListAlt></FaRegListAlt>
            </h5>
            <h6>CONFIRM VOTING</h6>
          </Button>
        )}
        {info[2] === 1 && info[1] === account && (
          <Button
            onClick={onClickEndVote}
            style={{ minWidth: "200px" }}
            className="mx-auto pb-2 d-flex justify-content-center align-items-center gap-2 text-white fw-bold"
          >
            <h5>
              <FaHourglassEnd></FaHourglassEnd>
            </h5>
            <h6>END VOTING</h6>
          </Button>
        )}
      </div>
    </Container>
  );
}

export default Vote;
