import React, { useEffect, useRef, useState } from "react";
import "../Styles/CardSlider.css";
import Card from "./Card";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
const CardSlider = ({ data, title }) => {
  const listRef = useRef();
  const parentRef = useRef();
  const [showControls, setShowControls] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  useEffect(() => {
    // Attach the mouseenter and mouseleave event handlers to the parent container

    const handleMouseEnter = () => {
      setShowControls(true);
    };

    const handleMouseLeave = () => {
      setShowControls(false);
    };
    const parentElement = parentRef.current; // Cache the current value
    if (parentElement) {
      parentRef.current.addEventListener("mouseenter", handleMouseEnter);
      parentRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    // return () => {
    //   // Clean up event listeners when the component unmounts
    //   parentRef.current.removeEventListener("mouseenter", handleMouseEnter);
    //   parentRef.current.removeEventListener("mouseleave", handleMouseLeave);
    // };
  }, []);

  // for handling the direction of slider
  const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 4) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };
  return (
    <div className=" card-slider flex column" ref={parentRef}>
      <h1>{title}</h1>
      <div className="wrapper">
        <div
          className={`slider-action left ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineLeft onClick={() => handleDirection("left")} />
        </div>
        <div className="slider flex" ref={listRef}>
          {data.map((movie, index) => {
            return <Card movieData={movie} index={index} key={movie.id} />;
          })}
        </div>
        <div
          className={`slider-action right ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineRight onClick={() => handleDirection("right")} />
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
