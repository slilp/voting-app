import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Header from "./view/Header";
import Home from "./view/Home";
import Vote from "./view/Vote";
import History from "./view/History";

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="*" element={<Home />}></Route>
        <Route path="vote" element={<Vote />}></Route>
        <Route path="history" element={<History />}></Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
