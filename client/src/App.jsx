import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import WhiteBackdrop from "./component/WhiteBackdrop";
import Header from "./view/Header";
import Home from "./view/Home";
import Vote from "./view/Vote";
import NewVote from "./view/NewVote";
// import History from "./view/History";

function App() {
  return (
    <div>
      {/* <WhiteBackdrop className="d-flex w-100 h-100 bg-light justify-content-center align-items-center">
        <Spinner animation="border" style={{ height: "75px", width: "75px" }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </WhiteBackdrop> */}
      <Header></Header>
      <Routes>
        <Route path="*" element={<Home />}></Route>
        <Route path="vote/:id" element={<Vote />} />
        <Route path="new-vote" element={<NewVote />}></Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
