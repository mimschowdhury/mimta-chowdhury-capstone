import "./Footer.scss";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <section className="footer">
            <div className="footer__desktop-wrapper">
                <div className="footer__tablet-wrapper">
                <Link to="/" className="footer__link">
                    <h1 className="footer__heading">6ixCafes</h1>
                </Link>
                        <div className="footer__content">
                            <div className="footer__links">
                                <div>Favourites List</div>
                                <div>Locations</div>
                            </div>
                            <div className="footer__links">
                                <div>About</div>
                                <div>Contact</div>
                            </div>
                        </div>
                </div>
            </div>

            <div className="footer__copyright">
                <p className="footer__info">© 2024 Snaps</p>
                <p className="footer__info">Terms</p>
                <p className="footer__info">Privacy</p>
                <p className="footer__info">Cookies</p>
            </div>
        </section>
    );
}

export default Footer;