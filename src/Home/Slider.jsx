import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useDrag } from "@use-gesture/react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import "./Slider.css";
import { fetchTopRatedMovies, fetchMovieTrailer } from "../api";

const Slider = () => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const cardRef = useRef(null);

  const visibleCards = 3;

  useEffect(() => {
    // Fetch top-rated movies on component mount
    fetchTopRatedMovies((movies) => {
      setTopRatedMovies(movies);
    });
  }, []);

  useEffect(() => {
    // Fetch top-rated movies
    fetchTopRatedMovies(async (topRatedMovies) => {
      // Fetch trailers for each movie and attach to movie data
      const moviesWithTrailers = await Promise.all(
        topRatedMovies.map(async (movie) => {
          // Fetch trailer link for each movie
          const trailerLink = await new Promise((resolve) =>
            fetchMovieTrailer(movie.id, resolve)
          );
          return { ...movie, trailerLink: trailerLink || "#" }; // Fallback if no trailer
        })
      );
      setTopRatedMovies(moviesWithTrailers); // Set state with movies that include trailer links
    });
  }, []);

  const handleNext = () => {
    if (currentIndex < topRatedMovies.length - visibleCards) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Draggable slider setup using useDrag
  const bind = useDrag(
    ({ movement: [mx], memo = currentIndex, direction: [dx], velocity }) => {
      if (Math.abs(mx) > 50 && velocity > 0.2) {
        if (dx < 0 && currentIndex < topRatedMovies.length - visibleCards) {
          // Dragging left
          setCurrentIndex((prev) => prev + 1);
        } else if (dx > 0 && currentIndex > 0) {
          // Dragging right
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
        <div className="movie-slider" ref={sliderRef}>
          {topRatedMovies.map((movie, index) => (
            <div
              className="movie-card"
              key={movie.title}
              ref={index === 0 ? cardRef : null}
              style={{
                backgroundImage: `url(${movie.image})`,
              }}
            >
              <div className="movie-rating">Rating: {movie.rating}</div>
              <h3 className="movie-card-title">{movie.title}</h3>

              <a
                href={movie.trailerLink}
                target="_blank"
                rel="noopener noreferrer"
                className="movie-trailer-link"
              >
                Watch Trailer
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="movie-controls">
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          <ArrowLeft />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === topRatedMovies.length - visibleCards}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Slider;
