import React, { useEffect, useState } from "react";
import "../Styles/UserLiked.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { getUsersLikedMovies } from "../store/store";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

const UserLiked = () => {
  const movies = useSelector((state) => state.flixxit.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });
  useEffect(() => {
    if (email) {
      dispatch(getUsersLikedMovies(email));
    }
  }, [email]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className="user-liked">
      <Navbar onScrolled={isScrolled} />
      <div className="liked flex column">
        <h1>My List</h1>
        <div className="grid flex">
          {movies ? (
            movies.map((movie, index) => (
              <Card
                movieData={movie}
                index={index}
                key={movie.id}
                isLiked={true}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserLiked;
