// NowPlayingDescription.jsx

import React, { useEffect, useState } from "react";
import { fetchNowPlayingMovies } from "../../../api";

// Helper function to generate the description text
function generateDescription(movies) {
  if (movies.length === 0) return "";

  const topMovies = movies.slice(0, 3);
  const movieTitles = topMovies.map((movie) => movie.title).join(", ");

  return `Catch the latest hits in theaters now! Movies like ${movieTitles} are showing near you. Click to explore trailers and showtimes!`;
}

const NowPlayingDescription = () => {
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchNowPlayingMovies((movies) => {
      const desc = generateDescription(movies);
      setDescription(desc);
    });
  }, []);

  return <p className="slider-description">{description}</p>;
};

export default NowPlayingDescription;
