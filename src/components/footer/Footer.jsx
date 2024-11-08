import React from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Social Media Icons */}
      <div className="footer__socials">
        <a
          href="https://facebook.com"
          aria-label="Facebook"
          className="footer__icon"
        >
          <Facebook size={20} />
        </a>
        <a
          href="https://twitter.com"
          aria-label="Twitter"
          className="footer__icon"
        >
          <Twitter size={20} />
        </a>
        <a
          href="https://instagram.com"
          aria-label="Instagram"
          className="footer__icon"
        >
          <Instagram size={20} />
        </a>
        <a
          href="https://youtube.com"
          aria-label="YouTube"
          className="footer__icon"
        >
          <Youtube size={20} />
        </a>
      </div>

      {/* Footer Links */}
      <div className="footer__links">
        <a href="#about" className="footer__link">
          About Us
        </a>
        <a href="#contact" className="footer__link">
          Contact Us
        </a>
        <a href="#privacy" className="footer__link">
          Privacy Policy
        </a>
        <a href="#terms" className="footer__link">
          Terms of Service
        </a>
      </div>

      {/* Footer Text */}
      <p className="footer__text">© 2023 MovieHub. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
