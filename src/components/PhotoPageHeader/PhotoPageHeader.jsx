import "./PhotoPageHeader.scss";
import arrowIcon from "../../assets/images/Arrow.svg";
import { Link } from "react-router-dom";

const PhotoPageHeader = () => {
    return (
        <header className="photoheader">
            <Link to="/" className="photoheader__link">
                <h1 className="photoheader__title">6ixCafes</h1>
            </Link>
            <Link to="/" className="photoheader__home-link">
                <img src={arrowIcon} alt="back arrow" className="photoheader__icon" />
                Home
            </Link>
        </header>
    );
}

export default PhotoPageHeader;