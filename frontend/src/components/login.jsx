import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log("Login Successful:", data);
            navigate("/"); 
        } else {
            setError(data.message || "Login failed");
        }
    } catch (error) {
        console.error("Login Request Failed:", error.message);
        setError("An error occurred. Please try again.");
    }
};



  return (
    <div className={`${Style.box}`}>
      <h1>Login</h1>
      <form className={`${Style.form_container}`} onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className={`${Style.button} btn`}>
          Login
        </button>
        {error && <p className={Style.error}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
