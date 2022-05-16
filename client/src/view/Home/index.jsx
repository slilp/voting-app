import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaRegHandPointRight, FaRegHandPointDown } from "react-icons/fa";
import Button from "../../component/Button";

const ImageFill = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 200px;
  border-radius: 15px;

  @media (min-width: 768px) {
    min-height: 275px;
  }

  @media (min-width: 992px) {
    min-height: 475px;
  }
`;

const steps = [
  {
    key: "step-one",
    step: 1,
    title: "Create",
    desc: "Creating new voting , Adding your voting list and title.",
    img: "url('create_voting.png')",
  },
  {
    key: "step-two",
    step: 2,
    title: "Start and Share",
    desc: "Start your voting and share to voters you want.",
    img: "url('https://www.notion.so/cdn-cgi/image/format=auto,width=1080,quality=100/front-static/pages/product/home-page-hero-refreshed-v3.png')",
  },
  {
    key: "step-three",
    step: 3,
    title: "End and View",
    desc: "End your vote to see the result.",
    img: "url('https://www.notion.so/cdn-cgi/image/format=auto,width=1080,quality=100/front-static/pages/product/home-page-hero-refreshed-v3.png')",
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <Container className="p-4">
      <Row className="mb-5">
        <Col md={{ span: 6, order: 1 }} xs={{ order: 2 }}>
          <div>
            <h1 style={{ fontSize: "3rem" }} className="fw-bold">
              Public Voting
            </h1>
            <h1 style={{ fontSize: "3rem" }} className="fw-bold">
              On <span style={{ color: "#7B3FE4" }}>Polygon</span> Network
            </h1>
            <h5 className="fw-normal">
              VOTE ME UP is a decentralized voting platform with smartcontract.
            </h5>
            <h5 className="fw-normal">It is FREE ! for everyone 💖</h5>
            <br></br>
            <Button
              onClick={() => navigate("/new-vote")}
              style={{ minWidth: "200px" }}
              className="pb-2 d-flex justify-content-center align-items-center gap-2 text-white fw-bold"
            >
              <h5>
                <FaRegHandPointRight></FaRegHandPointRight>
              </h5>
              <h6>START VOTING</h6>
            </Button>
          </div>
        </Col>
        <Col md={{ span: 6, order: 2 }} xs={{ order: 1 }}>
          <div className="text-center p-3">
            <img
              alt="voting_main"
              src="/voting_main.png"
              style={{ height: "225px" }}
            ></img>
          </div>
        </Col>
      </Row>

      <h1 className="text-center" style={{ fontSize: "2.5rem" }}>
        Easy Step
      </h1>
      <h2 className="text-center mb-5" style={{ fontSize: "2.5rem" }}>
        <FaRegHandPointDown></FaRegHandPointDown>
      </h2>
      <Row className="mb-5">
        {steps.map((item) => (
          <>
            <Col md="5">
              <div
                className="rounded-circle text-white d-flex justify-content-center align-items-center mb-2"
                style={{
                  backgroundColor: "#7B3FE4",
                  height: "50px",
                  width: "50px",
                }}
              >
                <h3>{item.step}</h3>
              </div>
              <h3>{item.title}</h3>
              <h5 className="fw-normal">{item.desc}</h5>
            </Col>
            <Col md="7">
              <ImageFill
                className="text-center m-3 shadow"
                style={{
                  backgroundImage: item.img,
                }}
              ></ImageFill>
            </Col>
          </>
        ))}
      </Row>
      <div
        className="d-flex flex-column gap-2 align-items-center justify-content-center"
        style={{
          borderRadius: "15px",
          background: "rgb(156,255,218)",
          background:
            "linear-gradient(180deg, rgba(156,255,218,1) 0%, rgba(79,204,110,1) 100%, rgba(0,212,255,1) 100%)",
          height: "300px",
        }}
      >
        <img
          alt="voting_logo"
          src="/voting_logo.png"
          style={{ height: "100px" }}
        ></img>
        <h3>Get Started</h3>
        <Button
          onClick={() => navigate("/new-vote")}
          style={{ minWidth: "200px" }}
          className="pb-2 d-flex justify-content-center align-items-center gap-2 text-white fw-bold"
        >
          <h5>
            <FaRegHandPointRight></FaRegHandPointRight>
          </h5>
          <h6>START VOTING</h6>
        </Button>
      </div>
    </Container>
  );
}

export default Home;
