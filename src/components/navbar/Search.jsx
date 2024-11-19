import React, { useState, useEffect } from "react";
import "./Header.css"; // Assuming you're using the same CSS file

const MovieSearch = ({ fetchMovies }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query) {
        fetchMovies(query).then((data) => {
          setResults(data);
          setDropdownVisible(true);
        });
      } else {
        setResults([]);
        setDropdownVisible(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, fetchMovies]);

  const handleInputChange = (e) => setQuery(e.target.value);
  const handleBlur = () => setTimeout(() => setDropdownVisible(false), 200);
  const handleFocus = () => {
    if (results.length > 0) setDropdownVisible(true);
  };

  return (
    <div className="header__search">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="header__search-input"
      />
      {isDropdownVisible && (
        <ul className="header__search-dropdown">
          {results.map((movie) => (
            <li key={movie.id} className="header__search-item">
              <a href={`/movie/${movie.id}`} className="header__link">
                {movie.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieSearch;
