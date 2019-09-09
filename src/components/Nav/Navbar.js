import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header>
      <nav class="container">
        <div class="home">
          <a href="#" class="navLinks">
            Home
          </a>
        </div>
        <div class="about">
          <a href="#" class="navLinks">
            About
          </a>
        </div>
        <div class="blog">
          <a href="#" class="navLinks">
            Blog
          </a>
        </div>
        <div class="contact">
          <a href="#" class="navLinks">
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
