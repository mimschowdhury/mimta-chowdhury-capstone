import "./PhotoPageHeader.scss";
import arrowIcon from "../../assets/images/Arrow.svg";
import { Link } from "react-router-dom";

const PhotoPageHeader = () => {
    return (
        <header className="header">
            <Link to="/" className="header__link">
                <h1 className="header__title">6ixCafes</h1>
            </Link>
            <Link to="/" className="header__home-link">
                <img src={arrowIcon} alt="back arrow" className="header__icon" />
                Home
            </Link>
        </header>
    );
}

export default PhotoPageHeader;