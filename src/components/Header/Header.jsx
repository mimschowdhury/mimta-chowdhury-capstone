// src/components/Header/Header.jsx
import React, { useState, useEffect } from "react";
import "./Header.scss";
import Filter from "../Filter/Filter";
import { Link } from "react-router-dom";

const Header = ({ isGridView, toggleView, tags, selectedTag, onFilterChange, onLoginClick, }) => {
  // State to manage authentication status
  const [authState, setAuthState] = useState({
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
    currentUser: localStorage.getItem("currentUser") || "",
  });

  // Listen for changes in localStorage (triggered by Login or Logout)
  useEffect(() => {
    const handleStorageChange = () => {
      setAuthState({
        isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
        currentUser: localStorage.getItem("currentUser") || "",
      });
    };

    // Add event listener for 'storage' events
    window.addEventListener("storage", handleStorageChange);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    setAuthState({ isLoggedIn: false, currentUser: "" }); // Update state immediately
    alert("Logged out successfully!");
    // Trigger storage event to notify other components
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <header className="header">
      <Link to="/" className="header__title-link">
        <h1 className="header__title">6ixCafes</h1>
      </Link>
      <nav className="header__nav">
        <label className="toggle-switch">
          <input type="checkbox" checked={isGridView} onChange={toggleView} />
          <span className="slider"></span>
          <span className="mode-label">
            {isGridView ? "Grid Mode" : "Scroll Mode"}
          </span>
        </label>
        <Link to="/about" className="header__nav-link">
          About
        </Link>
        <Link to="/quiz" className="header__nav-link">
          Discover Cafes
        </Link>
        <Link to="/favourites" className="header__nav-link">
          My Favourites
        </Link>
        <Link to="/locations" className="header__nav-link">
          Locations
        </Link>
        {authState.isLoggedIn ? (
          <span
            className="header__nav-link"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            Logout ({authState.currentUser})
          </span>
        ) : (
          <span
            className="header__nav-link"
            onClick={onLoginClick}
            style={{ cursor: "pointer" }}
          >
            Login
          </span>
        )}
        <Filter
          tags={tags}
          selectedTag={selectedTag}
          onFilterChange={onFilterChange}
        />
      </nav>
    </header>
  );
};

export default Header;

