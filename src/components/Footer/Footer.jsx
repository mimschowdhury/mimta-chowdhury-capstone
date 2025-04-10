import "./Footer.scss";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <section className="footer">
            <div className="footer__desktop-wrapper">
                <div className="footer__tablet-wrapper">
                <Link to="/" className="footer__link">
                    <h1 className="footer__heading">6ixCafes co.</h1>
                </Link>
                        <div className="footer__content">
                            <div className="footer__links">
                                <Link to="/favourites" className="footer__link">
                                    My Favourites 🤎
                                </Link>
                                <Link to="/locations" className="footer__link">
                                    Locations 📍
                                </Link>
                                <Link to="/cafeoftheweek" className="footer__link">
                                    Cafe of the Week 🥐
                                </Link>
                            </div>
                            <div className="footer__links">
                                <Link to="/about" className="footer__link">
                                    About 👩🏻‍💻
                                </Link>
                                <Link to="/quiz" className="footer__link">
                                    Discover Cafes ☕️
                                </Link>
                                <Link to="/collage" className="footer__link">
                                    Cafe Roulette 🎲
                                </Link>
                            </div>
                        </div>
                </div>
            </div>

            <div className="footer__copyright">
                <p className="footer__info">© 2025 6ixCafes co.</p>
                <p className="footer__info">Terms</p>
                <p className="footer__info">Privacy</p>
                <p className="footer__info">Designed & Built by Mimta Chowdhury</p>
            </div>
        </section>
    );
}

export default Footer;