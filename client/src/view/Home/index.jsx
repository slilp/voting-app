import { Container, Row, Col } from "react-bootstrap";
import { FaRegHandPointRight } from "react-icons/fa";
import Button from "../../component/Button";

function Home() {
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
              src="./voting_main.png"
              style={{ height: "225px" }}
            ></img>
          </div>
        </Col>
      </Row>

      <h1 className="text-center mb-5" style={{ fontSize: "2.5rem" }}>
        Easy Step
      </h1>
      <Row className="mb-5">
        <Col md="5">
          <div
            className="rounded-circle text-white d-flex justify-content-center align-items-center mb-2"
            style={{
              backgroundColor: "#7B3FE4",
              height: "50px",
              width: "50px",
            }}
          >
            <h3>1</h3>
          </div>
          <h3>Create New Voting</h3>
          <h5 className="fw-normal">Adding your voting list and title</h5>
        </Col>
        <Col md="7">
          <div className="text-center p-3">
            <img
              alt="voting_logo"
              src="./voting_logo.png"
              style={{ height: "300px" }}
            ></img>
          </div>
        </Col>
        <Col md="5">
          <div
            className="rounded-circle text-white d-flex justify-content-center align-items-center mb-2"
            style={{
              backgroundColor: "#7B3FE4",
              height: "50px",
              width: "50px",
            }}
          >
            <h3>1</h3>
          </div>
          <h3>Create New Voting</h3>
          <h5 className="fw-normal">Adding your voting list and title</h5>
        </Col>
        <Col md="7">
          <div className="text-center p-3">
            <img
              alt="voting_logo"
              src="./voting_logo.png"
              style={{ height: "300px" }}
            ></img>
          </div>
        </Col>
      </Row>
      <div
        className="rounded-3 d-flex flex-column gap-2 align-items-center justify-content-center"
        style={{ backgroundColor: "#14F195", height: "300px" }}
      >
        <img
          alt="voting_logo"
          src="./voting_logo.png"
          style={{ height: "100px" }}
        ></img>
        <h3>Get Started Your Vote</h3>
        <Button
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
