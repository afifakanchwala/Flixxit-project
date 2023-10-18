import React from "react";
import "../Styles/Header.css";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  const logoHandler = () => {
    navigate(props.login ? "/login" : "/signup");
  };
  return (
    <div className="header-component flex a-center j-between ">
      <div className="logo">
        <span>FLIXXIT</span>
      </div>
      <button onClick={logoHandler}>
        {props.login ? "Log In" : "Sign In"}
      </button>
    </div>
  );
};

export default Header;
