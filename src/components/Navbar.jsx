
import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const onImageLoad = () => console.log("✅ Logo chargé");
  const onImageError = (e) => {
    const img = e.target;
    img.src =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Tunisie_Telecom_logo.svg/256px-Tunisie_Telecom_logo.svg.png";
    img.onerror = null;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <div className="navbar-logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/9/99/Tunisie_Telecom_Logo.png?v=3"
              alt="Logo Tunisie Telecom"
              className="logo-img"
              onLoad={onImageLoad}
              onError={onImageError}
            />
          </div>
          <div className="navbar-brand">
            <span className="brand-text">Espace Client</span>
          </div>
        </div>
        <div className="navbar-right">
          <div className="nav-links">
            <NavLink to="/" end className="nav-link">Home</NavLink>
            <NavLink to="/login" className="nav-link">Login</NavLink>
            <NavLink to="/inscription" className="nav-link">Inscription</NavLink>
            <NavLink to="/dashboard-client" className="nav-link">Dashboard Client</NavLink>
            <NavLink to="/dashboard-admin" className="nav-link">Dashboard Admin</NavLink>
            <NavLink to="/subscriptions" className="nav-link">Subscriptions</NavLink>
            <NavLink to="/requests" className="nav-link">Requests</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
