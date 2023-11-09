import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/noteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
  const [alter, setAlter] = useState(null);

  const showAlert = (message, type) => {
    setAlter({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlter(null);
    }, 1500);
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alter}/>
          <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login  showAlert={showAlert}/>}  />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
            {/* <Route exact path="/" element={<Home />}/>  */}
          </Routes>
        </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
