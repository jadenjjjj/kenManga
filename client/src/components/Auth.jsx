import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Auth.css'

const Auth = (props) => {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleLoginSuccess = (token) => {
    localStorage.setItem("token", token);
    fetch('http://localhost:4000/api/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      const { user } = data;
      props.setUser({ isLoggedIn: true, name: user.name, email: user.email });
      console.log("Received token:", token, "name:", user.name, "email:", user.email);
    })
    .catch(error => {
      console.error(error);
      // Handle error fetching user data
    });
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login logic
      console.log("Sending login request with email:", email);
      fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
        .then(response => response.json())
        .then(data => {
          console.log("Received login response:", data);
          const { token, name, email } = data;
          handleLoginSuccess(data.token, data.user);
          navigate("/mangas");
          // Handle response from the backend
        })
        .catch(error => console.error(error));
    } else {
      // Handle sign up logic
      console.log("Sending signup request with username:", username, "email:", email, "password:", password);
      // Validate email format
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        setEmailError("Please enter a valid email address.");
        return;
      }

      fetch('http://localhost:4000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name:username, email, password })
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Request failed with status ' + response.status);
        }
      })
      .then(data => {
        console.log("Received signup response:", data);
        window.location.reload();
        // Handle response from the backend
      })
      .then(response => {
        console.log("Raw response from backend:", response);
        return response;
      })
      .catch(error => {
        console.error(error);
        console.log("Signup request failed with error:", error);
        console.log("Signup request failed with response:", error.response);
      });
    }
  };
  

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isLogin ? "Log in" : "Sign up"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-container">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">{isLogin ? "Log in" : "Sign up"}</button>
        </form>
        <p>
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign up" : "Log in"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
