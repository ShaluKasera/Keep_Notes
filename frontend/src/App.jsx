import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Login from "./components/login";
import Signup from "./components/signup";
import CreateNotes from "./components/createNotes";
import Notes from "./components/showNotes";
import Home from './components/home'
import { useEffect } from "react";
function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/createNotes" element={<CreateNotes/>}/>
          <Route path="/ShowNotes" element={<Notes/>}/>
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
