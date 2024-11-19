import React, { useState } from "react";
import { Menu, Film, Search, Bell, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import profileImage from "../../assets/header/peeps-avatar-alpha.png";
import "./Header.css";
import { searchMovies } from "../../api"; // Import the search function

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setQuery("");
    setSearchResults([]);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setQuery(query);

    if (query) {
      searchMovies(query, (results) => {
        setSearchResults(results);
      });
    } else {
      setSearchResults([]);
    }
  };

  const formatTitleWithYear = (title, releaseDate) => {
    const year = releaseDate ? `(${new Date(releaseDate).getFullYear()})` : "";
    return `${title} ${year}`;
  };

  return (
    <header className="header">
      {/* Hamburger Menu Icon */}
      <button
        className="header__icon header__menu"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      {/* Logo */}
      <div className="header__logo">
        <Link aria-label="Home" to="/">
          <span className="header__title">MovieHub</span>
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <nav className={`header__nav ${isMenuOpen ? "open" : ""}`}>
        <a href="#now-playing" className="header__link">
          Now Playing
        </a>
        <a href="#popular" className="header__link">
          Popular
        </a>
      </nav>

      {/* Right Icons */}
      <div className="header__icons">
        <button
          className="header__icon"
          onClick={toggleSearch}
          aria-label="Search"
        >
          <Search size={20} />
        </button>
        <button className="header__icon" aria-label="Notifications">
          <Bell size={20} />
        </button>

        {/* Profile with Chevron */}
        <div className="header__profile">
          <img
            src={profileImage}
            alt="User Profile"
            className="header__profile-pic"
          />
          <ChevronDown size={16} />
        </div>
      </div>

      {/* Search Dropdown */}
      {isSearchOpen && (
        <div className="header__search">
          <input
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={handleSearch}
            className="header__search-input"
          />
          {searchResults.length > 0 && (
            <ul className="header__search-dropdown">
              {searchResults.map((movie) => (
                <li key={movie.id} className="header__search-item">
                  <Link to={`/movie/${movie.id}`} className="header__link">
                    {formatTitleWithYear(movie.title, movie.releaseDate)}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
