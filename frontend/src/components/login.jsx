import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./login.module.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = response.data
      if (response.status === 200) {
        console.log("Login Successful:", data);
        setSuccess("Successfully logged in!");

        const { token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("tokenExpiry", Date.now() + 60 * 60 * 1000); // 1 hour

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else if (response.status === 404) {
        setError("User not found! Please register first.");
        setTimeout(() => {
          navigate("/signup");
        }, 1500);
      } else if (response.status === 401) {
        setError("Password not matched! Please try again.");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login Request Failed:", error.message);

      if (error.response && error.response.data && error.response.data.msg) {
        setError(error.response.data.msg);
      } else {
        setError("Server error occurred. Please try again.");
      }
    }
  };

  return (
    <div className={`${Style.box}`}>
      <h1>Login</h1>
      <form className={`${Style.form_container}`} onSubmit={handleSubmit}>
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
          Login
        </button>

        {error && <p className={Style.error}>{error}</p>}
        {success && <p className={Style.success}>{success}</p>}
      </form>
    </div>
  );
};

export default Login;
