import {
  ChevronRight,
  Play,
  Popcorn,
  CalendarArrowUp,
  TrendingUp,
  Star,
} from "lucide-react";
import "./Home.css";
import React, { useEffect, useState } from "react";
import { fetchLatestPopularMovie, fetchTopRatedMovies } from "../api.js";
import TopRatedSlider from "../components/sliders/TopRated/TopRatedSlider.jsx";
import UpcomingMoviesSlider from "../components/sliders/UpComing/UpComingSlider.jsx";
import PopularMoviesSlider from "../components/sliders/Popular/PopularSlider.jsx";
import NowPlayingMoviesSlider from "../components/sliders/NowPlaying/NowPlayingSlider.jsx";
import NowPlayingDescription from "../components/sliders/NowPlaying/NowPlayingDescription.jsx";
import UpComingDescription from "../components/sliders/UpComing/UpcomingDescription.jsx";
import PopularDescription from "../components/sliders/Popular/PopularDescription.jsx";
import TopRatedDescription from "../components/sliders/TopRated/TopRatedDescription.jsx";

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
      <section className="movies-slider">
        <h3>
          <Popcorn /> Now Playing
        </h3>
        <NowPlayingDescription />
        <NowPlayingMoviesSlider />
      </section>
      <section className="movies-slider">
        <h3>
          <CalendarArrowUp /> Up-Coming Movies
        </h3>

        <UpComingDescription />
        <UpcomingMoviesSlider />
      </section>
      <section className="movies-slider">
        <h3>
          <TrendingUp /> Popular Movies
        </h3>
        <PopularDescription />
        <PopularMoviesSlider />
      </section>
      <section className="movies-slider">
        <h3>
          <Star /> Top Rated Movies
        </h3>
        <TopRatedDescription />
        <TopRatedSlider />
      </section>
    </main>
  );
};

export default Home;
