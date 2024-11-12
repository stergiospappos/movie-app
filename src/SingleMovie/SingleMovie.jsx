// SingleMovie.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleMovie, fetchSimilarMovies } from "../api";
import SimilarMoviesSlider from "./similarMoviesSlider";
import "./SingleMovie.css";

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]); // Add this line

  useEffect(() => {
    fetchSingleMovie(id, setMovie);
    fetchSimilarMovies(id, setSimilarMovies); // Now setSimilarMovies is defined
  }, [id]);

  if (!movie.title)
    return (
      <div className="loading-container">
        <p className="loading">Loading...</p>
      </div>
    );

  return (
    <main>
      <section className="single-movie">
        <div className="single-movie--container">
          <div className="movie-details">
            <h1>{movie.title}</h1>
            <div className="first-details">
              <p>{movie.releaseDate}</p>
              <p>|</p>
              <p>{movie.runtime} minutes</p>
            </div>
            <div className="image-video">
              <img
                src={movie.image}
                alt={`${movie.title} poster`}
                className="movie-poster"
              />
              {/* Trailer Video */}
              {movie.trailerLink && movie.trailerLink !== "#" && (
                <div className="trailer-container">
                  <iframe
                    className="movie-trailer"
                    src={movie.trailerLink.replace("watch?v=", "embed/")}
                    title="Movie Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
            <p className="genres">{movie.genres}</p>

            <p className="desc">{movie.description}</p>
            <div className="movie-details-info">
              <p>
                <span className="tag">Rating:</span> {movie.rating}
              </p>
              <p>
                <span className="tag">Director:</span> {movie.creators}
              </p>
            </div>

            {/* Cast Section */}
            <div className="movie-cast">
              <h3>Top Cast</h3>
              <div className="cast-list">
                {movie.cast.map((member, index) => (
                  <div className="cast-member" key={index}>
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="cast-image"
                      />
                    ) : (
                      <div className="cast-image-placeholder">No Image</div>
                    )}
                    <div className="personal-details">
                      <p>
                        <strong>{member.name}</strong>
                      </p>
                      <p>as {member.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="similar-movies">
        <h3>Similar Movies</h3>
        <SimilarMoviesSlider />
      </section>
    </main>
  );
};

export default SingleMovie;
