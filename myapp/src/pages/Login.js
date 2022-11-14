import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CredentialsContext } from "../App";

import './styles.css'

export const handleErrors = async (response) => {
  if (!response.ok) {
    const { message } = await response.json();
    throw Error(message);
  }
  return response.json();
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [, setCredentials] = useContext(CredentialsContext);

  const login = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
      }),
    })
      .then(handleErrors)
      .then(() => {
        setCredentials({
          username,
        });
        history("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const history = useNavigate()

  return (
    <div className="login-container">
      <div className="form-container">
        <h1>Login</h1>
        {error && <span style={{ color: "red" }}>{error}</span>}
        <form onSubmit={login}>
          <input
            className="input"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
          <br />
          <button className="button" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export  default Login