import React from "react";
import background from "../assets/login.jpg";
import "../Styles/BackgroundImage.css";

const BackgroundImage = () => {
  return (
    <div className="background-image">
      <img className="image" src={background} alt="background" />
    </div>
  );
};

export default BackgroundImage;
