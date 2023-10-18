import React from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import "../Styles/Login.css";

import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  // using 'navigate' inside useEffect hook
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        navigate("/");
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, [navigate]);

  const loginEmailHandler = (e) => {
    setEmail(e.target.value);
  };
  const loginPassHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = async () => {
    //console.log(formValue);
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.log(err.code, err.message);
    }
  };

  return (
    <div className="login-component">
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="forms flex column a-center j-center">
            <div className="title">
              <h1>Login</h1>
            </div>
            <div className="container flex column">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                onChange={loginEmailHandler}
                value={email}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={loginPassHandler}
                value={password}
              />
              <button onClick={loginHandler}>Log In</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
