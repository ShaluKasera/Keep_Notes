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
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/signup`,
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = response.data;
      if (response.status === 400) {
        setError("All fields are required");
      } else if (response.status === 409) {
        setError("User already exists! Please login.");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else if (response.status === 401) {
        setError(
          "Password must be 6-10 chars long, include uppercase, lowercase, digit, special character, and not contain your name."
        );
      } else if (response.status === 201) {
        setSuccess("Successfully signed up ");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError("Signup failed! Try again");
      }
    } catch (error) {
      console.error("Signup error details:", error);

      if (error.response && error.response.data && error.response.data.msg) {
        setError(error.response.data.msg);
      } else {
        setError("Server error occurred. Please try again.");
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
