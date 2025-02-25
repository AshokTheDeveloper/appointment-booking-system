import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="home-links">
        <h1 className="fs-3 fw-bold">
          Babe<span className="text-primary">Care</span>
        </h1>
      </Link>
      <nav>
        <Link to="/" className="links">
          <span className="text-primary fw-bold">Doctors</span>
        </Link>
        <Link to="/appointments" className="links">
          <span className="text-primary fw-bold">Appointments</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
