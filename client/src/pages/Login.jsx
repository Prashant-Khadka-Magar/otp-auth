import axios from "axios";
import React, { useState } from "react";
import { MAIN_URL } from "../constants";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()

  const loginCall = async (data) => {
    try {
      const res = await axios.post(`${MAIN_URL}/login`, data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res.data);
      navigate('/home')
    } catch (error) {
      alert(error.response.data);
      console.log(error)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    loginCall({
      email,
      password,
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
