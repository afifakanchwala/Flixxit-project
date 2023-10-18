import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import "../Styles/SignUp.css";

import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValue, setFormValue] = useState({
    username: "",
    email: "",
    password: "",
  });

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
  const nameHandler = (e) => {
    setFormValue({ ...formValue, username: e.target.value });
  };
  const emailHandler = (e) => {
    setFormValue({ ...formValue, email: e.target.value });
  };
  const passHandler = (e) => {
    setFormValue({ ...formValue, password: e.target.value });
  };

  const passwordbuttonHandler = () => {
    setShowPassword(true);
  };
  const signUpHandler = async () => {
    //console.log(formValue);
    try {
      const { email, password } = formValue;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="signup-component">
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="form">
            <input
              type="text"
              placeholder="User name"
              name="username"
              value={formValue.username}
              onChange={nameHandler}
            />
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formValue.email}
              onChange={emailHandler}
            />
            {showPassword && (
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formValue.password}
                onChange={passHandler}
              />
            )}

            {!showPassword && (
              <button onClick={passwordbuttonHandler}>Get Started</button>
            )}
          </div>
          <button className=" signup-btn" onClick={signUpHandler}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
