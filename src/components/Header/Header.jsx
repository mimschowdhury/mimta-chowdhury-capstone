// Header.jsx
import "./Header.scss";
import Filter from "../Filter/Filter";
import { Link } from "react-router-dom";

const Header = ({ isGridView, toggleView, tags, selectedTag, onFilterChange }) => {
    return (
        <header className="header">
            <Link to="/" className="header__title-link">
                <h1 className="header__title">6ixCafes</h1>
            </Link>
            <nav className="header__nav">
                <label className="toggle-switch">
                    <input type="checkbox" checked={isGridView} onChange={toggleView} />
                    <span className="slider"></span>
                    <span className="mode-label">{isGridView ? "Grid Mode" : "Scroll Mode"}</span>
                </label>
                <Link to="/about" className="header__nav-link">About</Link>
                <Link to="/quiz" className="header__nav-link">Discover Cafes</Link>
                <Link to="/favourites" className="header__nav-link">My Favourites</Link>
                <Link to="/locations" className="header__nav-link">Locations</Link>
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