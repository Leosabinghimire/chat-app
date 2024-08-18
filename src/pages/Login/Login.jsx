import React, { useState } from "react";
import "./Login.css";
import assests from "../../assets/assets";

const Login = () => {
  const [currState, setCurrState] = useState("Sign up");

  return (
    <div className="login">
      <img src={assests.logo_big} alt="logo big" className="logo" />

      <form className="login-form">
        <h2>{currState}</h2>
        {currState === "Sign up" ? (
          <input
            type="text"
            placeholder="Username"
            className="form-input"
            required
          />
        ) : null}
        <input
          type="email"
          placeholder="Email address"
          className="form-input"
          required
        />
        <input
          type="password"
          placeholder="password"
          className="form-input"
          required
        />
        <button type="submit">
          {currState === "Sign up" ? "create account" : "Login now"}
        </button>
        <div className="login-term">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>
        <div className="login-forget">
          {currState === "Sign up" ? (
            <p className="login-toggle">
              Already have an account{" "}
              <span onClick={() => setCurrState("Login")}> Login here</span>
            </p>
          ) : (
            <p className="login-toggle">
              Create and account
              <span onClick={() => setCurrState("Sign up")}> click here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
