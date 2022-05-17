import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../component/Button";
import { BsPlusCircle, BsFlag, BsEmojiDizzy } from "react-icons/bs";
import { BsFillXCircleFill } from "react-icons/bs";
import useVoting from "../../hooks/useVoting";

const DeleteIcon = styled.h5`
  cursor: pointer;
  &:hover {
    color: #ff0000;
  }
`;

function NewVote() {
  const { active } = useWeb3React();
  const navigate = useNavigate();
  const { createNewVoting } = useVoting();
  const [title, setTitle] = useState("");
  const [list, setList] = useState([""]);

  const onDelete = (index) => {
    const newList = [
      ...list.slice(0, index),
      ...list.slice(index + 1, list.length),
    ];
    setList(newList);
  };

  const onChangeChoiceText = (index, text) => {
    const newList = [...list];
    newList[index] = text;
    setList(newList);
  };

  const onSubmitVote = async (e) => {
    e.preventDefault();

    const response = await createNewVoting(list, title);
    if (response) {
      navigate(`/vote/${response?.events[0]?.args[1].toNumber()}`);
    }
  };

  if (!active)
    return (
      <Container className="text-center">
        <h1>
          <BsEmojiDizzy></BsEmojiDizzy>
        </h1>
        <h5>Please Connect Your Wallet</h5>
        <h6 className="text-muted">
          To create new voting you have to connect your wallet.
        </h6>
      </Container>
    );

  return (
    <Container className="p-4">
      <h1 className="fw-bold">Create New Voting</h1>
      <hr></hr>

      <Form onSubmit={onSubmitVote}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            <h3>Title</h3>
          </Form.Label>
          <Form.Control
            value={title}
            maxLength={100}
            required
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Do you like blockchain ?"
          />
          <Form.Text className="text-muted">Max character is 100</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            <h3>Choices</h3>
            <Form.Text className="text-muted">* Max 10 choices</Form.Text>
            <br></br>
            <Form.Text className="text-muted">* Max character is 100</Form.Text>
          </Form.Label>
          <br></br>
          {list.map((item, index) => (
            <div className="mb-2" key={`text-choice-${index}`}>
              <div className="d-flex justify-content-between">
                <p className="fw-bold mb-2">Choice {index + 1}</p>
                {index !== 0 && (
                  <DeleteIcon onClick={() => onDelete(index)}>
                    <BsFillXCircleFill></BsFillXCircleFill>
                  </DeleteIcon>
                )}
              </div>
              <Form.Control
                onChange={(event) =>
                  onChangeChoiceText(index, event.target.value)
                }
                maxLength={100}
                required
                placeholder="e.g. Yes,No"
                value={item}
              />
            </div>
          ))}
        </Form.Group>
        {list.length < 10 && (
          <h4
            style={{ cursor: "pointer" }}
            className="text-center"
            onClick={() => setList((prev) => [...prev, ""])}
          >
            ADD <BsPlusCircle></BsPlusCircle>
          </h4>
        )}

        <hr></hr>
        <Button
          style={{ minWidth: "200px" }}
          className="pb-2 d-flex justify-content-center align-items-center gap-2 text-white fw-bold mx-auto"
        >
          <h5>
            <BsFlag></BsFlag>
          </h5>
          <h6>CREATE NEW VOTING</h6>
        </Button>
      </Form>
    </Container>
  );
}

export default NewVote;
