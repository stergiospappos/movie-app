import React, { useState } from "react";
import {
  Menu,
  Film,
  Search,
  Bell,
  ChevronDown,
  Link as LinkIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import profileImage from "../../assets/header/peeps-avatar-alpha.png";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          <Film size={24} />
          <span className="header__title">MovieHub</span>
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <nav className={`header__nav ${isMenuOpen ? "open" : ""}`}>
        <a href="#movies" className="header__link">
          Movies
        </a>
        <a href="#new-popular" className="header__link">
          New & Popular
        </a>
      </nav>

      {/* Right Icons */}
      <div className="header__icons">
        <button className="header__icon" aria-label="Search">
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
    </header>
  );
};

export default Header;
