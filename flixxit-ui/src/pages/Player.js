import React from "react";

import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import "../Styles/Player.css";

const Player = () => {
  const navigate = useNavigate();
  return (
    <div className="player-page">
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <video
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          autoPlay
          loop
          controls
          muted
        />
      </div>
    </div>
  );
};

export default Player;
