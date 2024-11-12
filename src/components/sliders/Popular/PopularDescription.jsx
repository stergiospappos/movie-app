// PopularDescription.jsx

import React, { useEffect, useState } from "react";
import { fetchPopularMovies } from "../../../api";

// Helper function to generate the description text
function generateDescription(movies) {
  if (movies.length === 0) return "";

  const topMovies = movies.slice(0, 3);
  const movieTitles = topMovies.map((movie) => movie.title).join(", ");

  return `Check out what's trending! Popular movies like ${movieTitles} are capturing audiences. Click to watch trailers and see why they're a hit!`;
}

const PopularDescription = () => {
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchPopularMovies((movies) => {
      const desc = generateDescription(movies);
      setDescription(desc);
    });
  }, []);

  return <p className="slider-description">{description}</p>;
};

export default PopularDescription;
