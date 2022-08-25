import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import { useState } from "react";


const App = () => {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <Router>
      <Navbar />
      <Alert alert={alert} />
      <Routes>
        <Route path='/' element={<Home />} />


        <Route path='/Login' element={<Login showAlert={showAlert} />} />


        <Route path='/Signup' element={<Signup showAlert={showAlert} />} />




      </Routes>
    </Router>
  );
};

export default App;
