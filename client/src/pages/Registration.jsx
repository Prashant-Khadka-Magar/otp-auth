import React, { useEffect, useState } from "react";
import axios from "axios";
import { MAIN_URL, OTP_URL } from "../constants";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [count, setCount] = useState(59);
  const navigate = useNavigate();

  const resendCall = async (data) => {
    try {
      const res = await axios.post(`${OTP_URL}/resend`, data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res.data);
      navigate("/login");
    } catch (error) {
      alert(error.response.data);
      console.log(error);
    }
  };
  const registrationCall = async (data) => {
    try {
      const res = await axios.post(MAIN_URL, data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res.data);
      setShowOTPForm(true);
    } catch (error) {
      alert(error.response.data);
      console.log(error);
    }
  };

  const otpVerification = async (data) => {
    try {
      const res = await axios.post(OTP_URL, data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res.data);
      navigate("/login");
    } catch (error) {
      alert(error.response.data);
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registrationCall({
      username: name,
      email,
      password,
    });
  };

  const otpHandler = (e) => {
    e.preventDefault();
    otpVerification({
      email,
      otp,
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (count <= 0) {
        clearInterval(timer);
      } else {
        setCount((prev) => prev - 1);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [count]);

  return (
    <div>
      <h2>Register</h2>
      {!showOTPForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <button type="submit">Register</button>
        </form>
      )}
      {
        <div>
          <form onSubmit={otpHandler}>
            <div>
              <label htmlFor="otp">OTP:</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button type="submit"> Verify</button>
          </form>
          <div>
            {!count <= 0 ? (
              <span>0:{count < 10 ? "0" + count : count}</span>
            ) : (
              <span onClick={()=>resendCall({email})}>Resend OTP</span>
            )}
          </div>
        </div>
      }
    </div>
  );
}

export default Registration;
