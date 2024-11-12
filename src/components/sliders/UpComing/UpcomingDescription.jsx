// UpComingDescription.jsx

import React, { useEffect, useState } from "react";
import { fetchUpcomingMovies } from "../../../api";

// Helper function to generate the description text
function generateDescription(movies) {
  if (movies.length === 0) return "";

  const topMovies = movies.slice(0, 3);
  const movieTitles = topMovies.map((movie) => movie.title).join(", ");

  return `Get ready for the latest releases! Upcoming movies like ${movieTitles} and more are just around the corner. Click to see details and trailers!`;
}

const UpComingDescription = () => {
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchUpcomingMovies((movies) => {
      const desc = generateDescription(movies);
      setDescription(desc);
    });
  }, []);

  return <p className="slider-description">{description}</p>;
};

export default UpComingDescription;
