import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useDrag } from "@use-gesture/react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import "../Slider.css";
import { fetchNowPlayingMovies, fetchMovieTrailer } from "../../../api"; // Import fetchNowPlayingMovies
import { Link } from "react-router-dom";

const NowPlayingMoviesSlider = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const cardRef = useRef(null);

  const visibleCards = 3;

  useEffect(() => {
    // Fetch now playing movies on component mount
    fetchNowPlayingMovies((movies) => {
      setNowPlayingMovies(movies);
    });
  }, []);

  useEffect(() => {
    // Fetch now playing movies with trailers
    fetchNowPlayingMovies(async (nowPlayingMovies) => {
      const moviesWithTrailers = await Promise.all(
        nowPlayingMovies.map(async (movie) => {
          const trailerLink = await new Promise((resolve) =>
            fetchMovieTrailer(movie.id, resolve)
          );
          return { ...movie, trailerLink: trailerLink || "#" };
        })
      );
      setNowPlayingMovies(moviesWithTrailers); // Set state with movies that include trailer links
    });
  }, []);

  const handleNext = () => {
    if (currentIndex < nowPlayingMovies.length - visibleCards) {
      setCurrentIndex(currentIndex + 2);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 2);
    }
  };

  const bind = useDrag(
    ({ movement: [mx], memo = currentIndex, direction: [dx], velocity }) => {
      if (Math.abs(mx) > 50 && velocity > 0.2) {
        if (dx < 0 && currentIndex < nowPlayingMovies.length - visibleCards) {
          setCurrentIndex((prev) => prev + 1);
        } else if (dx > 0 && currentIndex > 0) {
          setCurrentIndex((prev) => prev - 1);
        }
      }
      return memo;
    },
    { axis: "x" }
  );

  useEffect(() => {
    if (cardRef.current) {
      const cardWidth = cardRef.current.getBoundingClientRect().width;
      gsap.to(sliderRef.current, {
        x: -currentIndex * cardWidth,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [currentIndex]);

  return (
    <div className="movie-slider-container">
      <div className="movie-slider-wrapper" {...bind()}>
        <div key="NowPlayingSlider" className="movie-slider" ref={sliderRef}>
          {nowPlayingMovies.map((movie, index) => {
            const formattedDate = new Date(
              movie.releaseDate
            ).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            });

            return (
              <div
                key={movie.id}
                className="movie-card"
                ref={index === 0 ? cardRef : null}
                style={{
                  backgroundImage: `url(${movie.image})`,
                }}
              >
                <div className="movie-rating">
                  Release Date: {formattedDate}
                </div>
                <h3 className="movie-card-title">{movie.title}</h3>

                {/* Main Link for Movie Details */}
                <Link
                  to={`/movie/${movie.id}`}
                  aria-label={`View details for ${movie.title}`}
                  className="movie-details-link"
                >
                  View Details
                </Link>

                {/* Trailer Link */}
                <a
                  href={movie.trailerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch trailer for ${movie.title}`}
                  className="movie-trailer-link"
                >
                  Watch Trailer
                </a>
              </div>
            );
          })}
        </div>
      </div>
      <div className="movie-controls">
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          <ArrowLeft />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === nowPlayingMovies.length - visibleCards}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default NowPlayingMoviesSlider;
