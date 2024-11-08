// api.js

const API_KEY = "01947fdc028668cbba608f3d08618bef";
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchFromAPI(endpoint, params = {}, callback) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append("api_key", API_KEY);
  url.searchParams.append("language", "en");

  // Add any additional query parameters to the URL
  Object.keys(params).forEach((key) => {
    url.searchParams.append(key, params[key]);
  });

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

// Fetches the latest most popular movie with details
export function fetchLatestPopularMovie(callback) {
  fetchFromAPI("/movie/popular", { page: 1 }, (data) => {
    const movie = data.results[0];
    const movieDetails = {
      image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      title: movie.title,
      description: movie.overview,
      rating: movie.vote_average,
    };

    // Fetch the trailer for the latest popular movie
    fetchMovieTrailer(movie.id, (trailerLink) => {
      movieDetails.trailerLink = trailerLink || "#"; // fallback if no trailer found
      callback(movieDetails);
    });
  });
}

// Fetches all-time top-rated movies
export function fetchTopRatedMovies(callback) {
  fetchFromAPI("/movie/top_rated", { page: 1 }, (data) => {
    const topRatedMovies = data.results.map((movie) => ({
      id: movie.id,
      image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      title: movie.title,
      description: movie.overview,
      rating: movie.vote_average,
    }));
    callback(topRatedMovies);
  });
}

// Fetches movie trailer by movie ID
export function fetchMovieTrailer(movieId, callback) {
  fetchFromAPI(`/movie/${movieId}/videos`, {}, (data) => {
    const trailer = data.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );
    if (trailer) {
      callback(`https://www.youtube.com/watch?v=${trailer.key}`);
    } else {
      callback(null); // or a default value if no trailer is found
    }
  });
}
