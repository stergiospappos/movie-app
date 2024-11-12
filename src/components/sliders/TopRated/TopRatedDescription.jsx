// TopRatedDescription.jsx

import React, { useEffect, useState } from "react";
import { fetchTopRatedMovies } from "../../../api";

// Helper function to generate the description text
function generateDescription(movies) {
  if (movies.length === 0) return "";

  const topMovies = movies.slice(0, 3);
  const movieTitles = topMovies.map((movie) => movie.title).join(", ");

  return `Don't miss the best of the best! Top-rated movies like ${movieTitles} are highly acclaimed. Click to see trailers and find out why they're must-watch!`;
}

const TopRatedDescription = () => {
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTopRatedMovies((movies) => {
      const desc = generateDescription(movies);
      setDescription(desc);
    });
  }, []);

  return <p className="slider-description">{description}</p>;
};

export default TopRatedDescription;
