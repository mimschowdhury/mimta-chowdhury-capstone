import "./Header.scss";
import Filter from "../Filter/Filter";
import { Link } from "react-router-dom";

const Header = ({ openDrawer, isDrawerOpen }) => {
    return (
        <header className="header">
            <Link to="/" className="header__title-link">
                <h1 className="header__title">6ixCafes</h1>
            </Link>
            <nav className="header__nav">
                <Link to="/about" className="header__nav-link">About</Link>
                <Link to="/quiz" className="header__nav-link">Discover Cafes</Link>
                <Link to="/favourites" className="header__nav-link">My Favourites</Link>
                <Link to="/locations" className="header__nav-link">Locations</Link>
                <Filter openDrawer={openDrawer} isDrawerOpen={isDrawerOpen} />
            </nav>
        </header>
    );
};

export default Header;