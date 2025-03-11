import "./Header.scss";
import Filter from "../Filter/Filter";
import { Link } from "react-router-dom";


const Header = ({ openDrawer, isDrawerOpen }) => {
    return (
    <header className="header">
        <Link to="/" className="header__title-link">
            <h1 className="header__title">6ixCafes</h1>
        </Link>
        <Filter openDrawer={openDrawer} isDrawerOpen={isDrawerOpen} />
    </header>
    );
}

export default Header;