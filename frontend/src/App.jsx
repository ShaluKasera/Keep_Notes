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
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'test@example.com', password: '123456' }),
    })
        .then((res) => res.json())
        .then((data) => console.log("Test Fetch Response:", data))
        .catch((err) => console.error("Test Fetch Error:", err));
}, []);


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
