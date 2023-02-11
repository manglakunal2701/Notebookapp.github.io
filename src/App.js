import './App.css';
import { BrowserRouter as Router, Route,Routes, } from "react-router-dom";
import NavBar from './Components/NavBar';
import Home from "./Components/Home";
import  { useState } from 'react';
import About from "./Components/About";
import Alert from "./Components/Alert";
import NoteState from './context/notes/NoteState';
import Login from './Components/Login';
import Signup from './Components/Signup';
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>
      <NoteState>
        <Router>
          <NavBar />
          <Alert alert={alert}/>
          <div className="container ">
            <Routes>
              <Route exact path="/"element ={<Home showAlert={showAlert} />}/>
              <Route exact path="/About" element ={<About />}/>
              <Route exact path="/login" element ={<Login showAlert={showAlert} />}/>
              <Route exact path="/signup" element ={<Signup showAlert={showAlert} />}/>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
