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

// Fetches movies matching a search query
export function searchMovies(query, callback) {
  fetchFromAPI("/search/movie", { query }, (data) => {
    const searchResults = data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      releaseDate: movie.release_date,
      rating: movie.vote_average,
      image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    }));
    callback(searchResults);
  });
}

// Fetches detailed data for a single movie by its ID
export function fetchSingleMovie(id, callback) {
  // Fetch main movie details
  fetchFromAPI(`/movie/${id}`, {}, (data) => {
    const movieDetails = {
      id: data.id,
      title: data.title,
      description: data.overview,
      releaseDate: data.release_date,
      runtime: data.runtime,
      genres: data.genres.map((genre) => genre.name).join(" | "),
      rating: data.vote_average,
      image: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/w500${data.backdrop_path}`,
      trailerLink: "", // Placeholder for trailer link
      cast: [],
      creators: [],
    };

    // Fetch the trailer video
    fetchMovieTrailer(id, (trailerLink) => {
      movieDetails.trailerLink = trailerLink || "#"; // fallback if no trailer found

      // Fetch credits (cast and crew)
      fetchFromAPI(`/movie/${id}/credits`, {}, (creditsData) => {
        // Top 5 cast members with images
        movieDetails.cast = creditsData.cast.slice(0, 6).map((member) => ({
          name: member.name,
          character: member.character,
          image: member.profile_path
            ? `https://image.tmdb.org/t/p/w300${member.profile_path}`
            : null,
        }));

        // Find directors and main stars
        movieDetails.creators = creditsData.crew
          .filter((member) => member.job === "Director")
          .map((director) => director.name)
          .join(", ");

        callback(movieDetails);
      });
    });
  });
}

// Fetches similar movies for a given movie ID
export function fetchSimilarMovies(id, callback) {
  fetchFromAPI(`/movie/${id}/similar`, {}, (data) => {
    const similarMovies = data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      releaseDate: movie.release_date,
      rating: movie.vote_average,
      image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    }));
    callback(similarMovies);
  });
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

// Fetches upcoming movies
export function fetchUpcomingMovies(callback) {
  fetchFromAPI("/movie/upcoming", { page: 1 }, (data) => {
    const upcomingMovies = data.results.map((movie) => ({
      id: movie.id,
      image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      title: movie.title,
      description: movie.overview,
      releaseDate: movie.release_date,
    }));
    callback(upcomingMovies);
  });
}

// Fetches popular movies
export function fetchPopularMovies(callback) {
  fetchFromAPI("/movie/popular", { page: 1 }, (data) => {
    const popularMovies = data.results.map((movie) => ({
      id: movie.id,
      image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      title: movie.title,
      description: movie.overview,
      releaseDate: movie.release_date,
    }));
    callback(popularMovies);
  });
}

// Fetches now playing movies
export function fetchNowPlayingMovies(callback) {
  fetchFromAPI("/movie/now_playing", { page: 1 }, (data) => {
    const nowPlayingMovies = data.results.map((movie) => ({
      id: movie.id,
      image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      title: movie.title,
      description: movie.overview,
      releaseDate: movie.release_date,
    }));
    callback(nowPlayingMovies);
  });
}
