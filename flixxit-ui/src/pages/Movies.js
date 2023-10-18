import React, { useEffect, useState } from "react";
import "../Styles/Movies.css";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMovies, getGenres } from "../store/store";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import NotAvailable from "../components/NotAvailable";
import Slider from "../components/Slider";
import SelectGenre from "../components/SelectGenre";

const Movies = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);

  const movies = useSelector((state) => state.flixxit.movies);
  const genres = useSelector((state) => state.flixxit.genres);
  const genresLoaded = useSelector((state) => state.flixxit.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "movie" }));
    }
  }, [genresLoaded]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setUser(currentUser.uid);
    else navigate("/login");
  });
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div>
      <div className="navbar">
        <Navbar onScrolled={isScrolled} />
      </div>
      <div className="data">
        <SelectGenre genres={genres} type="movie" />
        {movies && movies.length > 0 ? (
          <Slider onMovies={movies} />
        ) : (
          <NotAvailable />
        )}
      </div>
    </div>
  );
};

export default Movies;
