import React, { useEffect, useState } from "react";
import "../Styles/HomePage.css";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import movieLogo from "../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store/store";
import Slider from "../components/Slider";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const genres = useSelector((state) => state.flixxit.genres);
  const movies = useSelector((state) => state.flixxit.movies);
  const genresLoaded = useSelector((state) => state.flixxit.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
  }, [genresLoaded]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  //console.log(movies);
  return (
    <div className="home-page">
      <Navbar onScrolled={isScrolled} />
      <div className="hero">
        <img
          src={backgroundImage}
          alt="background"
          className="background-img"
        />
        <div className="home-container">
          <div className="movie-logo">
            <img src={movieLogo} alt="Movie Logo" className="logo-img" />
          </div>

          <div className="buttons flex">
            <button
              className="btn flex j-center a-center"
              onClick={() => navigate("/player")}
            >
              <FaPlay />
              Play
            </button>
            <button className="btn flex j-center a-center">
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
        </div>
      </div>
      <Slider onMovies={movies} />
    </div>
  );
};

export default HomePage;
