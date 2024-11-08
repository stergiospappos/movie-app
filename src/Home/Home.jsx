import { ChevronRight, Play } from "lucide-react";
import "./Home.css";
import React, { useEffect, useState } from "react";
import { fetchLatestPopularMovie, fetchTopRatedMovies } from "../api.js";
import Slider from "./Slider.jsx";

const Home = () => {
  const [latestMovie, setLatestMovie] = useState(null);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const truncateDescription = (text) => {
    if (!text) return "";
    const periodIndex = text.indexOf(".");
    return periodIndex !== -1 ? text.substring(0, periodIndex + 1) : text;
  };

  useEffect(() => {
    fetchLatestPopularMovie(setLatestMovie);
    fetchTopRatedMovies(setTopRatedMovies);
  }, []);

  return (
    <main>
      <section className="hero">
        {latestMovie && (
          <>
            <img
              src={latestMovie.image}
              alt={latestMovie.title}
              className="hero__image"
            />
            <div className="hero__content">
              <span className="hero__badge">Latest Top Movie</span>
              <h1 className="hero__title">{latestMovie.title}</h1>
              <p className="hero__description">
                {truncateDescription(latestMovie.description)}
              </p>

              <div className="hero__buttons">
                <a
                  href={latestMovie.trailerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero__button hero__button--watch"
                >
                  <Play size={18} />
                  Watch Trailer
                </a>
                <button className="hero__button hero__button--info">
                  More Info <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="hero__controls">
              <button className="hero__control hero__control--previous">
                &lt;
              </button>
              <button className="hero__control hero__control--next">
                &gt;
              </button>
            </div>
          </>
        )}
      </section>
      <section className="best-movies">
        <h3>Top Rated Movies</h3>
        <Slider />
        {/* <ul>
          {topRatedMovies.map((movie) => (
            <li key={movie.title}>
              <h4>{movie.title}</h4>
              <img src={movie.image} alt={movie.title} />
              <p>{movie.description}</p>
              <a href={movie.trailerLink}>Watch Trailer</a>
              <p>Rating: {movie.rating}</p>
            </li>
          ))}
        </ul> */}
      </section>
    </main>
  );
};

export default Home;
