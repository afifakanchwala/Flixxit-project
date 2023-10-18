import React from "react";
import "../Styles/SelectGenre.css";
import { useDispatch } from "react-redux";
import { fetchDataByGenre } from "../store/store";

const SelectGenre = ({ genres, type }) => {
  const dispatch = useDispatch();
  return (
    <select
      className="select flex"
      onChange={(e) => {
        dispatch(
          fetchDataByGenre({
            genres,
            genre: e.target.value,
            type,
          })
        );
      }}
    >
      {genres.map((genre) => {
        return (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        );
      })}
    </select>
  );
};

export default SelectGenre;
