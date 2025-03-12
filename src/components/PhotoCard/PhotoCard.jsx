import "./Photocard.scss";
import { Link } from "react-router-dom";

function PhotoCard({ url, alt, photographer, tags, id }) {
    return (
        <div className="photocard">
            <div className="photocard__content">
                <Link to={`/photos/${id}`} className="photocard__link">
                    <img src={url} alt={alt} />
                </Link>
                    <p className="photocard__photographer">{photographer}</p>
            </div>
            <ul className="photocard__tags">
                {tags.map((tag, index) => (
                    <li 
                        key={`${id}-${index}`} 
                        className="photocard_tag"
                    >
                        {tag}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PhotoCard;

