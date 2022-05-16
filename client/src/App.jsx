import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Header from "./view/Header";
import Home from "./view/Home";
import Vote from "./view/Vote";
import NewVote from "./view/NewVote";
import History from "./view/History";

function App() {
  return (
    <div>
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
