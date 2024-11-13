import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useDrag } from "@use-gesture/react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { fetchSimilarMovies } from "../api"; // Ensure path is correct
import { Link, useParams } from "react-router-dom";
import "../components/sliders/Slider.css"; // Ensure this path is correct

const SimilarMoviesSlider = () => {
  const { id } = useParams(); // Movie ID from URL params
  const [similarMovies, setSimilarMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const cardRef = useRef(null);

  const visibleCards = 3;

  useEffect(() => {
    fetchSimilarMovies(id, setSimilarMovies);
  }, [id]);

  const handleNext = () => {
    if (currentIndex < similarMovies.length - visibleCards) {
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
        if (dx < 0 && currentIndex < similarMovies.length - visibleCards) {
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
      <div
        className="movie-slider-wrapper"
        {...bind()}
        style={{ touchAction: "none" }}
      >
        <div className="movie-slider" ref={sliderRef}>
          {similarMovies.map((movie, index) => {
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
                <h3 className="movie-card-title">{movie.title}</h3>
                <p className="movie-rating">Rating: {movie.rating}</p>

                {/* Main Link for Movie Details */}
                <Link
                  to={`/movie/${movie.id}`}
                  aria-label={`View details for ${movie.title}`}
                  className="movie-details-link"
                >
                  View Details
                </Link>
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
          disabled={currentIndex >= similarMovies.length - visibleCards}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default SimilarMoviesSlider;
