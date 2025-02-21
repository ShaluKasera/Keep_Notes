import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Style from "./login.module.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error messages
    setSuccess(""); // Clear previous success messages

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/signup`,
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Response from server:", response.data);

      if (response.data.msg === "Successfully signed up") {
        setSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else if (response.data.msg === "User already exists") {
        setError("User already exists. Please login.");
        navigate("/login");
      } else {
        // Handle unexpected responses
        setError(response.data.msg || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error details:", error);

      if (error.response) {
        // Log error response from backend
        console.error("Error Response Status:", error.response.status);
        console.error("Error Response Data:", error.response.data);
        setError(
          error.response.data?.msg || "Signup failed. Please try again."
        );
        if (error.response.data?.msg === "User already exists") {
          navigate("/login"); 
        }

      } else if (error.request) {
        // Handle no response from server
        console.error("No response received:", error.request);
        setError(
          "No response from server. Check your API URL or server status."
        );
      } else {
        // Other errors
        console.error("Error setting up request:", error.message);
        setError("Request setup failed. Please try again.");
      }
    }
  };

  return (
    <div className={`${Style.box}`}>
      <h1>Signup</h1>
      <form className={`${Style.form_container}`} onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={`${Style.button} btn`}>
          Signup
        </button>
        {error && <p className={Style.error}>{error}</p>}
        {success && <p className={Style.success}>{success}</p>}
      </form>
    </div>
  );
};

export default Signup;
