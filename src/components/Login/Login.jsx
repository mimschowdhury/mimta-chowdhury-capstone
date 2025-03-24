// src/components/Login/Login.jsx
import React, { useState } from "react";
import "./Login.scss";

const Login = ({ isOpen, onClose }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getUsers = () => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers
      ? JSON.parse(storedUsers)
      : [{ username: "6ixuser", email: "user@6ixcafes.com", password: "cafe123" }];
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const users = getUsers();
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", username);
      setError("");
      alert("Login successful!");
      onClose();
      resetForm();
      // Trigger storage event to update Header
      window.dispatchEvent(new Event('storage'));
    } else {
      setError("Invalid username or password");
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const users = getUsers();

    if (users.some((u) => u.username === username)) {
      setError("Username already exists");
      return;
    }

    if (!email.includes("@") || password.length < 6) {
      setError("Please provide a valid email and a password (min 6 characters)");
      return;
    }

    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", username);
    setError("");
    setSuccess("Sign up successful! You're now logged in.");
    setTimeout(() => {
      onClose();
      resetForm();
      // Trigger storage event to update Header
      window.dispatchEvent(new Event('storage'));
    }, 1500);
  };

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setError("");
    setSuccess("");
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay">
      <div className="login-modal">
        <h2>{isLoginMode ? "6ixCafes Login" : "Sign Up for 6ixCafes"}</h2>
        <form onSubmit={isLoginMode ? handleLogin : handleSignUp}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            required
          />
          {!isLoginMode && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          {error && <p className="login-error">{error}</p>}
          {success && <p className="login-success">{success}</p>}
          <button type="submit" className="login-button">
            {isLoginMode ? "Login" : "Sign Up"}
          </button>
          <button type="button" className="toggle-mode-button" onClick={() => setIsLoginMode(!isLoginMode)}>
            {isLoginMode ? "Need an account? Sign Up!" : "Already have an account? Login."}
          </button>
          <button type="button" className="close-button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

